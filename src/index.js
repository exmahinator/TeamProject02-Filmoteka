
import { onItemClick } from './js/onItemClick.js';

import { pagination } from './js/pagination.js';

pagination.on('beforeMove', function (eventData) {
  console.log(eventData.page);
  // Тут повинна бути функція перемальовування сторінки з інформації з бекенда. Значення сторінки: eventData.page
});

import './js/search'
