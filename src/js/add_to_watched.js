const addToWatchedBtn = document.querySelector('.modal__btn-watched');
const addToQueueBtn = document.querySelector('.modal__btn-queue');

let watchedArray = [];
let queueArray = [];

addToWatchedBtn.addEventListener('click', () => {
  const localStorageId = localStorage.getItem('id');
  watchedArray.push(localStorageId);
  console.log(watchedArray);
  localStorage.setItem('Watched', JSON.stringify(watchedArray));
});

addToQueueBtn.addEventListener('click', () => {
  const localStorageId = localStorage.getItem('id');
  queueArray.push(localStorageId);
  console.log(queueArray);
  localStorage.setItem('Queue', JSON.stringify(queueArray));
});
