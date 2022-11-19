export function createGoogleMarker(map: google.maps.Map, position: google.maps.LatLng | null | undefined, icon: string | google.maps.Icon | google.maps.Symbol | null | undefined, title: string | null | undefined, label: google.maps.MarkerLabel| string | null | undefined): google.maps.Marker {
    // Marker options
    const markerOptions: google.maps.MarkerOptions = {
        map: map,
        position: position,
        icon: icon,
        title: title,
        label: label,
        zIndex: 1000
      }

    // Create a Google Marker
    const marker = new google.maps.Marker(markerOptions);

    // Return the Google Marker
    return marker;
}