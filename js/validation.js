import {showAlert} from './util.js';
import {sendData} from './api.js';

const MAX_HASHTAG = 5;
const MAX_LENGTH_DESCRIPTION = 140;
const ERROR_DESCRIPTION = 'не более 140 символов';
const ERROR_HASHTAG = 'Хештег содержит в начале #, состоит только из букв, чисел, без пробелов, спецсимволов, символов пунктуации, эмодзи и т.д.';

const hashtagRegex = /^#[a-zа-яё\d]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const pictureFormElement = document.querySelector('.img-upload__form');
const textHashtagElement = pictureFormElement.querySelector('.text__hashtags');
const textDescriptionElement = pictureFormElement.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');

const pristine = new Pristine(pictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

const validateTextDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

pristine.addValidator(textDescriptionElement, validateTextDescription, ERROR_DESCRIPTION);

const validateHashtag = (value) => {
  const textInput = value.trim().split(' ');
  const duplicates = textInput.filter((element, index, elements) =>
    elements.indexOf(element) !== index);
  if (duplicates.length === 0 && textInput.length <= MAX_HASHTAG) {
    return textInput.every((tag) => hashtagRegex.test(tag));
  }
};

pristine.addValidator(
  textHashtagElement,
  validateHashtag,
  ERROR_HASHTAG
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (onSuccess) => {
  pictureFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {onFormSubmit};
