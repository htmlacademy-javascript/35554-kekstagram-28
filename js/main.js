import {showBigPicture} from './big-pictures.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {onModalClose} from './form-modal.js';
import {sendFormSubmit} from './form.js';
import {getData} from './api.js';
import {getSortingPictures, selectButtonFilter, showFilters} from './sorting.js';
import {debounce, showAlert} from './util.js';

const RERENDER_DELAY = 500;

getData()
  .then((thumbnails) => {
    renderThumbnails(thumbnails);
    selectButtonFilter(debounce(() => renderThumbnails(getSortingPictures(thumbnails))), RERENDER_DELAY);
    showBigPicture(thumbnails);
    showFilters();
  })
  .catch((err) => showAlert(err.message));

sendFormSubmit(onModalClose);
