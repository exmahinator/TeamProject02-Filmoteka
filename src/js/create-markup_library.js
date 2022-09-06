export function createMarkupLibrary({ poster, name, description, rating, id }) {
  return /*html*/ `<li class="gallery__item" data-id="${id}">
        <img
          class="movie__poster"
          src="${poster}"
          alt="movie poster"
        />
        <h2 class="movie__name">${name}</h2>
        <p class="movie__description">
          ${description}
          <span class="movie__rating visually-hidden">${rating}</span>
        </p>
      </li>`;
}
