import {isEscapeKey} from './util.js';
import {pictureThumbnails, renderDescriptionPictureList} from './photo-thumbnails.js';

const userBigPictureElement = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const userBigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture__img img');
const likesCountPicture = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const descriptionPicture = document.querySelector('.social__caption');
const commentsPicture = document.querySelector('.social__comments');
const commentPicture = document.querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    userBigPictureElement.classList.add('hidden');
  }
};

renderDescriptionPictureList();

const renderCommentsPicture = (elements) => {
  const commentListFragment = document.createDocumentFragment();
  elements.forEach(({avatar, name, message}) => {
    const commentElement = commentPicture.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentListFragment.append(commentElement);
  });
  commentsPicture.append(commentListFragment);
};

const clearCommentsList = () => {
  commentsPicture.innerHTML = '';
};

const renderDescriptionBigPicture = (element) => {
  bigPicture.src = element.url;
  likesCountPicture.textContent = element.likes;
  commentsCount.textContent = element.comments.length;
  descriptionPicture.textContent = element.description;
  clearCommentsList();
  renderCommentsPicture(element.comments);
};

const openPictureElement = () => {
  userBigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePictureElement = () => {
  userBigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture__img')) {
    openPictureElement();
    const data = pictureThumbnails.find((x) => x.id === parseInt(evt.target.id, 10));
    renderDescriptionBigPicture(data);
  }
});

userBigPictureCloseElement.addEventListener('click', (evt) => {
  if (evt.target.closest('.big-picture__cancel')) {
    closePictureElement(evt);
  }
});


