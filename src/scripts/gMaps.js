import loadGoogleMapsApi from 'load-google-maps-api';

const mapContainer = document.querySelector('.map');
const defaultCoords = { lat: 50.4537865, lng: 30.5038465, zoom: 12 };
let googleMaps;
let map;
let geocoder;
let marker;

export const initialRenderGMaps = async (state, coords = defaultCoords) => {
  state.isLoading = true;
  const { lat, lng, zoom } = coords;
  googleMaps = await loadGoogleMapsApi({
    // key: 'AIzaSyAYQTc2e1XUgfTFKbwnYhlymFx4treFAa8', // from video
    key: 'AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE', // work only from 127.0.0.1:8080 !!
    // key: 'AIzaSyCL6Qc_WOhBTqQhddmgbBYW2D4G5fkxe1c', // my key
  });
  map = new googleMaps.Map(mapContainer, {
    center: { lat, lng },
    zoom,
  });
  geocoder = new googleMaps.Geocoder();
  state.isLoading = false;
};

export const renderGMapMarker = async (state) => {
  state.isLoading = true;
  const store = state.storesList.find((item) => item.id === state.activeStoreId);
  const address = `${store.city} ${store.address}`;
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      if (marker) marker.setMap(null);
      marker = new googleMaps.Marker({
        position: results[0].geometry.location,
        map,
      });
      map.setCenter(results[0].geometry.location);
    } else {
      console.error('Adsress not found!');
    }
    state.isLoading = false;
  });
};
