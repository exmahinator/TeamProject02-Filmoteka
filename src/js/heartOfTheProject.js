import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getTrendingMedia, getMovieSearch } from './axiosRequests';
import { createMarkupGallery } from './create-markup_gallery';

if (document.title !== 'Filmoteka_Library') {
  const options = {
    totalItems: 0,
    itemsPerPage: 20,
    visiblePages: window.innerWidth <= 320 ? 1 : 5,
    page: 1,
  };
  let searchQuery = '';
  const pagination = new Pagination('pagination', options);

  const page = pagination.getCurrentPage();

  const renderRef = document.querySelector('.gallery__list');
  const pagesRef = document.querySelector('.tui-pagination');
  const searchRef = document.querySelector('[js-data-search]');

  getTrendingMedia(page).then(({ results, total_results }) => {
    pagination.reset(total_results);

    const markup = createMarkupGallery(results);

    renderRef.insertAdjacentHTML('beforeend', markup);
    pagesRef.classList.remove('visually-hidden');
  });

  async function trendFilms(event) {
    const currentPage = event.page;

    try {
      const { results } = await getTrendingMedia(currentPage);

      const markup = createMarkupGallery(results);

      renderRef.insertAdjacentHTML('beforeend', markup);
    } catch (error) {
      pagesRef.classList.add('visually-hidden');
    }
  }

  pagination.on('afterMove', trendFilms);

  // ------------------------------------------------------------------------------------------------------------------------------------------
  searchRef.addEventListener('submit', handleSubmit);
  
  async function handleSubmit (evt) {
    event.preventDefault();

    searchQuery = event.target.elements.search.value.trim();
    // console.log(searchQuery);

    if (!searchQuery) {
      console.log(searchQuery);
      Notify.failure('Введіть дані для пошуку!');
      return;
    }

    renderRef.innerHTML = '';

    pagination.off('afterMove', trendFilms);
    pagination.off('afterMove', handleMoreClick);

    
    pagination.on('afterMove', handleMoreClick);

    try {
      const { results, total_results } = await getMovieSearch(
        searchQuery,
        page
      );

      console.log(results);
      console.log(total_results);

      if (total_results === 0 || results.length === 0) {
        Notify.failure(
          `По запиту ${searchQuery} ми знайшли ${total_results} картинок`
        );
        pagesRef.classList.add('visually-hidden');
        renderRef.innerHTML = '';
        return;
      }

      pagination.reset(total_results);

      const markup = createMarkupGallery(results);

      renderRef.innerHTML = markup;
      pagesRef.classList.remove('visually-hidden');
    } catch (error) {
      pagesRef.classList.add('visually-hidden');
      renderRef.innerHTML = '';
    } finally {
      console.log('end');
    }
  };

async function handleMoreClick(event) {
      const currentPage = event.page;

      try {
        const { results } = await getMovieSearch(searchQuery, currentPage);

        const markup = createMarkupGallery(results);

        renderRef.innerHTML = markup;
      } catch (error) {
        renderRef.innerHTML = '';
      }
    }

  // ---------------------------------------------------------------------------------------------

  

  // ---------------------------------------------------------------------------------------------

  // async function handleMoreClick(event) {
  //   const currentPage = event.page;
  //   console.log(event.target.elements.search.value);

  //   try {
  //     const { results } = await getMovieSearch(currentPage);

  //     const markup = createMarkupGallery(results);

  //     renderRef.innerHTML = markup;
  //   } catch (error) {
  //     renderRef.innerHTML = '';
  //   }
  // }
}
