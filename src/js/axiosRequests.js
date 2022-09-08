import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { spinnerOn, spinnerOff } from './loader';
import axios from 'axios';
export let pageNamber = 1;
const modalContents = document.querySelector('.modal__contents');

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: 'f52fb5605503f66e762d80f647488744',
};

export async function getTrendingMedia(pageNamber) {
  spinnerOn();
  const { data } = await axios.get(`trending/all/week`, {
    params: {
      page: pageNamber,
    },
  });
  spinnerOff();
  return data;
}

export async function getMovieSearch(query, pageNamber) {
  spinnerOn();
  const { data } = await axios.get('search/movie', {
    params: {
      page: pageNamber,
      include_adult: false,
      query,
    },
  });
  spinnerOff();
  return data;
}

export async function getGenre() {
  const { data } = await axios.get(`genre/movie/list`, {
    params: {
      page: pageNamber,
    },
  });
  return data;
}
export async function getFilmById(external_id) {
  spinnerOn();
  try {
    const { data } = await axios.get(`/movie/${external_id}`);
    // console.log(data);
    spinnerOff();
    return data;
  } catch (error) {
    console.log(error.massege);
    // modalContents.innerHTML =
    //   '<img src="http://lamcdn.net/lookatme.ru/post_image-image/sIaRmaFSMfrw8QJIBAa8mA-article.png" alt="404 Not found"/>';
  }
}
