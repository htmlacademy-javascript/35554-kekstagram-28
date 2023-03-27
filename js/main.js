import {createDetailsPhoto} from './data.js';
import {renderGallery} from './big-pictures.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {modalCloseHandler} from './form.js';
import {onFormSubmit} from './validation.js';
import {getData} from './api.js';

renderGallery(createDetailsPhoto());

getData()
  .then((thumbnails) => {
    console.log(thumbnails);
    renderThumbnails(thumbnails);
  });

onFormSubmit(modalCloseHandler);
