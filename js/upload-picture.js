const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__input');
const previewElement = document.querySelector('.img-upload__preview img');
const previewEffectsElement = document.querySelectorAll('.effects__preview');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
    previewEffectsElement.forEach((elements) => {
      elements.style.backgroundImage = `url(${previewElement.src})`;
    });
  }
});
