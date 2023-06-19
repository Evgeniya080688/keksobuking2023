const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const preview = document.querySelector('.ad-form-header__preview img');

const fileChooserRooms = document.querySelector('.ad-form__input');
const containerPreview = document.querySelector('.ad-form__photo');

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

fileChooserRooms.addEventListener('change', () => {
  const file = fileChooserRooms.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const imgPreview =  new Image(70, 70);
    imgPreview.src = URL.createObjectURL(file);
    containerPreview.appendChild(imgPreview);
  }
});


