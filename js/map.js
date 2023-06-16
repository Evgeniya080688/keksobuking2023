import {address, activateForm, desactivateForm} from './form-use.js';
import {renderAdvert} from './cards.js';
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
//filtred by type

const filerType = (advert,filterParams) => {
  markerGroup.clearLayers();
  const form = document.querySelector('.map__filters');
  const type = form.querySelector('#housing-type').value;

  filterParams.forEach((param, key) => {
    let suit = true;
    console.log(param);
    switch (key) {
      case 'housing-type':
        suit = (advert.offer.type === param);
        break;
      case 'housing-price':
        suit = (advert.offer.type === param);
        break;
      case 'housing-rooms':
        suit = (advert.offer.rooms === param);
        break;
      case 'housing-guests':
        suit = (advert.offer.guests === param);
        break;
    }
    if (!suit) { return false; }
  });
  return true;
  // if (type !== 'any') {
  //   return advert.offer.type === type;
  // } else {
  //   return advert;
  // }
};

const renderNeighbors = (adverts) => {
  const filterParams = [];
  const form = document.querySelector('.map__filters');
  const selectors = form.querySelectorAll('select');
  selectors
    .forEach((selector)=> {if (selector.value !== 'any') {filterParams[selector.name] = selector.value; }});
  console.log(filterParams);
  adverts
    .filter((advert) =>filerType(advert,filterParams))
    .slice(0, NEIGHBORS)
    .forEach((advert) => {
      createMarker(advert);
    });
};

//markerGroup.clearLayers();

export {map, marker, markerGroup, renderNeighbors};
