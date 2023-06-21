import {initMap} from './map.js';
import {setUserFormSubmit, resetForm, desactivateForm} from './form-use.js';
import {getData} from './api.js';
import {renderNeighbors} from './map.js';
import {setFilter} from './form-filter.js';
import {debounce} from './util.js';
import './avatar.js';

const RERENDER_DELAY = 500;

desactivateForm();
initMap();

getData((neighbors) => {
  renderNeighbors(neighbors);
  setFilter(debounce(
    () => renderNeighbors(neighbors),
    RERENDER_DELAY,
  ));
});

setUserFormSubmit(resetForm);


