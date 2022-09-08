import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getMovieSearch } from './axiosRequests';
import { createMarkupGallery } from './create-markup_gallery';
import { pagination } from './pagination.js';
import { getTrendingMedia } from './axiosRequests';

if (document.title !== 'Filmoteka_Library') {
  document.querySelector('[js-data-search]').addEventListener('submit', e => {
    pagination.reset();
    e.preventDefault();
    localStorage.setItem('search', e.currentTarget.elements.search.value);
    // console.log(e.currentTarget.elements.search.value.length);
    if (e.currentTarget.elements.search.value.length === 0) {
      localStorage.removeItem('search');
      async function repeatRequest() {
        const { results } = await getTrendingMedia(1);
        createMarkupGallery(results);
      }
      repeatRequest();
      Notify.info('Search field needs to be filled');

      return;
    }
    const imputVelue = e.currentTarget.elements.search.value;
    getMovieSearch(imputVelue.trim(), 1)
      .then(({ results }) => {
        createMarkupGallery(results);
      })
      .catch(error => Notify.info("Oops, we didn't find such a movie"));
    e.currentTarget.elements.search.value = '';
  });
}
