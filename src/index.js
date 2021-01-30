import 'regenerator-runtime/runtime';

import './scss/app.scss';
import fakeData from './assets/fakeData.json';
import runWatcher from './scripts/watcher';
import { initialRenderGMaps } from './scripts/gMaps';

const getCitiesList = (storesList) => storesList
  .reduce((acc, { region, city }) => (acc.some((item) => (item.city === city))
    ? acc
    : [...acc, { region, city }]), []);

const { stores: storesList } = fakeData;
const citiesList = getCitiesList(storesList);

const state = {
  storesList,
  citiesList,
  activeCity: null,
  activeStoreId: null,
  searchString: '',
  isLoading: false,
};

const watchedState = runWatcher(state);

watchedState.activeCity = citiesList[0].city;

const customSelect = document.querySelector('.custom-select');
customSelect.addEventListener('click', () => {
  customSelect.classList.toggle('open');
});

const searchField = document.querySelector('.search-field');
searchField.addEventListener('input', ({ target: { value } }) => {
  watchedState.searchString = value.toLowerCase().trim();
});

initialRenderGMaps(watchedState);
