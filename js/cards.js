const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const map = document.querySelector('#map-canvas');

const createAdvert = ({offer, author}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const features = offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  switch (offer.type) {
    case 'flat':
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      cardElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'hotel':
      cardElement.querySelector('.popup__type').textContent = 'Отель';
      break;
    default:
      cardElement.querySelector('.popup__type').textContent = 'Несуществующий тип';
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  featuresList.forEach(( featureListItem ) => {
    const newFeature = features.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!newFeature) {
      featureListItem.remove();
    }
  });
  if (offer.description !== '') {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').style.display = 'none';
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  const photosList = cardElement.querySelector('.popup__photos');
  const imgEl = photosList.querySelector('img');
  const photos = offer.photos;
  if (photos.length === 0) {
    photosList.style.display = 'none';
  } else {
    photosList.innerHTML = '';
    photos.forEach((photo) => {
      const newImg = imgEl.cloneNode();
      newImg.src = photo;
      photosList.appendChild(newImg);
    });
  }
  return cardElement;
};

const renderAdverts = (advertsList) => {
  const fragment = document.createDocumentFragment();
  advertsList.forEach((advertisement) => {
    const advertElement = createAdvert(advertisement);
    fragment.append(advertElement);
  });

  //map.append(fragment.children[5]);
};

export {renderAdverts};

