const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const scaleValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const changeValueScale = (element) => {
  scaleValueElement.value = `${element} %`;
  imagePreviewElement.style.transform = `scale(${element / 100})`;
};

const onScaleSmaller = () => {
  let scaleValue = parseInt(scaleValueElement.value, 10);
  if (scaleValue === MIN_SCALE) {
    return;
  }
  scaleValue -= STEP_SCALE;
  changeValueScale(scaleValue);
};

const onScaleBigger = () => {
  let scaleValue = parseInt(scaleValueElement.value, 10);
  if (scaleValue === MAX_SCALE) {
    return;
  }
  scaleValue += STEP_SCALE;
  changeValueScale(scaleValue);
};

const resetScale = () => changeValueScale(MAX_SCALE);

export {resetScale, imagePreviewElement, onScaleSmaller, onScaleBigger};
