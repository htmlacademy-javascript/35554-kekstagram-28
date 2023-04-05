import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {pristine} from './validation.js';
import {onModalKeydown} from './form-modal.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);

const pictureFormElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');

const onSuccessMessageClose = (evt) => {
  if (evt.target.closest('.success__button') || !evt.target.closest('.success__inner')) {
    messageSuccessClose();
  }
};

function messageSuccessClose() {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onSuccessMessageClose);
}

function onSuccessKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageSuccessClose();
  }
}

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessMessageClose);
};

const onErrorMessageClose = (evt) => {
  if (evt.target.closest('.error__button') || !evt.target.closest('.error__inner')) {
    messageErrorClose();
  }
};

function messageErrorClose() {
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorKeydown);
  document.removeEventListener('click', onErrorMessageClose);
  document.addEventListener('keydown', onModalKeydown);
}

function onErrorKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageErrorClose();
  }
}

const showErrorMessage = () => {
  document.body.append(errorMessage);
  document.removeEventListener('keydown', onModalKeydown);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorMessageClose);
};

const changeSubmitButton = (bool, buttonText) => {
  submitButtonElement.disabled = bool;
  submitButtonElement.textContent = buttonText;
};

const blockSubmitButton = () => changeSubmitButton(true, SubmitButtonText.SENDING);

const unblockSubmitButton = () => changeSubmitButton(false, SubmitButtonText.IDLE);

const sendFormSubmit = (onSuccess) => {
  pictureFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(showErrorMessage)
        .finally(unblockSubmitButton);
    }
  });
};

export {sendFormSubmit};
