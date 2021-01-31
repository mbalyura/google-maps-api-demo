export default (state) => {
  const { storesList, activeCity, searchValue } = state;

  const storesContainer = document.querySelector('.stores');
  storesContainer.innerHTML = '';

  const currentStoresList = storesList
    .filter((store) => store.city === activeCity)
    .filter(({ name, address }) => searchValue.length === 0
      || name.toLowerCase().includes(searchValue)
      || address.toLowerCase().includes(searchValue));

  const handleChooseStore = (store) => () => {
    state.activeStoreId = store.id;
  };

  currentStoresList.forEach((store) => {
    const divStore = document.createElement('div');
    divStore.classList.add('store');

    if (state.activeStoreId === store.id) {
      divStore.classList.add('store--active');
    }

    const divName = document.createElement('div');
    divName.classList.add('store__name');
    divName.innerHTML = store.name;

    const divAddress = document.createElement('div');
    divAddress.classList.add('store__address');
    divAddress.innerHTML = store.address;

    divStore.append(divName, divAddress);

    if (store.pickup) {
      const divPickup = document.createElement('div');
      divPickup.classList.add('store__pickup');
      divPickup.innerHTML = 'Возможен самовывоз';
      divStore.append(divPickup);
    }

    const divPhone = document.createElement('div');
    divPhone.classList.add('store__phone');
    divPhone.innerHTML = store.phone;
    divStore.append(divPhone);

    const divHours = document.createElement('div');
    divHours.classList.add('store__hours');
    divHours.innerHTML = store.working_hours_weekdays;
    divStore.append(divHours);

    if (store.working_hours_weekends) {
      const divHoursWeekends = document.createElement('div');
      divHoursWeekends.classList.add('store__hours-weekends');
      divHoursWeekends.innerHTML = store.working_hours_weekends;
      divStore.append(divHoursWeekends);
    }

    divStore.addEventListener('click', handleChooseStore(store));
    storesContainer.append(divStore);
  });
};
