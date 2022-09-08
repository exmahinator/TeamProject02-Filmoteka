import { createMarkupModalForFilms } from './modal_create-markup';
// import { onBtnWatchedClick, onBtnQueueClick } from './add_to_watched';
import { getFilmById } from './axiosRequests';
import { isModalOpen } from './add_to_watched';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const galleryList = document.querySelector('.gallery__list');
const modalBackdrop = document.querySelector('[data-modal]');
const modalBtnClose = document.querySelector('[data-modal-close]');

// console.log(!localStorage.getItem("Watched"))

let arrayWatched;
let arrayQueue;

if (!localStorage.getItem('Watched')) {
  arrayWatched = [];
} else {
  const savedSettings = localStorage.getItem('Watched');

  const parsedSettings = JSON.parse(savedSettings);

  arrayWatched = [...parsedSettings];
  // console.log('arrayWatched', arrayWatched);
}

if (!localStorage.getItem('Queue')) {
  arrayQueue = [];
} else {
  const savedSettingsQ = localStorage.getItem('Queue');

  const parsedSettingsQ = JSON.parse(savedSettingsQ);

  arrayQueue = [...parsedSettingsQ];
  // console.log('queueArray', arrayQueue);
}

galleryList.addEventListener('click', onItemClick);

export function onItemClick(evt) {
  if (evt.target.tagName !== 'IMG') {
    return;
  }
  modalBackdrop.classList.toggle('is-hidden');

  const movieId = evt.target.dataset.id;

  getFilmById(movieId).then(
    data => {
      createMarkupModalForFilms(data);

      // КНОПКИ---------------------------
      const addToWatchedBtn = document.querySelector('.modal__btn-watched');
      const addToQueue = document.querySelector('.modal__btn-queue');
      const containerModal = document.querySelector('.modal__poster');

      if (arrayWatched.includes(movieId)) {
        addToWatchedBtn.textContent = 'added to watched';
        addToWatchedBtn.style.backgroundColor = '#f7f7f7';
        addToWatchedBtn.style.color = '#ff6b01';
      }

      if (arrayQueue.includes(movieId)) {
        addToQueue.textContent = 'added to queue...';
        addToQueue.style.backgroundColor = '#f7f7f7';
        addToQueue.style.color = '#ff6b01';
      }

      addToWatchedBtn.addEventListener('click', addLocalStorage);
      addToQueue.addEventListener('click', addLocalStorageQ);

      function addLocalStorage() {
        const idForWatched = addToWatchedBtn.dataset.lsid;

        console.log(arrayWatched);
        if (arrayWatched.includes(idForWatched)) {
          // для удаления id из массива!
          // const positionRemove = arrayWatched.findIndex(
          //   id => id === idForWatched
          // );

          //   console.log(positionRemove);
          //  arrayWatched = arrayWatched.splise(positionRemove, 1);
          //   console.log(arrayWatched);

          //   addToWatchedBtn.textContent = 'add to watched';
          //   addToWatchedBtn.style.backgroundColor = 'red';
          //   addToWatchedBtn.style.color = 'inherit';

          return Notify.info('This movie is already in the library "WATCHED"!');
        }

        addToWatchedBtn.textContent = 'added';
        addToWatchedBtn.style.backgroundColor = '#f7f7f7';
        addToWatchedBtn.style.color = '#ff6b01';

        arrayWatched.push(idForWatched);

        localStorage.setItem('Watched', JSON.stringify(arrayWatched));
      }

      function addLocalStorageQ() {
        const idForQueue = addToQueue.dataset.lsidq;

        if (arrayQueue.includes(idForQueue)) {
          return Notify.info('This movie is already in the library "QUEUE"!');
        }

        addToQueue.textContent = 'added';
        addToQueue.style.backgroundColor = '#f7f7f7';
        addToQueue.style.color = '#ff6b01';

        // console.log(idForQueue);
        arrayQueue.push(idForQueue);
        localStorage.setItem('Queue', JSON.stringify(arrayQueue));
      }
    }
    // -----------------------------------
  );

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onBackdropClick);
  modalBtnClose.addEventListener('click', onClickBtnCloseModal);
}

function onEscPress(evt) {
  if (evt.code === 'Escape') {
    onModalClose();
  }
}

function onBackdropClick(evt) {
  //   console.log(evt.target);
  if (evt.target.className === 'backdrop') {
    onModalClose();
  }
}

function onClickBtnCloseModal() {
  onModalClose();
}

function onModalClose() {
  modalBackdrop.classList.toggle('is-hidden');
  document.removeEventListener('keydown', onEscPress);
  document.removeEventListener('click', onBackdropClick);
  modalBtnClose.removeEventListener('click', onClickBtnCloseModal);
}
