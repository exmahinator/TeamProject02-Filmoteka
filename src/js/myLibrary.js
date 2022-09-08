// console.log(document.title);
import { createMarkupById } from './create-markup_library';

import { getFilmById } from './axiosRequests';
import { spinnerOn, spinnerOff } from './loader';

const homePageGalleryList = document.querySelector('.gallery__container');
console.log(homePageGalleryList);

let pageNumber = 1;

if (document.title !== 'Filmoteka') {
  if (localStorage.getItem('Watched') === null) {
    console.log(localStorage.getItem('Watched') === null);
    homePageGalleryList.innerHTML = '';
  }
  const watched = document.querySelector('.lib-watched-btn');
  const queue = document.querySelector('.lib-queue-btn');

  watched.addEventListener('click', onBtnWatchedShow);
  queue.addEventListener('click', onBtnShowQueue);

  libOpen('Watched');

  async function libOpen(key) {
    let receivedWatchedArrById = [];
    const watchedArr = localStorage.getItem(key);
    const parcedWatchedArr = JSON.parse(watchedArr) ?? [];

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
}
