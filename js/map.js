import {addressEl, activateForm} from './form-use.js';
import {renderAdvert} from './cards.js';
import {hasAllElems} from './util.js';

const NEIGHBORS = 10;
const MAP_CENTER = [35.65422, 139.76305];
const TOKIO_CENTER = [35.60439, 139.74142];
const ZOOM = 12;

const map = L.map('map-canvas');

const initMap = () => {
  map
    .on('load', () => {
      activateForm();
    })
    .setView({
      lat: MAP_CENTER[0],
      lng: MAP_CENTER[1],
    }, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const myIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const simpleIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const marker = L.marker(
  {
    lat: TOKIO_CENTER[0],
    lng: TOKIO_CENTER[1],
  },
  {
    draggable: true,
    icon: myIcon
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  addressEl.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = ({author, offer, location}) => {
  const markerSimple = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: simpleIcon
    },
  );

  markerSimple
    .addTo(markerGroup)
    .bindPopup(renderAdvert({offer,author}));
};

const resetMap = () => {
  map.setView({
    lat: MAP_CENTER[0],
    lng: MAP_CENTER[1],
  }, 12);
  marker.setLatLng({
    lat: TOKIO_CENTER[0],
    lng: TOKIO_CENTER[1],
  });
};

const getFilteredNeighbors = (advert, filterParams, featuresParams) => {
  const popup = document.querySelector('.leaflet-popup');
  const type = advert.offer.type;
  const rooms = advert.offer.rooms;
  const price = advert.offer.price;
  const guests = advert.offer.guests;
  const featuresList = advert.offer.features;
  markerGroup.clearLayers();
  resetMap();
  if (popup) { popup.style.display = 'none'; }
  if (('housing-type' in filterParams) && (type !== filterParams['housing-type'])){
    return false;
  }
  if (('housing-rooms' in filterParams) && (rooms !== +filterParams['housing-rooms'])) {
    return false;
  }
  if ('housing-price' in filterParams) {
    switch (filterParams['housing-price']) {
      case 'middle':
        if (price < 10000 || price > 50000) { return false; }
        break;
      case 'low':
        if (price >= 10000) { return false; }
        break;
      case 'high':
        if (price < 50000) { return false; }
        break;
    }
  }
  if (('housing-guests' in filterParams) && (guests !== +filterParams['housing-guests'])) {
    return false;
  }
  if (featuresList && featuresParams!== []) {
    if (!hasAllElems(featuresParams,featuresList)) { return false; }
  }
  return true;
};

const renderNeighbors = (adverts) => {
  const filterParams = [];
  const form = document.querySelector('.map__filters');
  const selectors = form.querySelectorAll('select');
  const featuresParams = [];
  const features = form.querySelectorAll('input[type="checkbox"]:checked');
  features
    .forEach( (feature) => {
      featuresParams.push(feature.value);
    });
  selectors
    .forEach((selector) => {
      if (selector.value !== 'any') {filterParams[selector.name] = selector.value;}
    });
  adverts
    .filter((advert) => getFilteredNeighbors(advert, filterParams, featuresParams))
    .slice(0, NEIGHBORS)
    .forEach((advert) => {
      createMarker(advert);
    });
};

export {map, marker, markerGroup, TOKIO_CENTER, initMap, resetMap, renderNeighbors};
