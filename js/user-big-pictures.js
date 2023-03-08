import './photo-thumbnails.js';

const userBigPictureElement = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
// const userBigPictureOpenElement = document.querySelectorAll('.picture');
const userBigPictureCloseElement = document.querySelector('.big-picture__cancel');

function onOpenElement (evt) {
  if (evt.target.closest('.picture')) {
    userBigPictureElement.classList.remove('hidden');
  }
}

function onCloseElement (evt) {
  if (evt.target.closest('.big-picture__cancel')) {
    userBigPictureElement.classList.add('hidden');
  }
}

picturesContainer.addEventListener('click', onOpenElement);

userBigPictureCloseElement.addEventListener('click', onCloseElement);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    userBigPictureElement.classList.add('hidden');
  }
});
