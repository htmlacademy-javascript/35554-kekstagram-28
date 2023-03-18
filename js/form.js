const pictureFormElement = document.querySelector('.img-upload__form');
const formEditImageElement = document.querySelector('.img-upload__overlay');
const upLoadImageElement = document.querySelector('#upload-file');

console.log(upLoadImageElement);
const openModal = () => {
  formEditImageElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

upLoadImageElement.addEventListener('click', () => {
  openModal();
});



const pristine = new Pristine(pictureFormElement);

pictureFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
