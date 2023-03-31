const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThumbnails = (pictureThumbnails) => {
  const pictureListFragment = document.createDocumentFragment();

  pictureThumbnails.forEach(({id, url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.thumbnailId = id;
    pictureListFragment.append(pictureElement);
  });

  pictureContainer
    .querySelectorAll('.picture')
    .forEach((element) => element.remove());
  pictureContainer.append(pictureListFragment);
};

export {renderThumbnails};
