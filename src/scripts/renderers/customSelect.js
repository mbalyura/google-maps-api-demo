export default (state, active) => {
  const handleChangeCity = (city) => () => {
    state.activeCity = city;
  };

  const customOptionsContainer = document.querySelector('.custom-options');
  customOptionsContainer.innerHTML = '';
  const customSelectTrigger = document.querySelector('.custom-select__trigger');
  customSelectTrigger.innerHTML = '';

  state.citiesList.forEach(({ region, city }) => {
    const divCity = document.createElement('div');
    divCity.classList.add('city');
    divCity.innerHTML = city;
    const divRegion = document.createElement('div');
    divRegion.classList.add('region');
    divRegion.innerHTML = region;

    if (city === active) {
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
