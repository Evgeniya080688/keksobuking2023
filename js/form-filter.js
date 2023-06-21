const formFilterEl = document.querySelector('.map__filters');
const selectors = formFilterEl.querySelectorAll('select');
const checkboxes = formFilterEl.querySelectorAll('.map__checkbox');

const setFilter = (cb) => {
  selectors.forEach((selector) => {
    selector.addEventListener('change', () => {
      cb();
    });
  });
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      cb();
    });
  });
};

export { setFilter };
