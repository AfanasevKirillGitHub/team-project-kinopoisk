import { getPopular } from '../api/get-api';
import { makeMovieList } from '../components/movie-cards';
import { getGenreOptions } from './local-storage';
import { listRef } from '../refs/refs';

export const moviesListMarkupFirstRender = async () => {
  try {
    const movies = await getPopular();
    const { results } = movies.data;
    const genres = getGenreOptions() ?? [];
    const movieList = makeMovieList(results, genres);
    listRef.innerHTML = movieList;
  } catch (err) {
    console.log(err);
  }
};
