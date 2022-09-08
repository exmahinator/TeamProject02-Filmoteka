console.log(document.title);
import axios from 'axios';
import { createMarkupGallery } from './create-markup_gallery';
let pageNumber = 1;
const refs = {
  homePageGalleryList: document.querySelector('.gallery__list'),
};

if (document.title !== 'Filmoteka') {
  const watched = document.querySelector('.lib-watched-btn');
  const queue = document.querySelector('.lib-queue-btn');

  watched.addEventListener('click', onBtnWatchedShow);
  queue.addEventListener('click', onBtnShowQueue);

  axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
  axios.defaults.params = {
    api_key: 'f52fb5605503f66e762d80f647488744',
  };

  async function getFilmById(savedId) {
    try {
      const { data } = await axios.get(`/movie/${savedId}`);
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error.massege);
      modalContents.innerHTML =
        '<img src="http://lamcdn.net/lookatme.ru/post_image-image/sIaRmaFSMfrw8QJIBAa8mA-article.png" alt="404 Not found"/>';
    }
  }

  libOpen('Watched');

  async function libOpen(key) {
    let receivedWatchedArrById = [];
    const watchedArr = localStorage.getItem(key);
    const parcedWatchedArr = JSON.parse(watchedArr) ?? [];
    console.log(parcedWatchedArr);

    for (let i = 0; i < parcedWatchedArr.length; i++) {
      let film = await getFilmById(parcedWatchedArr[i]);
      receivedWatchedArrById.push(film);
    }

    createMarkupById(receivedWatchedArrById);
  }

  async function onBtnWatchedShow() {
    queue.classList.remove('active');
    watched.classList.add('active');
    libOpen('Watched');
  }

  async function onBtnShowQueue() {
    watched.classList.remove('active');
    queue.classList.add('active');
    libOpen('Queue');
  }

  function createMarkupById(results) {
    console.log(results);
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
        />
        <h2 class="movie__name">${name || title}</h2>
        <p class="movie__description"> ${genres.map(({ name }) => {
          return name;
        })} | 
          ${dataRelize.slice(
            0,
            4
          )}<span class="movie__rating">${vote_average.toFixed(1)}</span>
        </p>
      </li>`;
        }
      )
      .join('');
    console.log(markup);
    console.log(refs);
    refs.homePageGalleryList.innerHTML = markup;
  }
}
