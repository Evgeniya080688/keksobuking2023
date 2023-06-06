import { showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch(
    'https://25.javascript.pages.academy/kekksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Ошибка сервера!');
    })
    .then((neighbors) => {
      onSuccess(neighbors);
    })
    .catch(() => {
      showAlert('Ошибка сервера!');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking/data',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
