import { getGenre, getTrendingMedia } from './service-themoviedb-api';
import { pagination } from './pagination.js';

const refs = {
  homePageGalleryList: document.querySelector('.gallery__list'),
};

pagination.on('beforeMove', galleryMain);

async function galleryMain(page) {
  try {
    const { results } = await getTrendingMedia(page ? page.page : 1);
    createMarkupGallery(results);
  } catch (error) {
    console.log(error.message);
  }
}

galleryMain();

export async function createMarkupGallery(results) {
  try {
    const { genres } = await getGenre();

    const genresCreateObject = getCreateObject(genres);
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
          let imageUrl = 'https://image.tmdb.org/t/p/w500/'+poster_path;
          if (poster_path === null) {
            imageUrl = 'https://www.drupal.org/files/project-images/broken-image.jpg';
          }
          return /*html*/ `<li class="gallery__item" data-id="${id}">
        <img
          class="movie__poster"
          src="${imageUrl}"
          alt="movie poster"
          data-id="${id}"
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
  return genreId
    .filter(genre => {
      return genresCreateObject[genre] !== undefined;
    })
    .map(genre => {
      return genresCreateObject[genre];
    })
    .join(', ');
}
