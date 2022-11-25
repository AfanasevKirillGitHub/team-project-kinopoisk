//  Возвращает необходимый список жанров
const makeGenre = (genre = [], allGenres = []) => {
  const genreList = allGenres.reduce((acc, genreItem) => {
    if (genre.includes(genreItem.id)) {
      acc.push(genreItem.name);
    }
    return acc;
  }, []);
  return genreList
    .map(genreItem => `<li class="movie-card_genre-item">${genreItem}</li>`)
    .join('');
};

//  Рендерит весь список с фильмами
export const makeMovieList = (results = [], allGenres = []) => {
  return results
    .map(
      ({
        poster_path,
        title,
        genre_ids,
        release_date,
        id,
      }) => `<li class="movie-card" data-id="${id}">
  <img class="movie-card_img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" />
  <h2 class="movie-card_title">${title}</h2>
  <ul class="movie-card_genre-list">${makeGenre(genre_ids, allGenres)}</ul>
  <p class="movie-card_relize-info">${release_date.slice(0, 4)}</p>
</li>
`
    )
    .join('');
};

// Рендерит 1 карточку, нужно передавать callBack для рендера жанров.
export const makeOneCard = (
  poster_path,
  title,
  genre_ids,
  release_date,
  id,
  allGenres = []
) => {
  return `<li class="movie-card" data-id="${id}">
  <img class="movie-card_img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" />
  <h2 class="movie-card_title">${title}</h2>
  <ul class="movie-card_genre-list">${makeGenre(genre_ids, allGenres)}</ul>
  <p class="movie-card_relize-info">${release_date.slice(0, 4)}</p>
</li>
`;
};
