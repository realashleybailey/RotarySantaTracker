<template>
  <div class="map-page">
    <GmapMap ref="mapRef" id="map" :zoom="zoom" :center="center" :options="mapOptions">
      <GmapMarker :position="santaMarker.position" :clickable="true" :icon="{ url: require('../assets/santa.png')}" :label="santaMarker.label"></GmapMarker>
      <GmapMarker :position="userMarker.position" :clickable="true" :icon="{ url: require('../assets/mapmarker.png')}" :label="userMarker.label"></GmapMarker>
    </GmapMap>

    <b-navbar fixed-bottom :mobile-burger="false" centered>
      <template #brand>
        <b-navbar-item tag="div">
          <a class="button is-small is-primary" v-on:click="calculateCenter(); followingSanta = false">
            <strong>Zoom Out</strong>
          </a>

          <a class="button is-small is-primary ml-3" v-on:click="toggleFollowSanta">
            <strong v-if="!followingSanta">Follow Santa</strong>
            <strong v-else>Stop Following Santa</strong>
          </a>
        </b-navbar-item>
      </template>
    </b-navbar>

    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </div>
</template>

<style>
#map {
  position: fixed;

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

// eslint-disable-next-line @typescript-eslint/no-var-requires

import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  Unsubscribe,
  GeoPoint,
} from "firebase/firestore";

export default Vue.extend({
  name: "AddGoogleMap",
  data() {
    return {
      window: window as any,
      isLoading: false,
      unsubscribe: null as Unsubscribe | null,
      santaMarker: {
        position: {
          lat: 52.7234434,
          lng: -1.3786962,
        },
        label: {
          color: "#000000",
          fontWeight: "bold",
          fontSize: "16px",
          text: "Santa's Sleigh",
          className: "marker-position",
        },
      },
      userMarker: {
        position: {
          lat: 52.7234434,
          lng: -1.3786962,
        },
        label: {
          color: "#000000",
          fontWeight: "bold",
          fontSize: "16px",
          text: "Your Location",
          className: "marker-position",
        },
      },
      zoom: 16.5,
      center: {
        lat: 52.7234434,
        lng: -1.3786962,
      },
      directionsDisplay: null as any,
      directionsService: null as any,
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
        mapId: "b4c8dccaab2202a3",
      },
      followingSanta: true as boolean,
    };
  },
  computed: {
    canGeolocate() {
      return !!navigator.geolocation;
    },
  },
  methods: {
    async getMarkers() {
      // Get the Firestore instance and firestore db
      const app = getApp();
      const db = getFirestore(app);

      // Get the collection of locations and perform a query
      const placesRef = collection(db, "places");
      const unsubscribe = onSnapshot(placesRef, this.pushMarkers);

      return unsubscribe;
    },
    async pushMarkers(snapshot: QuerySnapshot<DocumentData>) {
      // Get first document from snapshot
      const marker = snapshot.docs[0].data();

      //
      const coordinates = marker.location as GeoPoint;

      // Update markers
      const position = {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      };

      this.santaMarker.position = position;
    },
    async askLocation() {
      // Ask user for permission to use their location using buefy
      this.$buefy.dialog.confirm({
        title: "Use your location?",
        message:
          "We need your location to show it on the map, do we have permission to use it?",
        confirmText: "Yes",
        cancelText: "No",
        type: "is-info",
        hasIcon: true,
        icon: "location-arrow",
        iconPack: "fa",
        onConfirm: this.gettingLocation,
      });
    },
    async gettingLocation() {
      // Show toast
      this.$buefy.toast.open({
        message: "Getting your location...",
        type: "is-dark",
        duration: 3000,
        queue: true,
        position: "is-top",
        // actionText: null,
      });

      // Get the user's location
      await this.getLocation();

      // Show toast
      this.$buefy.toast.open({
        message: "Displaying your location!",
        type: "is-dark",
        duration: 3000,
        queue: true,
        position: "is-top",
        // actionText: null,
      });
    },
    async getLocation() {
      // Ask for location
      navigator.geolocation.watchPosition((res) => {
        const position = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };

        this.userMarker.position = position;

        // Zoom out
        this.calculateCenter();
      });
    },
    async calculateCenter() {
      // Get the map
      const maps = this.window.google.maps;

      // Calculate center of Santa and user
      var latlngbounds = new maps.LatLngBounds();

      // Create a marker for Santa and user
      latlngbounds.extend(this.santaMarker.position);
      latlngbounds.extend(this.userMarker.position);

      // Get $refs
      const mapRef = this.$refs.mapRef as any;

      mapRef.$mapPromise.then(async (map: any) => {
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
      });
    },
    async followSanta() {
      // Get the map
      const maps = this.window.google.maps;

      // Calculate center of Santa and user
      var latlngbounds = new maps.LatLngBounds();

      // Create a marker for Santa and user
      latlngbounds.extend(this.santaMarker.position);

      // Get $refs
      const mapRef = this.$refs.mapRef as any;

      mapRef.$mapPromise.then(async (map: any) => {
        map.setCenter(latlngbounds.getCenter());
        // map.fitBounds(latlngbounds);
      });
    },
    async loadRoutes() {
      // Create a reference with an initial file path and name
      const storage = getStorage();
      const kmlReference = ref(storage, `routes/${this.formatDate()}.kml`);

      const src = await getDownloadURL(kmlReference);

      const mapRef = this.$refs.mapRef as any;

      mapRef.$mapPromise.then(async (map: any) => {
        new this.window.google.maps.KmlLayer(src, {
          suppressInfoWindows: true,
          preserveViewport: false,
          map: map,
        });
      });
    },
    toggleFollowSanta() {
      if (!this.followingSanta) {
        this.zoom = this.zoom * 100;
        this.followSanta();
        this.followingSanta = true;
      } else {
        this.calculateCenter();
        this.followingSanta = false;
      }
    },
    formatDate() {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
  async mounted() {
    // Start loading
    this.isLoading = true;

    // Get Location
    if (navigator.geolocation) {
      await this.gettingLocation();
    } else {
      await this.askLocation();
    }

    // Get the markers
    this.unsubscribe = await this.getMarkers();

    // Load Routes
    this.loadRoutes();

    // Stop loading
    this.isLoading = false;
  },
  beforeDestroy() {
    // Unsubscribe from Firestore
    if (this.unsubscribe) this.unsubscribe();
  },
  watch: {
    santaMarker: {
      handler: function () {
        if (this.followingSanta) {
          this.followSanta();
        }
      },
      deep: true,
    },
  },
});
</script>