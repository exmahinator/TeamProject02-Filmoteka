function fetchCountries(query){
    return fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=f52fb5605503f66e762d80f647488744&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(r=>{
        if (!r.ok) { 
         throw new Error(r.status)
        }
        return r.json()})
        .then(data => {
            const {results} = data
            console.log({results})
            markupSearchList({results})
           })
           .catch(error => {
            
           })
}

document.querySelector('[js-data-search]').addEventListener('submit',(e)=>{
        e.preventDefault()
        
        fetchCountries(e.currentTarget.elements.search.value)
       })

       function markupSearchList({results}){

        const listMarkup = results.map(({title,poster_path,popularity,release_date,id})=>{
            const date = new Date(release_date)
            const release = date.getFullYear()
            document.querySelector('.gallery__list').innerHTML = ''
            return `<li class="gallery__item" >
            <img
              class="movie__poster"
              src="https://image.tmdb.org/t/p/w500/${poster_path}"
              alt="movie poster"
              data-id='${id}'
            />
            <h2 class="movie__name">${title}</h2>
            <p class="movie__description">
              Drama, Action | ${release}
              <span class="movie__rating visually-hidden">${popularity}</span>
            </p>
          </li>`
        }).join("")

document.querySelector('.gallery__list').insertAdjacentHTML('beforeend',listMarkup)
}
    
document.querySelector('.gallery__list').addEventListener('click',getIdForModal)

function getIdForModal(event){
   if (event.target.nodeName !== 'IMG') {
    return
   }
    const movieId = event.target.dataset.id
    localStorage.setItem('id',movieId)
}