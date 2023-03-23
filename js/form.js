import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';

const MAX_HASHTAG = 5;
const MAX_LENGTH_DESCRIPTION = 140;
const ERROR_DESCRIPTION = 'не более 140 символов';
const ERROR_HASHTAG = 'Хештег содержит в начале #, состоит только из букв, чисел, без пробелов, спецсимволов, символов пунктуации, эмодзи и т.д.';

const pictureFormElement = document.querySelector('.img-upload__form');
const formEditImageElement = document.querySelector('.img-upload__overlay');
const uploadImageElement = document.querySelector('#upload-file');
const uploadCancelElement = document.querySelector('#upload-cancel');
const textHashtagElement = pictureFormElement.querySelector('.text__hashtags');
const textDescriptionElement = pictureFormElement.querySelector('.text__description');

const hashtagRegex = /^#[a-zа-яё\d]{1,19}$/i;

const openModal = () => {
  formEditImageElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetScale();
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  formEditImageElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureFormElement.reset();
  uploadImageElement.value = '';
  textHashtagElement.value = '';
  textDescriptionElement.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (textDescriptionElement === document.activeElement || textHashtagElement === document.activeElement) {
    return evt.stopPropagation();
  } else {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }
}

uploadImageElement.addEventListener('change', () => {
  openModal();
  // editScalePicture();
});

uploadCancelElement.addEventListener('click', closeModal);

const pristine = new Pristine(pictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, false);

const validateTextDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

pristine.addValidator(textDescriptionElement, validateTextDescription, ERROR_DESCRIPTION);

const validateHashtag = (value) => {
  const textInput = value.trim().split(' ');
  const duplicates = textInput.filter((element, index, elements) =>
    elements.indexOf(element) !== index);
  if (duplicates.length === 0 && textInput.length <= MAX_HASHTAG) {
    return textInput.every((elem) => hashtagRegex.test(elem));
  }
};

pristine.addValidator(
  textHashtagElement,
  validateHashtag,
  ERROR_HASHTAG
);

pictureFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
