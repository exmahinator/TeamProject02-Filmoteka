import { getGenre, getTrendingMedia } from './service-themoviedb-api';
import { pagination } from './pagination.js';
import {getMovieSearch} from './service-themoviedb-api'

  localStorage.removeItem("search")
console.log(localStorage.getItem('search'))
const refs = {
  homePageGalleryList: document.querySelector('.gallery__list'),
};
console.log(localStorage.getItem('search'))

pagination.on('beforeMove', galleryMain);

async function galleryMain(page) {
  try {
    if (localStorage.getItem('search')!==null) {
      const searchName = localStorage.getItem('search')
      const searchPage = page.page
      getMovieSearch(searchName,searchPage).then(({results})=>{
      createMarkupGallery(results)})
      }

    const { results } = await getTrendingMedia(page ? page.page : 1);
    createMarkupGallery(results);
    console.log(results)
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
          genre_ids,
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
        />
        <h2 class="movie__name">${name || title}</h2>
        <p class="movie__description"> ${mapGanre(
          genre_ids,
          genresCreateObject
        )} | 
          ${dataRelize.slice(
            0,
            4
          )}<span class="movie__rating">${vote_average.toFixed(1)}</span>
        </p>
      </li>`;
        }
      )
      .join('');
    refs.homePageGalleryList.innerHTML = await markup;
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
