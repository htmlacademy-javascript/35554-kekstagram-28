const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnails = ({id, url, likes, comments}) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.thumbnailId = id;
  return pictureElement;
};

const renderThumbnails = (pictureThumbnails) => {
  const pictureListFragment = document.createDocumentFragment();
  pictureThumbnails.forEach((pictureElement) => {
    const thumbnailElement = createThumbnails(pictureElement);
    pictureListFragment.append(thumbnailElement);
  });
  pictureContainerElement
    .querySelectorAll('.picture')
    .forEach((element) => element.remove());
  pictureContainerElement.append(pictureListFragment);
};

export {renderThumbnails};
