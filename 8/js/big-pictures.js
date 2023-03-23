import {isEscapeKey} from './util.js';
import {pictureThumbnails} from './photo-thumbnails.js';

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

const openPictureElement = () => {
  bigPictureContainerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePictureElement = () => {
  bigPictureContainerElement.classList.add('hidden');
  clearCommentsList();
  commentsLoaderElement.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.removeEventListener('click', closePictureElement);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureElement();
  }
}

const renderCommentsPicture = (elements, from, to) => {
  const commentListFragment = document.createDocumentFragment();
  elements.slice(from, to).forEach(({avatar, name, message}) => {
    const commentElement = commentPictureElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentListFragment.append(commentElement);
  });
  commentsPictureElement.append(commentListFragment);
  commentsCountContainerElement.textContent =
    `${commentsPictureElement.children.length} из ${elements.length} комментариев`;
};

const loadMoreComment = (elements, from, to) => {
  while (commentsPictureElement.children.length <= elements.length) {
    from += MAX_COMMENTS;
    to += MAX_COMMENTS;
    return () => {
      renderCommentsPicture(elements, from, to);
      commentsCountContainerElement.textContent =
        `${commentsPictureElement.children.length} из ${elements.length} комментариев`;
      if (commentsPictureElement.children.length === elements.length) {
        commentsLoaderElement.classList.add('hidden');
      }
      from += MAX_COMMENTS;
      to += MAX_COMMENTS;
    };
  }
};

const renderDescriptionBigPicture = (element) => {
  const from = 0;
  const to = MAX_COMMENTS;
  bigPictureElement.src = element.url;
  likesCountPictureElement.textContent = element.likes;
  commentsCountElement.textContent = element.comments.length;
  descriptionPictureElement.textContent = element.description;
  clearCommentsList();
  renderCommentsPicture(element.comments, from, to);
  if (commentsPictureElement.children.length === element.comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
  commentsLoaderElement.addEventListener('click', loadMoreComment(element.comments, from, to));
};

picturesContainerElement.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    evt.preventDefault();
    openPictureElement();
    const dataPicture = pictureThumbnails.find((x) =>
      x.id === parseInt(thumbnail.dataset.thumbnailId, 10));
    renderDescriptionBigPicture(dataPicture);
  }
  bigPictureCloseElement.addEventListener('click', closePictureElement);
});


