import {createDetailsPhoto} from './data.js';
import {renderGallery} from './big-pictures.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {modalCloseHandler} from './form-modal.js';
import {onFormSubmit} from './form.js';
import {getData} from './api.js';

renderGallery(createDetailsPhoto());

getData()
  .then((thumbnails) => {
    renderThumbnails(thumbnails);
  });

onFormSubmit(modalCloseHandler);
