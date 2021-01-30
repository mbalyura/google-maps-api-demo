import loadGoogleMapsApi from 'load-google-maps-api';

const mapContainer = document.querySelector('.map');
const defaultCoords = { lat: 50.4537865, lng: 30.5038465, zoom: 12 };
let googleMaps;
let map;
let placeService;
let marker;

export const initialRenderGMaps = async (state, coords = defaultCoords) => {
  const { lat, lng, zoom } = coords;
  state.isLoading = true;
  googleMaps = await loadGoogleMapsApi({
    key: 'AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE', // work only from 127.0.0.1:8080 !!
    // key: 'AIzaSyA9gszeIUDxXG1U0UqqkVE23qnluo4Bizw',
    libraries: ['places'],
  });
  map = await new googleMaps.Map(mapContainer, {
    center: { lat, lng },
    zoom,
  });
  placeService = await new googleMaps.places.PlacesService(map);
  state.isLoading = false;
};

export const renderGMapMarker = async (state) => {
  state.isLoading = true;
  const place = state.storesList.find((store) => store.id === state.activeStoreId);
  const query = `${place.city} ${place.name}`;
  const request = {
    query,
    fields: ['name', 'geometry'],
  };

  placeService.findPlaceFromQuery(request, (results, status) => {
    if (status === googleMaps.places.PlacesServiceStatus.OK) {
      if (marker) marker.setMap(null);
      marker = new googleMaps.Marker({
        position: results[0].geometry.location,
        map,
      });
      map.setCenter(results[0].geometry.location);
      state.isLoading = false;
    }
  });
};
