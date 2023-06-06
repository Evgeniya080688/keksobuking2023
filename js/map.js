import {address, activateForm} from './form-use.js';
import {getData} from './api.js';
import {renderAdvert} from './cards.js';

const NEIGHBORS = 10;

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

const renderNeighbors = (adverts) => {
  adverts.forEach((advert) => {
    createMarker(advert);
  });
};

const advertisements = getData((neighbors) => {
  renderNeighbors(neighbors.slice(0, NEIGHBORS));
});

console.log(advertisements);

const simpleIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

//markerGroup.clearLayers();

export {map};
