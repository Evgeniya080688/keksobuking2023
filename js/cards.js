const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const getOfferType = (offerType) => {
  switch (offerType) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало' ;
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return 'Несуществующий тип';
  }
};

const renderAdvert = ({offer, author}) => {
  const cardEl = cardTemplate.cloneNode(true);
  const featuresContainerEl = cardEl.querySelector('.popup__features');
  const featuresListEl = featuresContainerEl.querySelectorAll('.popup__feature');
  const photosListEl = cardEl.querySelector('.popup__photos');
  const imgEl = photosListEl.querySelector('img');
  const features = offer.features;
  const photos = offer.photos;
  cardEl.querySelector('.popup__title').textContent = offer.title;
  cardEl.querySelector('.popup__text--address').textContent = offer.address;
  cardEl.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardEl.querySelector('.popup__type').textContent = getOfferType(offer.type);
  cardEl.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardEl.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (features) {
    featuresListEl.forEach(( featureListItem ) => {
      const newFeature = features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
      );

      if (!newFeature) {
        featureListItem.remove();
      }
    });
  }
  if (!cardEl.querySelector('.popup__feature')) {
    cardEl.querySelector('.popup__features').remove();
  }
  if (offer.description !== '') {
    cardEl.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardEl.querySelector('.popup__description').style.display = 'none';
  }
  cardEl.querySelector('.popup__avatar').src = author.avatar;
  if (!photos) {
    photosListEl.style.display = 'none';
  } else {
    photosListEl.innerHTML = '';
    photos.forEach((photo) => {
      const newImg = imgEl.cloneNode();
      newImg.src = photo;
      photosListEl.appendChild(newImg);
    });
  }
  return cardEl;
};

export { renderAdvert };

