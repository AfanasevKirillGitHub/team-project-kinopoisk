import { getWatchedItems } from './local-storage';
import { getQueueItems } from './local-storage';
import {
  listRef,
  libraryWatchedBtnRef,
  libraryQueueBtnRef,
  librarydivRef,
} from '../refs/refs';
import { makeLibraryMovieList } from '../components/movie-cards';

// наажтие кнопок

export function onWatchedBtn() {
  libraryWatchedBtnRef.classList.add('active-button');
  libraryQueueBtnRef.classList.remove('active-button');
  const localStorageWathed = getWatchedItems();
  if (localStorageWathed?.length > 0) {
    librarydivRef.classList.add('visually-hidden');
    makeFilmCard(getWatchedItems);
  } else {
    listRef.innerHTML = '';
    librarydivRef.classList.remove('visually-hidden');
  }
}

export function onQueueBtn() {
  libraryQueueBtnRef.classList.add('active-button');
  libraryWatchedBtnRef.classList.remove('active-button');

  const localStorageQueue = getQueueItems();

  if (localStorageQueue?.length > 0) {
    librarydivRef.classList.add('visually-hidden');
    makeFilmCard(getQueueItems);
  } else {
    listRef.innerHTML = '';
    librarydivRef.classList.remove('visually-hidden');
  }
}

// создание карточки с фильмами

export function makeFilmCard(data = getWatchedItems) {
  try {
    const localStorageWathed = getWatchedItems();

    if (localStorageWathed?.length > 0) {
      librarydivRef.classList.add('visually-hidden');
    }
    const movies = data() ?? [];
    const movieList = makeLibraryMovieList(movies);
    listRef.innerHTML = movieList;
  } catch (err) {
    console.log(err);
  }
}
