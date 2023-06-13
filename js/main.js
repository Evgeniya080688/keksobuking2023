import {map,marker} from './map.js';
import {adForm, setUserFormSubmit, resetForm} from './form-use.js';
import {getData} from './api.js';
import {renderNeighbors} from './map.js';

const NEIGHBORS = 10;

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

getData((neighbors) => {
  renderNeighbors(neighbors.slice(0, NEIGHBORS));
});

setUserFormSubmit(resetForm(map,marker));
adForm.querySelector('.ad-form__reset').addEventListener('click', resetForm(map,marker));

