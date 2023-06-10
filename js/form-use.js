import { showAlert } from './util.js';
import { sendData} from './api.js';

const messSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

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

const resetForm = () => {
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

//validate
const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

//valid address
const address = adForm.querySelector('#address');
address.value = '35.60439, 139.74142';
address.readOnly = true;

//valid title
function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

const titleAdv = adForm.querySelector('#title');

pristine.addValidator(
  titleAdv,
  validateTitle,
  'от 30 до 100 символов');

//validate place and rooms
const roomsPlace = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};

const rooms = adForm.querySelector('#room_number');
const places = adForm.querySelector('#capacity');

function validatePlaces () {
  return roomsPlace[rooms.value].includes(places.value);
}

function getPlaceErrorMessage () {
  let msg='';
  if (rooms.value == 1) {
    msg = `В 1 комнате можно разместить только 1 гостя`;
  } else if (rooms.value == 100) {
    msg = `100 комнат слишком много для ${places.value} гостей`;
  } else if (places.value == 0) {
    msg = `Не гостей не размещают в ${rooms.value} комнатах`;
  } else {
    msg = 'В 2х комнатах только 2 гостя';
  }
  return msg;
}

pristine.addValidator(rooms, validatePlaces, getPlaceErrorMessage);
pristine.addValidator(places, validatePlaces, getPlaceErrorMessage);

//validate living type priceNight
//validate price

const priceNight = adForm.querySelector('#price');
const slider = adForm.querySelector('.ad-form__slider');
noUiSlider.create(slider, {
  start: 5000,
  step: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100000
  },
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

slider.noUiSlider.on('update', () => { // при изменений положения элементов управления слайдера изменяем соответствующие значения
  priceNight.value = slider.noUiSlider.get();
});

//slider.setAttribute('disabled', true);

// slider.removeAttribute('disabled');

priceNight.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
  slider.noUiSlider.set(this.value);
});

priceNight.oninput = function() {
  slider.noUiSlider.set(priceNight.value);
};

const typeLiving = adForm.querySelector('#type');
const typePrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validatePrice (value) {
  return value.length && parseInt(value, 10) >= typePrice[typeLiving.value];
}

function validateType (value) {
  return value.length && priceNight.value >= typePrice[this.value];
}

function messagePrice () {
  const type = adForm.querySelector(`option[value='${typeLiving.value}']`).textContent;
  return `Цена за тип жилья ${type} не может быть меньше ${typePrice[typeLiving.value]}`;
}

function messageType () {
  const type = adForm.querySelector(`option[value='${typeLiving.value}']`).textContent;
  return `Тип жилья ${type} стоит от ${typePrice[typeLiving.value]}`;
}

function onTypeChange (value) {
  priceNight.placeholder = typePrice[this.value];
  priceNight.value = typePrice[this.value];
  slider.noUiSlider.set([priceNight.value, null]);
  pristine.validate(priceNight);
}

typeLiving.addEventListener('change', onTypeChange);

pristine.addValidator(
  priceNight,
  validatePrice,
  messagePrice);

pristine.addValidator(
  typeLiving,
  validateType,
  messageType);

//validate time
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

function onTimeChange(value) {
  timeIn.value = this.value;
  timeOut.value = this.value;
}

timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showAlert(messSuccessTemplate);
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

desactivateForm();

export {adForm, address, activateForm, desactivateForm, setUserFormSubmit};
