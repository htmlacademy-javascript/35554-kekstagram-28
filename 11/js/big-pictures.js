import {isEscapeKey} from './util.js';

const MAX_COMMENTS = 5;
let comments;

const bigPictureContainerElement = document.querySelector('.big-picture');
const picturesContainerElement = document.querySelector('.pictures');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureElement = document.querySelector('.big-picture__img img');
const likesCountPictureElement = document.querySelector('.likes-count');
const commentsCountContainerElement = document.querySelector('.social__comment-count');
const commentsCountElement = document.querySelector('.comments-count');
const descriptionPictureElement = document.querySelector('.social__caption');
const commentsPictureElement = document.querySelector('.social__comments');
const commentPictureElement = document.querySelector('.social__comment');
const commentsLoaderElement = document.querySelector('.comments-loader');

const clearCommentsList = () => {
  commentsPictureElement.innerHTML = '';
};

const createCommentCount = (elements) => {
  commentsCountContainerElement.innerHTML =
    `${commentsPictureElement.children.length} из ${elements.length} комментариев`;
};

const createCommentsPicture = (elements) => {
  const commentListFragment = document.createDocumentFragment();
  elements.forEach(({avatar, name, message}) => {
    const commentElement = commentPictureElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentListFragment.append(commentElement);
  });
  commentsPictureElement.append(commentListFragment);
};

const renderComments = (elements) => {
  const commentsShown = elements.slice(0, MAX_COMMENTS);
  createCommentsPicture(commentsShown);
  createCommentCount(elements);
  if (commentsShown.length >= elements.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const loadMoreCommentsHandler = () => {
  const firstComment = commentsPictureElement.children.length;
  const lastComments = commentsPictureElement.children.length + MAX_COMMENTS;
  const commentsMoreLoad = comments.slice(firstComment, lastComments);
  createCommentsPicture(commentsMoreLoad);
  createCommentCount(comments);
  if (commentsPictureElement.children.length >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const renderBigPicture = (element) => {
  bigPictureElement.src = element.url;
  likesCountPictureElement.textContent = element.likes;
  commentsCountElement.textContent = element.comments.length;
  descriptionPictureElement.textContent = element.description;
  clearCommentsList();
  renderComments(element.comments);
  comments = element.comments;
  commentsLoaderElement.addEventListener('click', loadMoreCommentsHandler);
};

const onBigPictureClose = () => {
  clearCommentsList();
  commentsCountContainerElement.innerHTML = '';
  bigPictureContainerElement.classList.add('hidden');
  commentsLoaderElement.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.removeEventListener('click', onBigPictureClose);
  commentsLoaderElement.removeEventListener('click', loadMoreCommentsHandler);
};

const openBigPicture = () => {
  bigPictureContainerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.addEventListener('click', onBigPictureClose);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

const showBigPicture = (pictureThumbnails) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (thumbnail) {
      evt.preventDefault();
      openBigPicture();
      const dataPicture = pictureThumbnails.find(
        (item) => item.id === parseInt(thumbnail.dataset.thumbnailId, 10)
      );
      renderBigPicture(dataPicture);
    }
  });
};

export {showBigPicture};
