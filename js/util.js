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

const messSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const messErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onEscKeydown = (evt, alert) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    alert.remove();
    document.removeEventListener('keydown', (e) => onEscKeydown(e,alert));
  }
};

const showErrorAlert = (message) => {
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

const showAlert = (template) => {
  const alertContainer = template.cloneNode(true);
  document.body.append(alertContainer);
  alertContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    alertContainer.remove();
  });
  document.addEventListener('keydown', (evt) => onEscKeydown(evt,alertContainer));
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const hasAllElems = (arr1, arr2) => arr1.every((elem) => arr2.includes(elem));

export { hasAllElems, throttle, debounce, showAlert, showErrorAlert, getRandomNum, getCoordinates, getRandomArrayElement, messSuccessTemplate, messErrorTemplate };
