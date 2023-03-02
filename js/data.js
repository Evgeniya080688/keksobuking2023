import { getRandomNum, getCoordinates, getRandomArrayElement } from './util.js';

const getPicture = (number) => {
  if (number < 10) {
    number = `0${String(number)}`;
  }
  {
    return `img/avatars/user${number}.png`;
  }
};

const TITLES = [
  'Уютная квартирка в центре города',
  'Шикарная однушка на краю тумана',
  'Великолепная трешка в самом спальном районе',
  'Стильный лофт для самых модных',
  'Милый домик на берегу озера',
  'Отличное решение для большой компании',
  'Идеальное жилье для большой семьи',
  'Романтический пентхаус для двоих'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow или hotel',
];

const CHECKS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'светлое и просторное помещение',
  'квартира в ремонтом в стиле лофт',
  'дом в современным стиле для модных и классных',
  'комфорт и чистота гарантированы',
  'яркий ремонт для ультра экстра неординарных натур',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getLocation = () => {
  {
    return {
      lat: getCoordinates(35.65000, 35.70000),
      lng: getCoordinates(139.70000, 139.80000),
    };
  }
};

const createOffer = (location) => {
  {
    return {
      title: getRandomArrayElement(TITLES),
      address: `{${location.lat}}, {${location.lng}}`,
      price: getRandomNum(100, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNum(1, 10),
      guests: getRandomNum(1,100),
      checkin: getRandomArrayElement(CHECKS),
      checkout: getRandomArrayElement(CHECKS),
      features: FEATURES.slice(getRandomNum(0, FEATURES.length - 1) , getRandomNum(1, FEATURES.length - 1)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: PHOTOS.slice(0, getRandomNum(1, FEATURES.length - 1)),
    };
  }
};

let numberPic = 0;

const createAdvert = () => {
  numberPic++;
  const locationCurrent = getLocation();
  return {
    author: getPicture(numberPic),
    offer: createOffer(locationCurrent),
    location: locationCurrent,
  };
};

const similarAdvert = (count) =>
  Array.from({length: count}, () =>
    createAdvert()
  );

export { similarAdvert };
