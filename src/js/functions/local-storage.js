import { getGenreMovieList } from '../api/get-api';
import {
  watchedBtnRef,
  queueBtnRef,
  kidsSectionRef,
  homeSectionRef,
} from '../refs/refs';
import { filmData } from '../functions/openMovieInfo';
import {
  writeUserDataWathed,
  deleteUserDataWathed,
  writeUserDataQueue,
  deleteUserDataQueue,
  listOfDataQueue,
  listOfDataWathed,
} from '../functions/login';
// import { getDatabase, ref, set, onValue, remove } from 'firebase/database';

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
  const user = localStorage.getItem('userID');

  if (user.length === 0) {
    console.log('не залогинен');
    if (!localStorage.getItem('watched')) {
      watchedBtnRef.textContent = 'ADD TO WATCHED';
      watchedBtnRef.classList.remove('modal__button--active');

      watched = [];
      localStorage.setItem('watched', JSON.stringify(watched));
    }
    if (!localStorage.getItem('queue')) {
      queueBtnRef.textContent = 'ADD TO QUEUE';
      queueBtnRef.classList.remove('modal__button--active');

      queue = [];
      localStorage.setItem('queue', JSON.stringify(queue));
    }

    watched = JSON.parse(localStorage.getItem('watched'));
    isAddedToWatched = watched.findIndex(
      film => Number(film.id) === Number(id)
    );

    if (isAddedToWatched === -1) {
      watchedBtnRef.textContent = 'ADD TO WATCHED';
      watchedBtnRef.classList.remove('modal__button--active');
    } else {
      watchedBtnRef.textContent = 'REMOVE FROM WATCHED';
      watchedBtnRef.classList.add('modal__button--active');
    }

    queue = JSON.parse(localStorage.getItem('queue'));
    isAddedToQueue = queue.findIndex(film => Number(film.id) === Number(id));

    if (isAddedToQueue === -1) {
      queueBtnRef.textContent = 'ADD TO QUEUE';
      queueBtnRef.classList.remove('modal__button--active');
    } else {
      queueBtnRef.textContent = 'REMOVE FROM QUEUE';
      queueBtnRef.classList.add('modal__button--active');
    }

    watchedBtnRef.addEventListener('click', onWatchedBtnClick);
    queueBtnRef.addEventListener('click', onQueueBtnClick);
  } else {
    watched = listOfDataWathed;
    console.log(watched);
    isAddedToWatched = watched.findIndex(
      film => Number(film.id) === Number(id)
    );
    console.log(isAddedToWatched);

    if (isAddedToWatched === -1) {
      watchedBtnRef.textContent = 'ADD TO WATCHED';
      watchedBtnRef.classList.remove('modal__button--active');
    } else {
      watchedBtnRef.textContent = 'REMOVE FROM WATCHED';
      watchedBtnRef.classList.add('modal__button--active');
    }

    queue = listOfDataQueue;
    isAddedToQueue = queue.findIndex(film => Number(film.id) === Number(id));

    if (isAddedToQueue === -1) {
      queueBtnRef.textContent = 'ADD TO QUEUE';
      queueBtnRef.classList.remove('modal__button--active');
    } else {
      queueBtnRef.textContent = 'REMOVE FROM QUEUE';
      queueBtnRef.classList.add('modal__button--active');
    }

    watchedBtnRef.addEventListener('click', onWatchedBtnClick);
    queueBtnRef.addEventListener('click', onQueueBtnClick);
  }
}

export function onWatchedBtnClick() {
  const user = localStorage.getItem('userID');
  if (user.length === 0) {
    const watched = JSON.parse(localStorage.getItem('watched'));
    const isAddedToWatched = watched.findIndex(film => Number(film.id) === id);
    let watchedFilms;
    if (isAddedToWatched === -1) {
      watchedFilms = [...watched, filmData.data];
      console.log(filmData.data);
      localStorage.setItem('watched', JSON.stringify(watchedFilms));
      watchedBtnRef.textContent = 'REMOVE FROM WATCHED';
      watchedBtnRef.classList.add('modal__button--active');
    } else {
      watchedFilms = watched.filter(movie => movie.id !== id);
      localStorage.setItem('watched', JSON.stringify(watchedFilms));
      watchedBtnRef.textContent = 'ADD TO WATCHED';
      watchedBtnRef.classList.remove('modal__button--active');
    }
  } else {
    const watched = listOfDataWathed;
    const isAddedToWatched = watched.findIndex(film => Number(film.id) === id);
    // let watchedFilms;
    if (isAddedToWatched === -1) {
      watchedFilms = [...watched, filmData.data];
      console.log(filmData.data);
      writeUserDataWathed(
        localStorage.getItem('userID'),
        filmData.data.id,
        filmData.data.poster_path,
        filmData.data.title,
        filmData.data.genres,
        filmData.data.release_date,
        filmData.data.id,
        filmData.data.vote_count,
        filmData.data.vote_average,
        filmData.data.popularity,
        filmData.data.overview
      );
      watchedBtnRef.textContent = 'REMOVE FROM WATCHED';
      watchedBtnRef.classList.add('modal__button--active');
    } else {
      watchedFilms = watched.filter(movie => movie.id !== id);
      deleteUserDataWathed(localStorage.getItem('userID'), filmData.data.id);
      watchedBtnRef.textContent = 'ADD TO WATCHED';
      watchedBtnRef.classList.remove('modal__button--active');
    }
  }
}

export function onQueueBtnClick() {
  const user = localStorage.getItem('userID');
  if (user.length === 0) {
    const queue = JSON.parse(localStorage.getItem('watched'));
    const isAddedToWatched = queue.findIndex(film => Number(film.id) === id);
    let queueFilms;
    if (isAddedToWatched === -1) {
      queueFilms = [...queue, filmData.data];
      console.log(filmData.data);
      localStorage.setItem('queue', JSON.stringify(queueFilms));
      queueBtnRef.textContent = 'REMOVE FROM QUEUE';
      queueBtnRef.classList.add('modal__button--active');
    } else {
      queueFilms = queue.filter(movie => movie.id !== id);
      localStorage.setItem('queue', JSON.stringify(queueFilms));
      queueBtnRef.textContent = 'ADD TO QUEUE';
      queueBtnRef.classList.remove('modal__button--active');
    }
  } else {
    const queue = listOfDataQueue;
    const isAddedToQueue = queue.findIndex(film => Number(film.id) === id);
    let queueFilms;
    if (isAddedToQueue === -1) {
      queueFilms = [...queue, filmData.data];
      writeUserDataQueue(
        localStorage.getItem('userID'),
        filmData.data.id,
        filmData.data.poster_path,
        filmData.data.title,
        filmData.data.genres,
        filmData.data.release_date,
        filmData.data.id,
        filmData.data.vote_count,
        filmData.data.vote_average,
        filmData.data.popularity,
        filmData.data.overview
      );
      queueBtnRef.textContent = 'REMOVE FROM QUEUE';
      queueBtnRef.classList.add('modal__button--active');
    } else {
      queueFilms = queue.filter(movie => movie.id !== id);
      deleteUserDataQueue(localStorage.getItem('userID'), filmData.data.id);
      queueBtnRef.textContent = 'ADD TO QUEUE';
      queueBtnRef.classList.remove('modal__button--active');
    }
  }
}

export function getWatchedItems() {
  if (!kidsSectionRef && !homeSectionRef) {
    try {
      return localStorage.getItem('userID') !== '' &&
        localStorage.getItem('userID') !== null
        ? listOfDataWathed
        : JSON.parse(localStorage.getItem('watched'));
    } catch (error) {
      console.log(error);
    }
  }
}

export function getQueueItems() {
  if (!kidsSectionRef && !homeSectionRef) {
    try {
      return localStorage.getItem('userID') !== '' &&
        localStorage.getItem('userID') !== null
        ? listOfDataQueue
        : JSON.parse(localStorage.getItem('queue'));
    } catch (error) {
      console.log(error);
    }
  }
}

// export function getWatchedItems() {
//   try {
//     return localStorage.getItem('userID') !== '' &&
//       localStorage.getItem('userID') !== null
//       ? listOfDataWathed
//       : JSON.parse(localStorage.getItem('watched'));
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function getQueueItems() {
//   try {
//     return localStorage.getItem('userID') !== '' &&
//       localStorage.getItem('userID') !== null
//       ? listOfDataQueue
//       : JSON.parse(localStorage.getItem('queue'));
//   } catch (error) {
//     console.log(error);
//   }
// }
