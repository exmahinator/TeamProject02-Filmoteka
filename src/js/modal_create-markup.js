export function createMarkupModalForFilms({id, poster, title, originalTitle, vrote, vrotes, popularity, genre, description}) {
    return `<img src="${poster}" alt="фото" class="modal__poster" />
      <div>
        <h2 class="modal__title">${title}</h2>
        <table class="modal__info">
          <tr>
            <th>Vote/Votes</th>
            <td>
              <span class="modal__info--accent">${vrote}</span> /
              <span class="modal__info--noaccent">${vrotes}</span>
            </td>
          </tr>
          <tr>
            <th>Popularity</th>
            <td>${popularity}</td>
          </tr>
          <tr>
            <th>Original Title</th>
            <td>${originalTitle}</td>
          </tr>
          <tr>
            <th>Genre</th>
            <td>${genre}</td>
          </tr>
        </table>
        <h3 class="modal__about--title">About</h3>
        <p class="modal__about">
          ${description}
        </p>`
}