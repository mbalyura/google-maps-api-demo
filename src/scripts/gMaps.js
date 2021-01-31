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
    key: 'AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE', // ! work only from 127.0.0.1:8080 !
  });

  map = new googleMaps.Map(mapContainer, {
    center: { lat, lng },
    zoom,
  });

  geocoder = new googleMaps.Geocoder();

  state.isLoading = false;
};

export const positionMap = (state) => {
  state.isLoading = true;

  map.setZoom(12);
  if (marker) marker.setMap(null);

  const address = state.activeCity;
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
    } else {
      console.warn('Address not found!');
    }
    state.isLoading = false;
  });
};

export const renderGMapMarker = (state) => {
  state.isLoading = true;

  const activeStore = state.storesList.find((store) => store.id === state.activeStoreId);
  if (!activeStore) return;

  const address = `${activeStore.city} ${activeStore.address}`;
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      if (marker) marker.setMap(null);
      marker = new googleMaps.Marker({
        position: results[0].geometry.location,
        map,
      });
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
    } else {
      console.warn('Address not found!');
    }
    state.isLoading = false;
  });
};
