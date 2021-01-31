import onChange from 'on-change';

import renderSpinner from './renderers/spinner';
import { renderCustomSelect, toggleCustomSelect } from './renderers/customSelect';
import renderStores from './renderers/stores';
import { renderGMapMarker, positionMap } from './gMaps';

export default (state) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'activeCity':
        renderCustomSelect(watchedState);
        renderStores(watchedState);
        positionMap(watchedState);
        break;
      case 'activeStoreId':
        renderStores(watchedState);
        renderGMapMarker(watchedState);
        break;
      case 'searchValue':
        renderStores(watchedState);
        break;
      case 'isSelectOpen':
        toggleCustomSelect(value);
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
