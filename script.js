//TMDB

const API_KEY = 'api_key=4167b87055ac256fb149485d86ca5b86';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;


// const TOPAPI_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US.desc&api_key=4167b87055ac256fb149485d86ca5b86'+API_KEY;

// const API_URL = 'https://api.themoviedb.org/3/search/keyword?query=lgbt&page=1&api_key=4167b87055ac256fb149485d86ca5b86';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const popular = document.getElementById('popular');


// const main = document.getElementById('main');
// const form = document.getElementById('form');
// const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {

  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results);
    showMovies(data.results);
  })
}

function showMovies(data) {
  popular.innerHTML = '';

  const cardsDiv = document.createElement('div'); // Création de la div "cards" une seule fois
  cardsDiv.classList.add('cards'); // Ajout de la classe "cards" à la div créée

  data.forEach(movie => {
    const {title, poster_path, vote_average, release_date} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('card');
    movieEl.innerHTML = `
      <img src="${IMG_URL+poster_path}" alt="${title}" class="poster">
      <div class="cont">
        <h4>${title}</h4>
        <div class="sub">
          <p>${release_date}</p>
          <h3><span>TMDB</span><i class='bx bxs-star'></i> ${vote_average}</h3>
        </div>
      </div>
    `;
    cardsDiv.appendChild(movieEl); // Ajout de la card au div "cards"
  });

  popular.appendChild(cardsDiv); // Ajout de la div "cards" contenant toutes les cards à l'élément avec l'id "popular"
}





// function showMovies(data) {
//   popular.innerHTML = '';

//   data.forEach(movie => {
//     const {title, poster_path, vote_average, release_date} = movie;
//     const movieEl = document.createElement('div');
//     movieEl.classList.add('card');
//     movieEl.innerHTML = `
//     <div class="cards">
//         <div class="card">
//           <img src="${IMG_URL+poster_path}" alt="${title}" class="poster">
//             <div class="cont">
//               <h4>${title}</h4>
//               <div class="sub">
//                 <p>${release_date}</p>
//                 <h3><span>TMDB</span><i class='bx bxs-star'></i> ${vote_average}</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//     `;
//     popular.appendChild(movieEl);
//   })
// }




// function showMovies(data) {
//   main.innerHTML = '';

//   data.forEach(movie => {
//     const {title, poster_path, vote_average, overview} = movie;
//     const movieEl = document.createElement('div');
//     movieEl.classList.add('movie');
//     movieEl.innerHTML = `
//       <img src="${IMG_URL+poster_path}" alt="${title}"> 
            
//             <div class="movie-info">
//                 <h3>${title}</h3>
//                 <span>${vote_average}</span>
//             </div>
            
//             <div class="overview">
                
//                 <h3>Overview</h3>
//                 ${overview}
//             </div>
//     `;

//     main.appendChild(movieEl);
//   })
// }

















form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const searchTerm = search.value;

  if(searchTerm) {
    getMovies(searchURL+'&query='+searchTerm)
  }else{
    getMovies(API_URL);
  }
})

