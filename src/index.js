import { pagination } from './js/pagination.js';

// pagination.on('beforeMove', function (eventData) {
//   console.log(eventData.page);
//   // Тут повинна бути функція перемальовування сторінки з інформації з бекенда. Значення сторінки: eventData.page
// });

const teamRefSection = document.querySelector('.team');
const teamRefBackdrop = document.querySelector('.footer__btn');
const teamRefClose = document.querySelector('.team__subitem--central__top');

teamRefBackdrop.addEventListener('click', openTeam);

function openTeam(event) {
  event.preventDefault();
  console.log('clicking the button');

  teamRefSection.classList.toggle('team-hidden');
  teamRefClose.addEventListener('click', closeTeamModal);
}

function closeTeamModal() {
  teamRefSection.classList.toggle('team-hidden');
  teamRefClose.removeEventListener('click', closeTeamModal);
}
