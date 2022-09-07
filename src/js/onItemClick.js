const galleryList = document.querySelector('.gallery__list');
const modalBackdrop = document.querySelector('[data-modal]');
const modalBtnClose = document.querySelector('[data-modal-close]');

galleryList.addEventListener('click', onItemClick);

export function onItemClick(evt) {
  if (evt.target.tagName !== 'IMG') {

    return;
  }
  modalBackdrop.classList.toggle('is-hidden');

    const movieId = evt.target.dataset.id
    localStorage.setItem('id',movieId)

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onBackdropClick);
    modalBtnClose.addEventListener('click', onClickBtnCloseModal);
  // if (evt.target.closest('.gallery__item').tagName !== 'LI') {
  //   return;
  // }
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
