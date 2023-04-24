import { listAdvert } from './data.js';
import { renderAdverts } from './cards.js';
import { activateForm, desactivateForm } from './form-use.js';

const advertisements = listAdvert(10);
console.log(advertisements);
renderAdverts(advertisements);
activateForm();
