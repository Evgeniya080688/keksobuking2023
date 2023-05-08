import { listAdvert } from './data.js';
import { renderAdverts } from './cards.js';
import { activateForm, desactivateForm } from './form-use.js';
import {map} from './map.js';

const advertisements = listAdvert(10);
console.log(advertisements);
renderAdverts(advertisements);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);



