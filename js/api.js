import { showAlert, showErrorAlert } from './util.js';

const messSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const messErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

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
    .catch(() => {
      showErrorAlert('Ошибка получения данных!');
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
