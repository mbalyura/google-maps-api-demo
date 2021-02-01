export const renderCustomSelect = (state) => {
  const handleChangeCity = (city) => () => {
    state.activeCity = city;
  };

  const customOptionsContainer = document.querySelector('.custom-options');
  customOptionsContainer.innerHTML = '';
  const customSelectTrigger = document.querySelector('.custom-select__trigger');
  customSelectTrigger.innerHTML = '';
  state.activeStoreId = null;

  state.citiesList.forEach(({ region, city }) => {
    const divCity = document.createElement('div');
    divCity.classList.add('city');
    divCity.innerHTML = city;
    const divRegion = document.createElement('div');
    divRegion.classList.add('region');
    divRegion.innerHTML = region;

    if (city === state.activeCity) {
      customSelectTrigger.append(divCity, divRegion);
    } else {
      const customOption = document.createElement('div');
      customOption.classList.add('custom-option');
      customOption.append(divCity, divRegion);
      customOption.addEventListener('click', handleChangeCity(city));
      customOptionsContainer.append(customOption);
    }
  });
};

export const toggleCustomSelect = (isSelectOpen) => {
  const customSelect = document.querySelector('.custom-select');
  const nav = document.querySelector('.nav');
  if (isSelectOpen) {
    customSelect.classList.add('open');
    nav.classList.add('shadow');
  } else {
    customSelect.classList.remove('open');
    nav.classList.remove('shadow');
  }
};
