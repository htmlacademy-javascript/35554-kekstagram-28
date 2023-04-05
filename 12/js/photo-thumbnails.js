const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThumbnails = (pictureThumbnails) => {
  const pictureListFragment = document.createDocumentFragment();

  pictureThumbnails.forEach(({id, url, likes, comments}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.thumbnailId = id;
    pictureListFragment.append(pictureElement);
  });

  pictureContainerElement
    .querySelectorAll('.picture')
    .forEach((element) => element.remove());
  pictureContainerElement.append(pictureListFragment);
};

export {renderThumbnails};
