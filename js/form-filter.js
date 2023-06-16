const formFiler = document.querySelector('.map__filters');
const housingType = formFiler.querySelector('#housing-type');

const setFilter = (cb) => {
  housingType.addEventListener('change', (evt) => {
    cb();
  });
};

export { setFilter };
