import {address, activateForm} from './form-use.js';
import {renderAdvert} from './cards.js';

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

map.on('unload', (evt) => {
  console.log(evt);
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

//markerGroup.clearLayers();

export {map, marker, markerGroup, renderNeighbors};
