import {address, activateForm, desactivateForm} from './form-use.js';
import {renderAdvert} from './cards.js';
import {hasAllElems} from './util.js';

const NEIGHBORS = 10;

desactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.65422,
    lng: 139.76305,
  }, 12);

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
    lat: 35.60439,
    lng: 139.74142,
  },
  {
    draggable: true,
    icon: myIcon
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
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

//filtred by ...
const filerType = (advert, filterParams, featuresParams) => {
  markerGroup.clearLayers();
  const popup = document.querySelector('.leaflet-popup');
  if (popup) {popup.style.display = 'none';}
  const type = advert.offer.type;
  const rooms = advert.offer.rooms;
  const price = advert.offer.price;
  const guests = advert.offer.guests;
  const featuresList = advert.offer.features;
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
  if (featuresList) {
    if (!hasAllElems(featuresParams,featuresList)) { return false; }
  } else {
    return false;
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
  console.log(featuresParams);
  selectors
    .forEach((selector)=> {if (selector.value !== 'any') {filterParams[selector.name] = selector.value; }});
  adverts
    .filter((advert) =>filerType(advert, filterParams, featuresParams))
    .slice(0, NEIGHBORS)
    .forEach((advert) => {
      createMarker(advert);
    });
};

export {map, marker, markerGroup, renderNeighbors};
