import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {getMovieSearch} from './service-themoviedb-api'
import { createMarkupGallery } from './create-markup_gallery';
import { pagination } from './pagination.js';


document.querySelector('[js-data-search]').addEventListener('submit', (e) => {
  pagination.reset();
  e.preventDefault()
  localStorage.setItem('search',e.currentTarget.elements.search.value)
if (e.currentTarget.elements.search.value === '') {
    return Notify.info('Search field needs to be filled');
    localStorage.removeItem("search")
  }
getMovieSearch(e.currentTarget.elements.search.value,1)
.then(({results})=>{
createMarkupGallery(results)})
  .catch(
    Error=>Notify.info("Oops, we didn't find such a movie"))
e.currentTarget.elements.search.value = ''
 })

