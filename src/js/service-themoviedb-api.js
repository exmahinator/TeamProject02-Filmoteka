import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
let pageNamber = 1;

axios.defaults.baseURL = 'https://api.themoviedb.org/3/trending/all/week';
axios.defaults.params = {
  api_key: 'f52fb5605503f66e762d80f647488744',
  //   media_type: 'all',
  //   time_window: 'week',
  //   total_pages: 40,
};

export async function getTrendingMedia(pageNamber) {
  const { data } = await axios.get(``, {
    params: {
      page: pageNamber,
    },
  });

  return data;
}

export async function getGenre() {
  axios.defaults.baseURL = 'https://api.themoviedb.org/3/genre/movie/list';
  axios.defaults.params = {
    api_key: 'f52fb5605503f66e762d80f647488744',
  };

  const { data } = await axios.get(``, {
    params: {
      page: pageNamber,
    },
  });
  //   console.log(data);
  return data;
}
