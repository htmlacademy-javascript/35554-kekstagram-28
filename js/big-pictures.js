import {isEscapeKey} from './util.js';
// import {renderThumbnails} from './photo-thumbnails.js';

const MAX_COMMENTS = 5;

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

const createCommentsPicture = (elements, from, to) => {
  const commentListFragment = document.createDocumentFragment();
  elements.slice(from, to).forEach(({avatar, name, message}) => {
    const commentElement = commentPictureElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentListFragment.append(commentElement);
  });
  commentsPictureElement.append(commentListFragment);
  createCommentCount(elements);
};

const renderComments = (elements, from, to) => {
  if (commentsPictureElement.children.length !== elements.length) {
    from += MAX_COMMENTS;
    to += MAX_COMMENTS;
    return () => {
      createCommentsPicture(elements, from, to);
      createCommentCount(elements);
      if (commentsPictureElement.children.length === elements.length) {
        commentsLoaderElement.classList.add('hidden');
        commentsLoaderElement.removeEventListener('click', renderComments(elements, from, to));
      }
      from += MAX_COMMENTS;
      to += MAX_COMMENTS;
    };
  }
};

const renderBigPicture = (element) => {
  const from = 0;
  const to = MAX_COMMENTS;
  bigPictureElement.src = element.url;
  likesCountPictureElement.textContent = element.likes;
  commentsCountElement.textContent = element.comments.length;
  descriptionPictureElement.textContent = element.description;
  clearCommentsList();
  createCommentsPicture(element.comments, from, to);
  commentsLoaderElement.addEventListener('click', renderComments(element.comments, from, to));
  if (commentsPictureElement.children.length === element.comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const onBigPictureClose = () => {
  clearCommentsList();
  commentsCountContainerElement.innerHTML = '';
  bigPictureContainerElement.classList.add('hidden');
  commentsLoaderElement.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.removeEventListener('click', onBigPictureClose);
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

const renderGallery = (pictureThumbnails) => {
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

export {renderGallery};
