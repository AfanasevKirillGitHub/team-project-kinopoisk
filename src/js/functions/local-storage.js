import { getGenreMovieList } from '../api/get-api';
import { watchedBtnRef, queueBtnRef } from '../refs/refs';
import { filmData } from '../functions/openMovieInfo';

const LOCAL_STORAGE_KEY = 'genres';

export const setGenreOptions = async () => {
  const genre = await getGenreMovieList();
  const { genres } = genre.data;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(genres));
};

export const getGenreOptions = () => {
  const genres = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return genres;
};

let watched;
let queue;
let isAddedToWatched;
let isAddedToQueue;
let id;

export function modalBtnsHandler(externalId) {
  id = Number(externalId);

  if (!localStorage.getItem('watched')) {
    watchedBtnRef.textContent = 'ADD TO WATCHED';

    watched = [];
    localStorage.setItem('watched', JSON.stringify(watched));
  }
  if (!localStorage.getItem('queue')) {
    queueBtnRef.textContent = 'ADD TO QUEUE';

    queue = [];
    localStorage.setItem('queue', JSON.stringify(queue));
  }

  watched = JSON.parse(localStorage.getItem('watched'));
  isAddedToWatched = watched.findIndex(film => Number(film.id) === Number(id));

  if (isAddedToWatched === -1) {
    watchedBtnRef.textContent = 'ADD TO WATCHED';
  } else {
    watchedBtnRef.textContent = 'remove from whatched';
  }

  queue = JSON.parse(localStorage.getItem('queue'));
  isAddedToQueue = queue.findIndex(film => Number(film.id) === Number(id));

  if (isAddedToQueue === -1) {
    queueBtnRef.textContent = 'ADD TO QUEUE';
  } else {
    queueBtnRef.textContent = 'remove from queue';
  }

  watchedBtnRef.addEventListener('click', onWatchedBtnClick);
  queueBtnRef.addEventListener('click', onQueueBtnClick);
}

export function onWatchedBtnClick() {
  const watched = JSON.parse(localStorage.getItem('watched'));
  const isAddedToWatched = watched.findIndex(film => Number(film.id) === id);
  let watchedFilms;

  if (isAddedToWatched === -1) {
    watchedFilms = [...watched, filmData.data];
    localStorage.setItem('watched', JSON.stringify(watchedFilms));
    watchedBtnRef.textContent = 'remove from whatched';
  } else {
    watchedFilms = watched.filter(movie => movie.id !== id);
    localStorage.setItem('watched', JSON.stringify(watchedFilms));
    watchedBtnRef.textContent = 'ADD TO WATCHED';
  }
}

export function onQueueBtnClick() {
  const queue = JSON.parse(localStorage.getItem('queue'));
  const isAddedToQueue = queue.findIndex(film => Number(film.id) === id);
  let queueFilms;

  if (isAddedToQueue === -1) {
    queueFilms = [...queue, filmData.data];
    localStorage.setItem('queue', JSON.stringify(queueFilms));
    queueBtnRef.textContent = 'remove from queue';
  } else {
    queueFilms = queue.filter(movie => movie.id !== id);
    localStorage.setItem('queue', JSON.stringify(queueFilms));
    queueBtnRef.textContent = 'ADD TO QUEUE';
  }
}

export function getWatchedItems() {
  try {
    return JSON.parse(localStorage.getItem('watched'));
  } catch (error) {
    console.log(error);
  }
}

export function getQueueItems() {
  try {
    return JSON.parse(localStorage.getItem('queue'));
  } catch (error) {
    console.log(error);
  }
}
