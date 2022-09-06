import { createMarkupGallery } from './create-markup_gallery';
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
const refs = {
  homePageGalleryList: document.querySelector('.gallery__list'),
};

async function getTrendingMedia(pageNamber) {
  const { data } = await axios.get(``, {
    params: {
      page: pageNamber,
    },
  });
  //   console.log(data);
  return data;
}
getTrendingMedia().then(({ results, total_pages, page, total_results }) => {
  const markup = createMarkupGallery(results);
  refs.homePageGalleryList.innerHTML = markup;
});

async function getGenre() {
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

getGenre().then(({ genres }) => {
  genres.map(({ id, name }) => {
    console.log(name);
    console.log(id);
  });
});
