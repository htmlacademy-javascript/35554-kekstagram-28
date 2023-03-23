import {isEscapeKey} from './util.js';

const MAX_HASHTAG = 5;

const pictureFormElement = document.querySelector('.img-upload__form');
const formEditImageElement = document.querySelector('.img-upload__overlay');
const uploadImageElement = document.querySelector('#upload-file');
const uploadCancelElement = document.querySelector('#upload-cancel');
const textHashtagElement = pictureFormElement.querySelector('.text__hashtags');
const textDescriptionElement = pictureFormElement.querySelector('.text__description');
const hashtagRegex = /^#[a-zа-яё\d]{1,19}$/i;

const onDocumentKeydown = (evt) => {
  if (textDescriptionElement === document.activeElement || textHashtagElement === document.activeElement) {
    return evt.stopPropagation();
  } else {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      closeModal();
    }
  }
};

const openModal = () => {
  formEditImageElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  formEditImageElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImageElement.value = '';
  textHashtagElement.value = '';
  textDescriptionElement.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

uploadImageElement.addEventListener('change', openModal);

uploadCancelElement.addEventListener('click', closeModal);

const pristine = new Pristine(pictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, false);

const validateTextDescription = (value) => value.length <= 140;

pristine.addValidator(textDescriptionElement, validateTextDescription, 'не более 140 символов');

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
  'Хештег содержит в начале #, состоит только из букв, чисел, без пробелов, спецсимволов, символов пунктуации, эмодзи и т.д.'
);

pictureFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
