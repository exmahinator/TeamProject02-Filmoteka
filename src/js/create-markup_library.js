const refs = {
  homePageGalleryList: document.querySelector('.gallery__list'),
};

export function createMarkupById(results) {
  const markup = results
    .sort(
      (firstReiting, secondReiting) =>
        secondReiting.vote_average - firstReiting.vote_average
    )
    .map(
      ({
        id,
        poster_path,
        name,
        first_air_date,
        title,
        release_date,
        genres,
        vote_average,
      }) => {
        const dataRelize = first_air_date || release_date;
        let imageUrl = 'https://image.tmdb.org/t/p/w500/' + poster_path;
        if (poster_path === null) {
          imageUrl =
            'https://www.drupal.org/files/project-images/broken-image.jpg';
        }
        return /*html*/ `<li class="gallery__item" data-id="${id}">
        <img
          class="movie__poster"
          src="${imageUrl}"
          alt="movie poster"
          data-id="${id}"
           width = "395"
          height = "574"
        />
        <h2 class="movie__name">${name || title}</h2>
        <p class="movie__description"> ${genres.map(({ name }) => {
          return name;
        })} | 
          ${dataRelize?.slice(
            0,
            4
          )}<span class="movie__rating">${vote_average.toFixed(1)}</span>
        </p>
      </li>`;
      }
    )
    .join('');
  refs.homePageGalleryList.innerHTML = markup;
}
