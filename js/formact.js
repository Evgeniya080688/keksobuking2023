const desactivateForm = () => {
  const formEl = document.querySelector('.ad-form');
  formEl.classList.add('ad-form--disabled');
  const fieldElems = formEl.querySelectorAll('fieldset');
  fieldElems.forEach((fieldElem) => {
    fieldElem.setAttribute('disable', 'true');
  });
  const filterEl = document.querySelector('.map__filters');
  filterEl.classList.add('ad-form--disabled');
  const filterElFields = filterEl.children;
  Array.from(filterElFields).forEach((field) => {
    field.setAttribute('disable', 'true');
  });
};

const activateForm = () => {
  const formEl = document.querySelector('.ad-form');
  formEl.classList.remove('ad-form--disabled');
  const fieldElems = formEl.querySelectorAll('fieldset');
  fieldElems.forEach((fieldElem) => {
    fieldElem.setAttribute('disable', 'false');
  });
  const filterEl = document.querySelector('.map__filters');
  filterEl.classList.remove('ad-form--disabled');
  const filterElFields = filterEl.children;
  Array.from(filterElFields).forEach((field) => {
    field.setAttribute('disable', 'false');
  });
};

export {activateForm, desactivateForm};
