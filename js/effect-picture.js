import {imagePreviewElement} from './scale.js';

const EFFECTS = [
  {name: 'none', style: 'none', min: 0, max: 100, step: 1, unit: ''},
  {name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  {name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  {name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  {name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
];

const DEFAULT_EFFECT = EFFECTS[0];
let effectCurrent = DEFAULT_EFFECT;

const effectValueElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectContainerElement = document.querySelector('.img-upload__effect-level');

const isDefault = () => effectCurrent === DEFAULT_EFFECT;

const sliderHide = () => effectContainerElement.classList.add('hidden');

const sliderShow = () => effectContainerElement.classList.remove('hidden');

const updateOptionsSlider = () => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: effectCurrent.min,
      max: effectCurrent.max
    },
    start: effectCurrent.max,
    step: effectCurrent.step
  });
  if (isDefault()) {
    sliderHide();
  } else {
    sliderShow();
  }
};

const onEffectsChange = (evt) => {
  const effect = evt.target.closest('.effects__radio');
  if (effect) {
    effectCurrent = EFFECTS.find((item) => item.name === evt.target.value);
    imagePreviewElement.className = `effects__preview--${effectCurrent.name}`;
    updateOptionsSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();
  imagePreviewElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${effectCurrent.style}(${sliderValue}${effectCurrent.unit})`;
  effectValueElement.value = sliderValue;
};

const resetEffects = () => updateOptionsSlider(DEFAULT_EFFECT);

noUiSlider.create(effectSliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
sliderHide();

effectSliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects, onEffectsChange};
