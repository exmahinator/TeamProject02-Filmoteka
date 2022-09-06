import { getGenre, getTrendingMedia } from './service-themoviedb-api';

const refs = {
  homePageGalleryList: document.querySelector('.gallery__list'),
};

async function galleryMain() {
  try {
    const { results } = await getTrendingMedia();
    console.log(results);
    createMarkupGallery(results);
  } catch (error) {
    console.log(error.message);
  }
}
galleryMain();

async function createMarkupGallery(results) {
  try {
    const { genres } = await getGenre();
    console.log(genres);

    const genresCreateObject = getCreateObject(genres);
    console.log(genresCreateObject);
    const markup = results
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
        <p class="movie__description"> ${mapGanre(
          genre_ids,
          genresCreateObject
        )} | 
          ${dataRelize.slice(0, 4)}
        </p>
      </li>`;
        }
      )
      .join('');
    refs.homePageGalleryList.innerHTML = markup;
  } catch (error) {
    console.log(error.massege);
  }
}

function getCreateObject(genres) {
  return genres.reduce((acc, { name, id }) => {
    return { ...acc, [id]: name };
  }, {});
}
function mapGanre(genreId, genresCreateObject) {
  // console.log(genreId);
  return genreId
    .filter(genre => {
      return genresCreateObject[genre] !== undefined;
    })
    .map(genre => {
      return genresCreateObject[genre];
    })
    .join(', ');
}
