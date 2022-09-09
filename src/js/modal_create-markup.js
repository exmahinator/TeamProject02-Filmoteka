const modalTest = document.querySelector('.test');
export function createMarkupModalForFilms(results) {
  // console.log('results', results);

  const {
    id,
    poster_path,
    name,
    title,
    genres,
    vote_count,
    vote_average,
    popularity,
    original_title,
    overview,
  } = results;

  let imageModal = 'https://image.tmdb.org/t/p/w500/' + poster_path;

  const markup = ` <div class="modal__contents" >
  <img src="${imageModal}" alt="фото" class="modal__poster" data-id="${id}  width = "375"/>
      <div>
        <h2 class="modal__title">${name || title}</h2>
        <table class="modal__info">
          <tr>
            <th>Vote/Votes</th>
            <td>
              <span class="modal__info--accent">${vote_average.toFixed(1)}</span> /
              <span class="modal__info--noaccent">${vote_count}</span>
            </td>
          </tr>
          <tr>
            <th>Popularity</th>
            <td>${popularity.toFixed(1)}</td>
          </tr>
          <tr>
            <th>Original Title</th>
            <td>${original_title.toUpperCase()}</td>
          </tr>
          <tr>
            <th>Genre</th>
            <td>${genres.map(({name})=>{return name})}</td>
          </tr>
        </table>
        <h3 class="modal__about--title">About</h3>
        <p class="modal__about">
          ${overview}
        </p>
        <div class="modal__btn">
          <button type="button" class="modal__btn-watched" data-lsId = '${id}' >add to Watched</button>
          <button type="button" class="modal__btn-queue" data-lsIdq = '${id}'  >add to queue</button>
        </div>
      </div>
    </div>
      `;
  
modalTest.innerHTML = ''; 
modalTest.insertAdjacentHTML('afterbegin', markup);
 
}
