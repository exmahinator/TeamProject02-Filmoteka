const modalContents = document.querySelector('.modal__contents');
export function createMarkupModalForFilms(results) {
  // console.log('results', results);

  const {
    id,
    poster_path,
    name,
    title,
    genre_ids,
    vote_count,
    vote_average,
    popularity,
    original_title,
    overview,
  } = results;

  let imageModal = 'https://image.tmdb.org/t/p/w500/' + poster_path;

  const markup = `<img src="${imageModal}" alt="фото" class="modal__poster" data-id="${id}"/>
      <div>
        <h2 class="modal__title">${name || title}</h2>
        <table class="modal__info">
          <tr>
            <th>Vote/Votes</th>
            <td>
              <span class="modal__info--accent">${vote_average}</span> /
              <span class="modal__info--noaccent">${vote_count}</span>
            </td>
          </tr>
          <tr>
            <th>Popularity</th>
            <td>${popularity}</td>
          </tr>
          <tr>
            <th>Original Title</th>
            <td>${original_title}</td>
          </tr>
          <tr>
            <th>Genre</th>
            <td>${genre_ids}</td>
          </tr>
        </table>
        <h3 class="modal__about--title">About</h3>
        <p class="modal__about">
          ${overview}
        </p>
      </div>`;
  modalContents.innerHTML = '';
  modalContents.insertAdjacentHTML('afterbegin', markup);
}
