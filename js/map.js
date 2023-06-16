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
  const suit = true;
  console.log(filterParams);
  if (('housing-type' in filterParams) && (advert.offer.type !== filterParams['housing-type'])){
    return false;
  }
  if (('housing-rooms' in filterParams) && (advert.offer.rooms !== +filterParams['housing-rooms'])) {
    return false;
  }
  if (('housing-price' in filterParams) && (advert.offer.rooms !== +filterParams['housing-rooms'])) {

    //   return false;
  }
  if (('housing-rooms' in filterParams) && (advert.offer.rooms !== +filterParams['housing-rooms'])) {
    return false;}
  return true;
};

const renderNeighbors = (adverts) => {
  const filterParams = [];
  const form = document.querySelector('.map__filters');
  const selectors = form.querySelectorAll('select');
  selectors
    .forEach((selector)=> {if (selector.value !== 'any') {filterParams[selector.name] = selector.value; }});
  adverts
    .filter((advert) =>filerType(advert,filterParams))
    .slice(0, NEIGHBORS)
    .forEach((advert) => {
      createMarker(advert);
    });
};

//markerGroup.clearLayers();

export {map, marker, markerGroup, renderNeighbors};
