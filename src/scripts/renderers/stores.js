export default (state) => {
  const { storesList, activeCity, searchString } = state;

  const storesContainer = document.querySelector('.stores');
  storesContainer.innerHTML = '';

  const currentStoresList = storesList
    .filter((store) => store.city === activeCity)
    .filter(({ name, address }) => searchString.length === 0
      || name.toLowerCase().includes(searchString)
      || address.toLowerCase().includes(searchString));

  const handleChoseStore = (store) => () => {
    state.activeStoreId = store.id;
  };

  currentStoresList.forEach((store) => {
    console.log('store', store);
    const divStore = document.createElement('div');
    divStore.classList.add('store');

    const divName = document.createElement('div');
    divName.innerHTML = store.name;

    const divAddress = document.createElement('div');
    divAddress.innerHTML = store.address;

    const divPickup = document.createElement('div');
    divPickup.innerHTML = store.pickup ? 'самовывоз' : null;

    const divHours = document.createElement('div');
    divHours.innerHTML = store.working_hours_weekdays;

    divStore.append(divName, divAddress, divPickup, divHours);
    divStore.addEventListener('click', handleChoseStore(store));
    storesContainer.append(divStore);
  });
};
