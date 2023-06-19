import {map,marker} from './map.js';
import {adForm, setUserFormSubmit, resetForm, desactivateForm} from './form-use.js';
import {getData} from './api.js';
import {renderNeighbors} from './map.js';
import {setFilter} from './form-filter.js';
import {debounce} from './util.js';
import './avatar.js';

const RERENDER_DELAY = 500;

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

getData((neighbors) => {
  renderNeighbors(neighbors);
  setFilter(debounce(
    () => renderNeighbors(neighbors),
    RERENDER_DELAY,
  ));
});

setUserFormSubmit(resetForm(map,marker));
adForm.querySelector('.ad-form__reset').addEventListener('click', resetForm(map,marker));

