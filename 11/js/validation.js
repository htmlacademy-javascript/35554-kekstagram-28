const MAX_HASHTAG = 5;
const MAX_LENGTH_DESCRIPTION = 140;
const ERROR_DESCRIPTION = 'не более 140 символов';
const ERROR_HASHTAG = 'Хештег содержит в начале #, состоит только из букв, чисел, без пробелов, спецсимволов, символов пунктуации, эмодзи и т.д.';

const hashtagRegex = /^#[a-zа-яё\d]{1,19}$/i;

const pictureFormElement = document.querySelector('.img-upload__form');
const textHashtagElement = pictureFormElement.querySelector('.text__hashtags');
const textDescriptionElement = pictureFormElement.querySelector('.text__description');

const pristine = new Pristine(pictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

const validateTextDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

pristine.addValidator(textDescriptionElement, validateTextDescription, ERROR_DESCRIPTION);

const validateHashtag = (value) => {
  const textInput = value.trim().split(' ').filter((text) => text.trim().length);
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

export {pristine};
