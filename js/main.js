function getRandomNum(min, max) {
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
}

const res = getRandomNum(6);
console.log(res);

function getCoordinates(min, max, signs) {
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
}

const res2 = getCoordinates(15);
console.log(res2);
