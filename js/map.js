import {address, activateForm} from './form-use.js';
import { listAdvert } from './data.js';
import {renderAdverts} from './cards.js';

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.41,
    lng:  139.36,
  }, 10);

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

const advertisements = listAdvert(10);
console.log(advertisements);
//renderAdverts(advertisements);

const simpleIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const points = [];

advertisements.forEach(({location,offer})=>{
  const point = {
    title: offer.title,
    lat: location.lat,
    lng: location.lng
  };
  points.push(point);
});
console.log(points);

points.forEach(({lat, lng}) => {
  const markerSimple = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: simpleIcon
    },
  );

  markerSimple.addTo(map);
});

export {map};
