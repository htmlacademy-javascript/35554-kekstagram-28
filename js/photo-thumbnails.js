import {createDescriptionsPhoto} from './data.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureThumbnails = createDescriptionsPhoto();

const renderDescriptionPictureList = () => {
  const pictureListFragment = document.createDocumentFragment();

  pictureThumbnails.forEach(({id, url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__img').id = id;
    pictureListFragment.append(pictureElement);
  });

  pictureContainer.append(pictureListFragment);
};

export {pictureThumbnails, renderDescriptionPictureList};
