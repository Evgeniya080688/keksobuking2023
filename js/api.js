import { showAlert, showErrorAlert, messErrorTemplate } from './util.js';

const getData = (onSuccess) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showErrorAlert('Ошибка получения данных!');
    })
    .then((neighbors) => {
      onSuccess(neighbors);
    })
    .catch((error) => {
      showErrorAlert(error.message);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showAlert(messErrorTemplate);
      }
    })
    .catch(() => {
      showAlert(messErrorTemplate);
    });
};

export {getData, sendData};
