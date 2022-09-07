console.log(document.title);

if (document.title !== 'Filmoteka') {
  const watched = document.querySelector('.lib-watched-btn');
  const queue = document.querySelector('.lib-queue-btn');

  watched.addEventListener('click', onBtnWatchedShow);
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
}