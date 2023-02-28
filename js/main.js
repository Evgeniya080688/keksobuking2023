// Функция взята из интернета
// Источник - https://up.htmlacademy.ru/profession/react-lite/2/lite-javascript/2/tasks/6

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const SIMILAR_ADVERT_COUNT = 10;

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

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

const CHEKS = [
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
  return {
    lat: getRandomPositiveFloat(35.65000, 35.70000),
    lng: getRandomPositiveFloat(139.70000, 139.80000),
  };
};

const createOffer = (location) => {
  return {
    title: getRandomArrayElement(TITLES),
    address: `{${location.lat}}, {${location.lng}}`,
    price: getRandomPositiveInteger(100, 10000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(0, 10),
    guests: getRandomPositiveInteger(1,100),
    checkin: getRandomArrayElement(CHEKS),
    checkout: getRandomArrayElement(CHEKS),
    features: FEATURES.slice(getRandomPositiveInteger(0, FEATURES.length - 1) , getRandomPositiveInteger(1, FEATURES.length - 1)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: PHOTOS.slice(0, getRandomPositiveInteger(1, FEATURES.length - 1)),
  };
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

const similarAdvert = Array.from({length: SIMILAR_ADVERT_COUNT}, createAdvert);
console.log(similarAdvert);
