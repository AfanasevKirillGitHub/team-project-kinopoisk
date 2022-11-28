import { moviesListMarkupFirstRender } from './js/functions/render-home-page';
import { setGenreOptions } from './js/functions/local-storage';
import { openMovieInfo } from './js/functions/openMovieInfo';
import { listRef } from './js/refs/refs';

import './js/functions/searchFilm';
import { pagination } from './js/functions/pagination';

document.addEventListener('DOMContentLoaded', () => {
  setGenreOptions();
  moviesListMarkupFirstRender();
  listRef.addEventListener('click', openMovieInfo);
});

