import fakeData from './assets/fakeData.json';
import runWatcher from './scripts/watcher';
import { initialRenderGMaps } from './scripts/gMaps';
import { renderCustomSelect } from './scripts/renderers/customSelect';
import renderStores from './scripts/renderers/stores';

const getCitiesList = (storesList) => storesList
  .reduce((acc, { region, city }) => (acc.some((item) => (item.city === city))
    ? acc
    : [...acc, { region, city }]), []);

export default () => {
  const { stores: storesList } = fakeData;
  const citiesList = getCitiesList(storesList);

  const state = {
    storesList,
    citiesList,
    activeCity: 'Киев',
    activeStoreId: null,
    isSelectOpen: false,
    searchValue: '',
    isLoading: false,
  };

  const watchedState = runWatcher(state);

  const customSelect = document.querySelector('.custom-select');
  customSelect.addEventListener('click', () => {
    watchedState.isSelectOpen = !watchedState.isSelectOpen;
  });

  document.body.addEventListener('click', ({ target }) => {
    if (!customSelect.contains(target)) {
      watchedState.isSelectOpen = false;
    }
  });

  const searchField = document.querySelector('.search-field');
  searchField.addEventListener('input', ({ target: { value } }) => {
    watchedState.searchValue = value.toLowerCase().trim();
  });

  initialRenderGMaps(watchedState);
  renderCustomSelect(watchedState);
  renderStores(watchedState);
};
