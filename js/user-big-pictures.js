import {isEscapeKey} from './util.js';
import {pictureThumbnails, renderDescriptionPictureList} from './photo-thumbnails.js';

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
const commentAllElement = document.querySelectorAll('.social__comment');
const commentsLoaderElement = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closePictureElement();
  }
};

renderDescriptionPictureList();

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
};

const loadMoreComment = (elements) => {
  console.log(elements.length);
  let from = 0;
  let to = elements.length <= MAX_COMMENTS ? elements.length : MAX_COMMENTS;
  console.log(from, to);
  return () => {
    // const cropListComments = elements.slice(from, to);
    renderCommentsPicture(elements, from, to);
    if (commentsPictureElement.children.length === elements.length) {
      commentsLoaderElement.classList.add('hidden');
    }
    from += MAX_COMMENTS;
    to += MAX_COMMENTS;
    console.log(to, from);
  };
};

const clearCommentsList = () => {
  commentsPictureElement.innerHTML = '';
};

const renderDescriptionBigPicture = (element) => {
  bigPictureElement.src = element.url;
  likesCountPictureElement.textContent = element.likes;
  commentsCountElement.textContent = element.comments.length;
  descriptionPictureElement.textContent = element.description;
  clearCommentsList();
  renderCommentsPicture(element.comments);
  // loadMoreComment(element.comments);
  commentsLoaderElement.addEventListener('click', loadMoreComment(element.comments));
  // renderCommentsPicture(element.comments);
};

const openPictureElement = () => {
  bigPictureContainerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePictureElement = () => {
  bigPictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

picturesContainerElement.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture__img')) {
    evt.preventDefault();
    openPictureElement();
    const data = pictureThumbnails.find((x) => x.id === parseInt(evt.target.id, 10));
    console.log(data);
    renderDescriptionBigPicture(data);
  }
});

bigPictureCloseElement.addEventListener('click', () => {
  closePictureElement();
});
