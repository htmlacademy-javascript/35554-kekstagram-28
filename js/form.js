import {isEscapeKey, isNumbers} from './util.js';

const MAX_HASHTAG = 5;
const MAX_LENGTH_DESCRIPTION = 140;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
const ERROR_DESCRIPTION = 'не более 140 символов';
const ERROR_HASHTAG = 'Хештег содержит в начале #, состоит только из букв, чисел, без пробелов, спецсимволов, символов пунктуации, эмодзи и т.д.';

const pictureFormElement = document.querySelector('.img-upload__form');
const formEditImageElement = document.querySelector('.img-upload__overlay');
const uploadImageElement = document.querySelector('#upload-file');
const uploadCancelElement = document.querySelector('#upload-cancel');
const textHashtagElement = pictureFormElement.querySelector('.text__hashtags');
const textDescriptionElement = pictureFormElement.querySelector('.text__description');
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const hashtagRegex = /^#[a-zа-яё\d]{1,19}$/i;

const openModal = () => {
  formEditImageElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleValueElement.setAttribute('value', `${MAX_SCALE }%`);
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

const changeValueScale = (element) => {
  scaleValueElement.setAttribute('value', `${element} %`);
  imagePreviewElement.style.transform = `scale(${element / 100}deg)`;
  console.log(`${element / 100}`, imagePreviewElement.style.transform);
};

const editScalePicture = () => {
  let scaleValue = isNumbers(scaleValueElement.value);
  scaleSmallerElement.addEventListener('click', () => {
    if (scaleValue === MIN_SCALE) {
      return;
    }
    scaleValue -= STEP_SCALE;
    changeValueScale(scaleValue);
  });
  scaleBiggerElement.addEventListener('click', () => {
    if (scaleValue === MAX_SCALE) {
      return;
    }
    scaleValue += STEP_SCALE;
    changeValueScale(scaleValue);
  });
};

uploadImageElement.addEventListener('change', () => {
  openModal();
  editScalePicture();
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
