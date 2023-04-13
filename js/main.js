import { listAdvert } from './data.js';
import { renderAdverts } from './cards.js';
import { activateForm, desactivateForm } from './formact.js';

const advertisements = listAdvert(10);
console.log(advertisements);
renderAdverts(advertisements);
activateForm();
