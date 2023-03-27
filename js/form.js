import {isEscapeKey} from './util.js';
import {resetScale, onScaleBigger, onScaleSmaller} from './scale.js';
import {onEffectsChange, resetEffects} from './effect-picture.js';

const pictureFormElement = document.querySelector('.img-upload__form');
const formEditImageElement = document.querySelector('.img-upload__overlay');
const uploadImageElement = document.querySelector('#upload-file');
const uploadCancelElement = document.querySelector('#upload-cancel');
const textHashtagElement = pictureFormElement.querySelector('.text__hashtags');
const textDescriptionElement = pictureFormElement.querySelector('.text__description');
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const effectsElement = document.querySelector('.effects');

const modalCloseHandler = () => {
  formEditImageElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureFormElement.reset();
  // pristine.reset();
  document.removeEventListener('keydown', onModalKeydown);
  uploadCancelElement.removeEventListener('click', modalCloseHandler);
  scaleSmallerElement.removeEventListener('click', onScaleSmaller);
  scaleBiggerElement.removeEventListener('click', onScaleBigger);
  effectsElement.removeEventListener('change', onEffectsChange);
};

const modalOpenHandler = () => {
  resetScale();
  resetEffects();
  formEditImageElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalKeydown);
  uploadCancelElement.addEventListener('click', modalCloseHandler);
  scaleSmallerElement.addEventListener('click', onScaleSmaller);
  scaleBiggerElement.addEventListener('click', onScaleBigger);
  effectsElement.addEventListener('change', onEffectsChange);
};

function onModalKeydown(evt) {
  if (textDescriptionElement === document.activeElement || textHashtagElement === document.activeElement) {
    return evt.stopPropagation();
  } else {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      modalCloseHandler();
    }
  }
}

uploadImageElement.addEventListener('change', modalOpenHandler);

export {formEditImageElement, modalOpenHandler, modalCloseHandler};
