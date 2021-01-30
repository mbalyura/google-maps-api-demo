import onChange from 'on-change';

import renderSpinner from './renderers/spinner';
import renderCustomSelect from './renderers/customSelect';
import renderStores from './renderers/stores';
import { renderGMapMarker } from './gMaps';

export default (state) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'activeCity':
        renderCustomSelect(watchedState, value);
        renderStores(watchedState);
        break;
      case 'activeStoreId':
        renderGMapMarker(watchedState);
        break;
      case 'searchString':
        console.log('watchedState', watchedState);
        renderStores(watchedState);
        break;
      case 'isLoading':
        renderSpinner(value);
        break;
      default:
        break;
    }
  });

  return watchedState;
};
