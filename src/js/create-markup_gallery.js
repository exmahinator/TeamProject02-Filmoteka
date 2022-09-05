export function createMarkupGallery({ poster, name, description, rating }) {
  return /*html*/ `<li class="gallery__item">
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
