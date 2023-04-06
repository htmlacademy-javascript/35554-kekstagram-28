import {imagePreviewElement} from './scale.js';

const Effects = {
  NONE: {
    NAME: 'none',
    STYLE: 'none',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNIT: '',
  },
  CHROME: {
    NAME: 'chrome',
    STYLE: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: '',
  },
  SEPIA: {
    NAME: 'sepia',
    STYLE: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: '',
  },
  MARVIN: {
    NAME: 'marvin',
    STYLE: 'invert',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNIT: '%',
  },
  PHOBOS: {
    NAME: 'phobos',
    STYLE: 'blur',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    UNIT: 'px',
  },
  HEAT: {
    NAME: 'heat',
    STYLE: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    UNIT: '',
  }
};

const DEFAULT_EFFECT = Effects.NONE;
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
      min: effectCurrent.MIN,
      max: effectCurrent.MAX
    },
    start: effectCurrent.MAX,
    step: effectCurrent.STEP
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
    const valueEffect = evt.target.value;
    effectCurrent = Effects[valueEffect.toUpperCase()];
    imagePreviewElement.className = `effects__preview--${effectCurrent.NAME}`;
    updateOptionsSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();
  imagePreviewElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.STYLE
    : `${effectCurrent.STYLE}(${sliderValue}${effectCurrent.UNIT})`;
  effectValueElement.value = sliderValue;
};

const resetEffects = () => {
  effectCurrent = DEFAULT_EFFECT;
  updateOptionsSlider();
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: DEFAULT_EFFECT.MIN,
    max: DEFAULT_EFFECT.MAX,
  },
  start: DEFAULT_EFFECT.MAX,
  step: DEFAULT_EFFECT.STEP,
  connect: 'lower',
});
sliderHide();

export {resetEffects, onEffectsChange, onSliderUpdate};
