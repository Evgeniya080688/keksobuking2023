import {showAlert, messSuccessTemplate, messErrorTemplate} from './util.js';
import {getData, sendData} from './api.js';
import {renderNeighbors, resetMap} from './map.js';

const adFormEl = document.querySelector('.ad-form');
const formFilterEl = document.querySelector('.map__filters');
const submitButtonEl = adFormEl.querySelector('.ad-form__submit');
const addressEl = adFormEl.querySelector('#address');
const titleAdvEl = adFormEl.querySelector('#title');
const roomsEl = adFormEl.querySelector('#room_number');
const placesEl = adFormEl.querySelector('#capacity');
const sliderEl = adFormEl.querySelector('.ad-form__slider');
const timeInEl = adFormEl.querySelector('#timein');
const timeOutEl = adFormEl.querySelector('#timeout');
const priceNightEl = adFormEl.querySelector('#price');
const typeLivingEl = adFormEl.querySelector('#type');
const typePrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

//set address
addressEl.value = '35.60439, 139.74142';
addressEl.readOnly = true;

const desactivateForm = () => {
  adFormEl.classList.add('ad-form--disabled');
  const fieldElems = adFormEl.querySelectorAll('fieldset');
  fieldElems.forEach((fieldElem) => {
    fieldElem.setAttribute('disable', 'true');
  });
  formFilterEl.classList.add('ad-form--disabled');
  const filterElFields = formFilterEl.children;
  Array.from(filterElFields).forEach((field) => {
    field.setAttribute('disable', 'true');
  });
  sliderEl.setAttribute('disabled', true);
};

const activateForm = () => {
  addressEl.value = '35.60439, 139.74142';
  const formEl = document.querySelector('.ad-form');
  formEl.classList.remove('ad-form--disabled');
  const fieldElems = formEl.querySelectorAll('fieldset');
  fieldElems.forEach((fieldEl) => {
    fieldEl.setAttribute('disable', 'false');
  });
  const filterEl = document.querySelector('.map__filters');
  filterEl.classList.remove('ad-form--disabled');
  const filterElFields = filterEl.children;
  Array.from(filterElFields).forEach((field) => {
    field.setAttribute('disable', 'false');
  });
  sliderEl.removeAttribute('disabled');
};

//validate
const pristine = new Pristine(adFormEl, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

//valid title
function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  titleAdvEl,
  validateTitle,
  'от 30 до 100 символов');

//validate place and rooms
const roomsPlace = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};

function validatePlaces () {
  return roomsPlace[roomsEl.value].includes(placesEl.value);
}

pristine.addValidator(roomsEl, validatePlaces, 'Число гостей не соответствует числу комнат');
pristine.addValidator(placesEl, validatePlaces, 'Число комнат не соответствует числу гостей');

const changeRooms = function() {
  pristine.validate(placesEl);
};
const changePlaces = function() {
  pristine.validate(roomsEl);
};

roomsEl.addEventListener('change',changeRooms);
placesEl.addEventListener('change',changePlaces);

//create slider
//validate living type priceNight
//validate price
noUiSlider.create(sliderEl, {
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

sliderEl.noUiSlider.on('update', () => { // при изменений положения элементов управления слайдера изменяем соответствующие значения
  priceNightEl.value = sliderEl.noUiSlider.get();
  pristine.validate(typeLivingEl);
  pristine.validate(priceNightEl);
});

priceNightEl.oninput = function() {
  sliderEl.noUiSlider.set(priceNightEl.value);
  pristine.validate(typeLivingEl);
  pristine.validate(priceNightEl);
};

function validatePrice (value) {
  return value.length && parseInt(value, 10) >= typePrice[typeLivingEl.value];
}

function validateType (value) {
  return value.length && priceNightEl.value >= typePrice[this.value];
}

function messagePrice () {
  const type = adFormEl.querySelector(`option[value='${typeLivingEl.value}']`).textContent;
  return `Цена за тип жилья ${type} не может быть меньше ${typePrice[typeLivingEl.value]}`;
}

function messageType () {
  const type = adFormEl.querySelector(`option[value='${typeLivingEl.value}']`).textContent;
  return `Тип жилья ${type} стоит от ${typePrice[typeLivingEl.value]}`;
}

function onTypeChange () {
  priceNightEl.placeholder = typePrice[this.value];
  priceNightEl.value = typePrice[this.value];
  sliderEl.noUiSlider.set([priceNightEl.value, null]);
  pristine.validate(priceNightEl);
  pristine.validate(typeLivingEl);
}

typeLivingEl.addEventListener('change', onTypeChange);

pristine.addValidator(
  priceNightEl,
  validatePrice,
  messagePrice);

pristine.addValidator(
  typeLivingEl,
  validateType,
  messageType);

//validate time
function onTimeChange() {
  timeInEl.value = this.value;
  timeOutEl.value = this.value;
}

timeInEl.addEventListener('change', onTimeChange);
timeOutEl.addEventListener('change', onTimeChange);

const blockSubmitButton = () => {
  submitButtonEl.disabled = true;
  submitButtonEl.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButtonEl.disabled = false;
  submitButtonEl.textContent = 'Опубликовать';
};

const resetForm = () => {
  getData((neighbors) => {
    renderNeighbors(neighbors);
  });
  resetMap();
  adFormEl.classList.remove('ad-form--disabled');
  adFormEl.reset();
  addressEl.value = '35.60439, 139.74142';
  sliderEl.noUiSlider.set([5000, null]);
  formFilterEl.reset();
  const popup = document.querySelector('.leaflet-popup');
  if (popup) {
    popup.style.display = 'none';
  }
  const preview = document.querySelector('.ad-form-header__preview img');
  preview.src = 'img/muffin-grey.svg';
  const containerPreview = document.querySelector('.ad-form__photo');
  if (containerPreview.querySelector('img')) {
    containerPreview.querySelector('img').remove();
  }
};

const setUserFormSubmit = (onSuccess) => {
  adFormEl.addEventListener('submit', (evt) => {
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
          showAlert(messErrorTemplate);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

adFormEl.querySelector('.ad-form__reset').addEventListener('click', resetForm);

export {adFormEl, addressEl, activateForm, desactivateForm, resetForm, setUserFormSubmit};
