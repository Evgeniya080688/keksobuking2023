const ALERT_SHOW_TIME = 5000;

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

const getCoordinates = (min, max, signs = 5) => {
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

const getRandomArrayElement = (elements) => {
  {
    return elements[getRandomNum(0, elements.length - 1)];
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert, getRandomNum, getCoordinates, getRandomArrayElement };
