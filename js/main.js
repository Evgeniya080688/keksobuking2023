function checkParam(param) {
  if (param >=0 && typeof(param) === 'number' && param!== undefined) {
    return true;
  }
  return false;
}

function getRandomNum(min, max) {
  if (!checkParam(min) || !checkParam(max)) {
    return new Error('Введенные параметры некорректны!');
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (min > max) {
      const oldMin = min;
      min = max;
      max = oldMin;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
const res = getRandomNum(-15);
console.log(res);

function getCoordinates(min, max, signs) {
  if (!checkParam(min) || !checkParam(max) || !checkParam(signs)) {
    return new Error('Введенные параметры некорректны!');
  } else {
    if (min > max) {
      const oldMin = min;
      min = max;
      max = oldMin;
    }
    signs = Math.round(signs);

    if (Math.random() < 0.5) {
      return ((1 - Math.random()) * (max - min) + min).toFixed(signs);
    }
    return (Math.random() * (max - min) + min).toFixed(signs);
  }
}
console.log(getCoordinates(1.53,  1, 2));
