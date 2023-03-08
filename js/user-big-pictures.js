import './photo-thumbnails.js';

const userBigPictureElement = document.querySelector('.big-picture');
const userBigPictureOpenElement = document.querySelectorAll('.picture');
const userBigPictureCloseElement = document.querySelector('.big-picture__cancel');

userBigPictureOpenElement.addEventListener('click', () => {
  userBigPictureElement.classList.remove('hidden');
});

userBigPictureCloseElement.addEventListener('click', () => {
  userBigPictureElement.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    userBigPictureElement.classList.add('hidden');
  }
});
