
const watched = document.querySelector('.lib-watched-btn');
watched.addEventListener('click', onBtnWatchedShow);
const queue = document.querySelector('.lib-queue-btn');
queue.addEventListener('click', onBtnShowQueue);

function onBtnWatchedShow() {
  onWatchedBtnClick();

  if (
    root.classList.contains('root-height') &&
    rootQueue.classList.contains('root-show')
  ) {
  }
}

function onBtnShowQueue() {
  onQueueBtnClick();

  if (
    root.classList.contains('root-show') &&
    rootQueue.classList.contains('root-height')
  ) {
  }
}

function onWatchedBtnClick() {
  queue.classList.remove('active');
  watched.classList.add('active');
}

function onQueueBtnClick() {
  watched.classList.remove('active');
  queue.classList.add('active');
}

 
