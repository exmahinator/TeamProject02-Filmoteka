export function createMarkupGallery(results) {
  return results
    .map(
      ({
        id,
        poster_path,
        name,
        first_air_date,
        title,
        release_date,
        genre_ids,
      }) => {
        const dataRelize = first_air_date || release_date;
        return /*html*/ `<li class="gallery__item" data-id="${id}">
        <img
          class="movie__poster"
          src="https://image.tmdb.org/t/p/w500/${poster_path}"
          alt="movie poster"
          
        />
        <h2 class="movie__name">${name || title}</h2>
        <p class="movie__description"> ${genre_ids} | 
          ${dataRelize.slice(0, 4)}
        </p>
      </li>`;
      }
    )
    .join('');
}
