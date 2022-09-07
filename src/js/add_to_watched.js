const addToWatchedBtn = document.querySelector('.modal__btn-watched');
const addToQueue = document.querySelector('.modal__btn-queue');

 let watchedArray = [];
let queueArray = [];

export function onBtnWatchedClick(id) {
     console.log('1', watchedArray);
  addToWatchedBtn.addEventListener('click', () => {
    watchedArray.push(id);
    console.log('2', watchedArray);
    localStorage.setItem('Watched', JSON.stringify(watchedArray));
  });
}

export function onBtnQueueClick(id) {
   addToQueue.addEventListener('click', () => {
    queueArray.push(id);
    console.log('2', queueArray);
    localStorage.setItem('Queue', JSON.stringify(queueArray));
  })
    // если этот айди есть в watchedArray - удалить его?
}


