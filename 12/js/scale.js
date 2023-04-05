const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const scaleValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const changeValueScale = (element) => {
  scaleValueElement.value = `${element} %`;
  imagePreviewElement.style.transform = `scale(${element / 100})`;
};

const resizePicture = (scale) => {
  let scaleValue = parseInt(scaleValueElement.value, 10);
  if (scaleValue === scale) {
    return;
  }
  if (scale === MIN_SCALE) {
    scaleValue -= STEP_SCALE;
  } else if (scale === MAX_SCALE) {
    scaleValue += STEP_SCALE;
  }
  changeValueScale(scaleValue);
};

const onScaleSmaller = () => resizePicture(MIN_SCALE);

const onScaleBigger = () => resizePicture(MAX_SCALE);

const resetScale = () => changeValueScale(MAX_SCALE);

export {resetScale, imagePreviewElement, onScaleSmaller, onScaleBigger};
