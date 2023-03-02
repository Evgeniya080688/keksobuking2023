// Функция взята из интернета
// Источник - https://up.htmlacademy.ru/profession/react-lite/2/lite-javascript/2/tasks/6

// const getRandomPositiveInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
//   const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };
//
// const getRandomPositiveFloat = (a, b, digits = 1) => {
//   const lower = Math.min(Math.abs(a), Math.abs(b));
//   const upper = Math.max(Math.abs(a), Math.abs(b));
//   const result = Math.random() * (upper - lower) + lower;
//   return +result.toFixed(digits);
// };

const getRandomNum = (min, max) => {
  try {
    if (max === undefined) {
      //если ввели только 1 параметр
      max = min;
      min = 0;
    }
    if (min === undefined) {
      //если ввели только 1 параметр
      throw new Error('Необходимо ввести хотя бы один параметр');
    }
    if (!Number(max) || !Number(max)) {
      //если ввели не число
      throw new Error('Введенные параметры должны быть числами');
    }
    if (max < 0 || min < 0) {
      //если ввели отрицательное число
      throw new Error('Числа диапазона должны быть положительными');
    }
    min = Math.ceil(min);
    max = Math.floor(max);

    if (min > max) {
      const oldMin = min;
      min = max;
      max = oldMin;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } catch (err) {
    console.error(err); // в консоль попадает сообщение об ошибке и стек ошибки
  }
};

const getCoordinates = (min, max, signs = 1) => {
  try {
    if (min > max) {
      const oldMin = min;
      min = max;
      max = oldMin;
    }
    signs = Math.round(signs);
    if (min === undefined) {
      throw new Error('Необходимо ввести хотя бы одно число');
    }
    if (max === undefined) {
      max = min;
      min = 0;
      signs = 2;
    }
    if (min < 0 || max < 0 || signs < 0 ) {
      throw new Error('Параметры должны быть положительными');
    }
    if (!Number(max) || !Number(max) || !Number(signs)) {
      //если ввели не число
      throw new Error('Введенные параметры должны быть числами');
    }
    if (Math.random() < 0.5) {
      return ((1 - Math.random()) * (max - min) + min).toFixed(signs);
    }
    return (Math.random() * (max - min) + min).toFixed(signs);
  } catch (err) {
    console.error(err); // в консоль попадает сообщение об ошибке и стек ошибки
  }
};

const SIMILAR_ADVERT_COUNT = 10;

const getRandomArrayElement = (elements) => {
  return elements[getRandomNum(0, elements.length - 1)];
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
    lat: getCoordinates(35.65000, 35.70000),
    lng: getCoordinates(139.70000, 139.80000),
  };
};

const createOffer = (location) => {
  return {
    title: getRandomArrayElement(TITLES),
    address: `{${location.lat}}, {${location.lng}}`,
    price: getRandomNum(100, 10000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomNum(1, 10),
    guests: getRandomNum(1,100),
    checkin: getRandomArrayElement(CHEKS),
    checkout: getRandomArrayElement(CHEKS),
    features: FEATURES.slice(getRandomNum(0, FEATURES.length - 1) , getRandomNum(1, FEATURES.length - 1)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: PHOTOS.slice(0, getRandomNum(1, FEATURES.length - 1)),
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
