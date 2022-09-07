import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
let pageNamber = 1;

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: 'f52fb5605503f66e762d80f647488744',
};

export async function getTrendingMedia(pageNamber) {
  const { data } = await axios.get(`trending/all/week`, {
    params: {
      page: pageNamber,
    },
  });
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
