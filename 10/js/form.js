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
    successMessage.remove();
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onSuccessKeydown);
    document.removeEventListener('click', onSuccessMessageClose);
  }
};

const onSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
    document.removeEventListener('click', onSuccessMessageClose);
  }
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessMessageClose);
};

const onErrorKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onErrorMessageClose);
    document.addEventListener('keydown', onModalKeydown);
  }
};

const onErrorMessageClose = (evt) => {
  if (evt.target.closest('.error__button') || !evt.target.closest('.error__inner')) {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    document.removeEventListener('click', onErrorMessageClose);
    document.addEventListener('keydown', onModalKeydown);
  }
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  document.removeEventListener('keydown', onModalKeydown);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorMessageClose);
};

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
        .then(showSuccessMessage)
        .catch(showErrorMessage)
        .finally(unblockSubmitButton);
    }
  });
};

export {onFormSubmit};
