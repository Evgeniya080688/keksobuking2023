const formFilter = document.querySelector('.map__filters');
const selectors = formFilter.querySelectorAll('select');
const checkboxes = formFilter.querySelectorAll('.map__checkbox');

const setFilter = (cb) => {
  selectors.forEach((selector) => {
    selector.addEventListener('change', () => {
      cb();
    });
  });
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      cb();
      console.log('change check');
    });
  });
};

export { setFilter };
