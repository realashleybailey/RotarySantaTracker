import loadGmaps from "load-google-maps-api";

export async function loadGoogleMaps(key: string): Promise<typeof google.maps> {

    // Load Google Maps
    const gmaps = await loadGmaps({
        key: key,
        libraries: ["places"]
    });

    // Return Google Maps
    return gmaps;
}