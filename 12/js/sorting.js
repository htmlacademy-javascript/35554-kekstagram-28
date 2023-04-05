const MAX_COUNT_PICTURE = 10;
const Filters = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default'
};
let currentFilter;

const pictureFiltersElement = document.querySelector('.img-filters');

const sortRandomPicture = () => Math.random() - 0.5;

const sortDiscussedPicture = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getSortingPictures = (pictureThumbnails) => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return pictureThumbnails.slice().sort(sortRandomPicture).slice(0, MAX_COUNT_PICTURE);
    case Filters.DISCUSSED:
      return pictureThumbnails.slice().sort(sortDiscussedPicture);
    case Filters.DEFAULT:
      return pictureThumbnails.slice();
  }
};

const selectButtonFilter = (cb) => {
  pictureFiltersElement.addEventListener('click', (evt) => {
    const buttonFilter = evt.target.closest('.img-filters__button');
    if (buttonFilter) {
      currentFilter = buttonFilter.id;
      const filterActiveElement = pictureFiltersElement.querySelector('.img-filters__button--active');
      filterActiveElement.classList.remove('img-filters__button--active');
      buttonFilter.classList.add('img-filters__button--active');
      cb();
    }
  });
};

const showFilters = () => {
  pictureFiltersElement.classList.remove('img-filters--inactive');
};

export {showFilters, selectButtonFilter, getSortingPictures};
