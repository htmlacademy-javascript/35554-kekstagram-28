import {imagePreviewElement} from './scale.js';

const effectRadioButtonElement = document.querySelector('.effects__radio');
const effectValueElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectContainerElement = document.querySelector('.img-upload__effect-level');

const showEffectSlider = () => {
};
showEffectSlider();

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
});

effectSliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = effectSliderElement.noUiSlider.get();
});
