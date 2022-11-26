<template>
  <div class="map-page">
    <!-- <GmapMap ref="mapRef" id="map" :zoom="zoom" :center="center" :options="mapOptions">
      <GmapMarker :position="santaMarker.position" :clickable="true" :icon="{ url: require('../assets/santa.png')}"
        :label="santaMarker.label"></GmapMarker>
      <GmapMarker :position="userMarker.position" :clickable="true" :icon="{ url: require('../assets/mapmarker.png')}"
        :label="userMarker.label"></GmapMarker>
    </GmapMap> -->

    <div id="map"></div>

    <b-navbar fixed-bottom :mobile-burger="false" centered>
      <template #brand>
        <b-navbar-item tag="div">
          <a class="button is-small is-primary ml-3" v-on:click="toggleTrackSantaEnabled">
            <strong v-if="trackSantaEnabled">Follow Santa</strong>
            <strong v-else>Stop Following Santa</strong>
          </a>
          <a class="button is-small is-primary ml-3" v-on:click="viewMyLocation">
            <strong>View my Location</strong>
          </a>
        </b-navbar-item>
      </template>
    </b-navbar>

    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </div>
</template>

<style>
#map {
  position: fixed !important;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100%;
}

.marker-position {
  padding-bottom: 60px;
  -webkit-text-stroke: 0.5px white;
}
</style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import $ from "jquery";

import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, onSnapshot, QuerySnapshot, DocumentData, Unsubscribe, GeoPoint, getDocs, DocumentReference, getDoc, doc } from "firebase/firestore";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

import { loadGoogleMaps } from "../ts/loadGoogleMaps";
import { createGoogleMarker } from "../ts/createGoogleMarker";

export default Vue.extend({
  name: "AddGoogleMap",
  data() {
    return {
      window: window as any,
      map: null as google.maps.Map | null,
      defaultCoordinates: { lat: 52.7234434, lng: -1.3786962 },
      trackSantaEnabled: false as boolean,
      isLoading: false,
      mapMarkers: {
        santa: null as google.maps.Marker | null,
        user: null as google.maps.Marker | null,
      },
      unsubscribe: null as Unsubscribe | null,
      analytics: null as Analytics | null,
    };
  },
  computed: {
    canGeolocate() {
      return !!navigator.geolocation;
    },
    alreadyRequestedGeolocation() {
      return localStorage.getItem("alreadyRequestedGeolocation") === "true";
    },
  },
  methods: {
    async loadKMLroute() {
      const app = getApp();

      const db = getFirestore(app);
      const storage = getStorage(app);

      const config = collection(db, "config");
      const configRef = doc(config, "map-1");

      const configDoc = await getDoc(configRef);
      const configData = configDoc.data();

      const currentRoute = configData?.current_route as DocumentReference;

      if (!currentRoute) {
        return;
      }

      const routeDoc = await getDoc(currentRoute);
      const routeData = routeDoc.data();

      const document = routeData?.document as string;

      if (!document) {
        return;
      }
      
      const storageRef = ref(storage, document);
      const url = await getDownloadURL(storageRef);

      const KMLoptions: google.maps.KmlLayerOptions = {
        url: url,
        map: this.map,
      }

      new google.maps.KmlLayer(KMLoptions);
    },
    getBoundsZoomLevel(bounds: google.maps.LatLngBounds, mapDim: { height: number; width: number }) {
      let WORLD_DIM = { height: 256, width: 256 };
      let ZOOM_MAX = 21;

      function latRad(lat: number) {
          let sin = Math.sin(lat * Math.PI / 180);
          let radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
          return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
      }

      function zoom(mapPx: number, worldPx: number, fraction: number) {
          return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
      }

      let ne = bounds.getNorthEast();
      let sw = bounds.getSouthWest();

      let latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

      let lngDiff = ne.lng() - sw.lng();
      let lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

      let latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
      let lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

      return Math.min(latZoom, lngZoom, ZOOM_MAX);
    },
    async setRegionToLocation(location: google.maps.LatLng) {
      let LatLng = new google.maps.LatLngBounds();
      LatLng.extend(location);

      let mapCenter = LatLng.getCenter();

      this.map?.setZoom(18);
      this.map?.setCenter(mapCenter);
    },
    async transitionZoom(current: number, moveto: number, map: google.maps.Map) {
      // If current zoom is less than moveto, zoom in incrementally by 0.1 until current zoom is equal to moveto
      if (current < moveto) {
        for (let i = current; i < moveto; i += 0.1) {
          await new Promise((resolve) => setTimeout(resolve, 35));
          map.setZoom(i);
        }
      }

      // If current zoom is greater than moveto, zoom out incrementally by 0.1 until current zoom is equal to moveto
      if (current > moveto) {
        for (let i = current; i > moveto; i -= 0.1) {
          await new Promise((resolve) => setTimeout(resolve, 35));
          map.setZoom(i);
        }
      }
    },
    async transitionRegion(current: google.maps.LatLng, moveto: google.maps.LatLng, map: google.maps.Map) {
      let numDeltas = 100;
      let delay = 5; //milliseconds
      let i = 0;

      let deltaLat = (moveto.lat() - current.lat()) / numDeltas;
      let deltaLng = (moveto.lng() - current.lng()) / numDeltas;

      moveMarker();

      function moveMarker() {
        current = new google.maps.LatLng(current.lat() + deltaLat, current.lng() + deltaLng);
        
        let LatLng = new google.maps.LatLngBounds();
        LatLng.extend(current);

        let mapCenter = LatLng.getCenter();

        map.setCenter(mapCenter);

        if (i != numDeltas) {
          i++;
          setTimeout(moveMarker, delay);
        }
      }
    },
    async requestUserLocation() {
      let title = "Use your location?";
      let message = "We need to know your location to show you it on the map.";

      let confirmText = "Yes";
      let cancelText = "No";

      let type = "is-info";
      let hasIcon = true;
      
      let icon = "location-arrow";
      let iconPack = "fas";

      let onConfirm = this.startTrackingUser

      this.$buefy.dialog.confirm({ title, message, confirmText, cancelText, type, hasIcon, icon, iconPack, onConfirm });
    },
    async startTrackingUser() {
      localStorage.setItem("alreadyRequestedGeolocation", "true");
      navigator.geolocation.getCurrentPosition(this.updateUserLocation, this.handleUserLocationError);
    },
    async updateUserLocation(position: any) {
        let newPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.mapMarkers.user!.setVisible(true);
        this.mapMarkers.user!.setPosition(newPosition);
    },
    async handleUserLocationError(error: any) {
      let title = error.message;
      let message = "We couldn't get your location. Please try again later.";

      let confirmText = "Okay";

      let type = "is-error";
      let hasIcon = true;
      
      let icon = "exclamation-triangle";
      let iconPack = "fas";

      this.$buefy.dialog.confirm({ title, message, confirmText, type, hasIcon, icon, iconPack });
    },
    async startTrackingSanta() {
      // Get Firestore instance
      const app = getApp();
      const db = getFirestore(app);

      // Get Santa's location as a Snapshot
      const santaRef = collection(db, "places");
      const santaSnapshot = onSnapshot(santaRef, this.updateSantasLocation);

      // Set the unsubscribe function
      this.unsubscribe = santaSnapshot;
    },
    async updateSantasLocation(snapshot: QuerySnapshot<DocumentData>) {
      // Get the Santa's location and create a new LatLng object
      const santaLocation = snapshot.docs[0].data().location as GeoPoint;
      const santaLatLng = new google.maps.LatLng(santaLocation.latitude, santaLocation.longitude);

      // Update Santa's marker using a transition animation
      this.transitionMarker(this.mapMarkers.santa?.getPosition() as google.maps.LatLng, santaLatLng, this.mapMarkers.santa as google.maps.Marker);

      // Update the region to Santa's location
      if (!this.trackSantaEnabled) {
        this.transitionRegion(this.mapMarkers.santa?.getPosition() as google.maps.LatLng, santaLatLng, this.map as google.maps.Map);
      }
    },
    async transitionMarker(current: google.maps.LatLng, moveto: google.maps.LatLng, marker: google.maps.Marker) {
      let numDeltas = 100;
      let delay = 5; //milliseconds
      let i = 0;

      let deltaLat = (moveto.lat() - current.lat()) / numDeltas;
      let deltaLng = (moveto.lng() - current.lng()) / numDeltas;

      moveMarker();

      function moveMarker() {
        current = new google.maps.LatLng(current.lat() + deltaLat, current.lng() + deltaLng);
        marker.setPosition(current);
        if (i != numDeltas) {
          i++;
          setTimeout(moveMarker, delay);
        }
      }
    },
    createMapMarker(title: string, iconURL: any, text: string, location: { lat: number, lng: number }, className: string): google.maps.Marker {
      // Create a icon for the marker
      const icon = {
        url: iconURL,
        // scaledSize: new window.google.maps.Size(50, 50) // disabled due to size issues
      }

      // Create a label for the marker
      const label: google.maps.MarkerLabel = {
        color: "#000000",
        fontWeight: "bold",
        fontSize: "16px",
        text: text,
        className: className
      };

      return createGoogleMarker(this.map!, new google.maps.LatLng(location.lat, location.lng), icon, title, label)
    },
    setRegionToAll() {
      // Creat a LatLngBounds object
      let LatLngBounds = new google.maps.LatLngBounds();

      // Extend the bounds to include all markers
      for (let marker of Object.values(this.mapMarkers)) {
        LatLngBounds.extend(marker!.getPosition()!);
      }

      // Get the center of the bounds
      let mapCenter = LatLngBounds.getCenter();

      // Get the zoom level
      let zoomLevel = this.getBoundsZoomLevel(LatLngBounds, { height: this.map!.getDiv().clientHeight, width: this.map!.getDiv().clientWidth });

      // Set the center of the map to the center of the bounds and the zoom level
      this.transitionRegion(this.map!.getCenter()!, mapCenter, this.map!);
      this.transitionZoom(this.map!.getZoom()!, zoomLevel, this.map!);
    },
    async toggleTrackSantaEnabled() {
      this.trackSantaEnabled = !this.trackSantaEnabled;
      if (!this.trackSantaEnabled) this.transitionRegion(this.map!.getCenter()!, this.mapMarkers.santa!.getPosition()!, this.map as google.maps.Map);
      else this.setRegionToAll();
      
      // await new Promise(resolve => setTimeout(resolve, 1500));

      if (!this.trackSantaEnabled) this.transitionZoom(this.map!.getZoom()!, 20, this.map!);
      // else this.transitionZoom(this.map!.getZoom()!, 14, this.map!);
    },
    viewMyLocation() {
      if (this.mapMarkers.user?.getVisible()) {
        this.transitionRegion(this.map!.getCenter()!, this.mapMarkers.user.getPosition()!, this.map as google.maps.Map);
        this.trackSantaEnabled = true;
      } else if (this.canGeolocate && this.alreadyRequestedGeolocation) {
        this.startTrackingUser();
        this.trackSantaEnabled = true;
      } else {
        this.requestUserLocation();
      }
    },
    createAnalytics() {
      const app = getApp();
      this.analytics = getAnalytics(app);
    },
    logEvent(name: string, params: any) {
      if (this.analytics) {
        logEvent(this.analytics, name, params);
      }
    },
  },
  async mounted() {
    // Start loading
    this.isLoading = true;
    
    // Create analytics
    this.createAnalytics();
    this.logEvent("page_view", { page_title: "Track", page_location: window.location.href, page_event: "page_view" });

    // Load Google Maps API
    await loadGoogleMaps("AIzaSyDBi2Jt0jMQiZiH3uhmTysTgxFMrmtKsEo");
    // Map options
    const options = {
      zoom: 15,
      mapId: "b4c8dccaab2202a3",
      center: new google.maps.LatLng(this.defaultCoordinates.lat, this.defaultCoordinates.lng),
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      disableDefaultUI: true,
      zoomControl: false,
      fullscreenControl: false,
    };

    // Get the map
    this.map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, options);

    // Create the markers
    this.mapMarkers.santa = this.createMapMarker("Santa", require('../assets/santa.png'), "Santas Sleigh", { lat: this.defaultCoordinates.lat, lng: this.defaultCoordinates.lng }, "marker-position");
    this.mapMarkers.user = this.createMapMarker("User", require('../assets/mapmarker.png'), "My Location", { lat: this.defaultCoordinates.lat, lng: this.defaultCoordinates.lng }, "marker-position");

    // Hide user marker until geolocation is available
    // this.mapMarkers.user?.setVisible(false);

    // Start tracking Santa
    this.startTrackingSanta();

    if (this.canGeolocate && this.alreadyRequestedGeolocation) {
      this.startTrackingUser();
    }

    // Load route
    this.loadKMLroute();

    setTimeout(() => {
      this.transitionZoom(this.map!.getZoom()!, 20, this.map!);
    }, 2500);

    (window as any).map = this.map;

    // Stop loading
    this.isLoading = false;
  },
  beforeMount() {
    Vue.prototype.$snowflakes.hide();
  },
  destroyed() {
    Vue.prototype.$snowflakes.show();
  },
  beforeDestroy() {
    // Unsubscribe from Firestore
    if (this.unsubscribe) this.unsubscribe();

    // Log event
    this.logEvent("page_view", { page_title: "Track", page_location: window.location.href, page_event: "unmount" });
  }
});
</script>