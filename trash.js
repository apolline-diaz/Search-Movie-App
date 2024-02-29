//TMDB API URL

const API_KEY = 'api_key=4167b87055ac256fb149485d86ca5b86';
const BASE_URL = 'https://api.themoviedb.org/3';
const upcoming_API_URL = BASE_URL + '/movie/upcoming?'+API_KEY;
const popular_API_URL = BASE_URL + '/movie/popular?'+API_KEY;
const topRated_API_URL = BASE_URL + '/movie/top_rated?'+API_KEY;
const lgbt_API_URL = BASE_URL + '/discover/movie?'+API_KEY+'&language=en-US&sort_by=popularity.desc&page=1&with_keywords=158718';

// keywor api url : 'https://api.themoviedb.org/3/search/keyword?api_key=4167b87055ac256fb149485d86ca5b86&query=lgbt'
// -> Help  to find the keyword id of 'lgbt' which is : 158718
// Then make an API request get/discover/movie : 
// 'https://api.themoviedb.org/3/discover/movie?api_key=4167b87055ac256fb149485d86ca5b86&language=en-US&sort_by=popularity.desc&page=1&with_keywords=158718'


const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const upcoming = document.getElementById('upcoming');
const popular = document.getElementById('popular');
const topRated = document.getElementById('top-rated');
const lgbt = document.getElementById('lgbt');

// Popular Movies 

getPopularMovies(popular_API_URL);

function getPopularMovies(url) {
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('La requête n\'a pas abouti : ' + res.status);
      }
      return res.json();
    })
    .then(data => {
      console.log(data.results);
      showPopularMovies(data.results);
    }) 
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des films populaires :', error);
      // Vous pouvez également choisir de lancer l'erreur à nouveau pour qu'elle soit capturée à un niveau supérieur
      throw error;
    });
  }

function showPopularMovies(data) {
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

// Top Rated Movies 

getTopRatedMovies(topRated_API_URL);

function getTopRatedMovies(url) {
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('La requête n\'a pas abouti : ' + res.status);
      }
      return res.json();
    })
    .then(data => {
      console.log(data.results);
      showTopRatedMovies(data.results);
    }) 
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des films populaires :', error);
      // Vous pouvez également choisir de lancer l'erreur à nouveau pour qu'elle soit capturée à un niveau supérieur
      throw error;
    });
  }

function showTopRatedMovies(data) {
  topRated.innerHTML = '';

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

  topRated.appendChild(cardsDiv); // Ajout de la div "cards" contenant toutes les cards à l'élément avec l'id "popular"
}

// LGBT Movies 

getLGBTMovies(lgbt_API_URL);

function getLGBTMovies(url) {
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('La requête n\'a pas abouti : ' + res.status);
      }
      return res.json();
    })
    .then(data => {
      console.log(data.results);
      showLGBTMovies(data.results);
    }) 
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des films populaires :', error);
      // Vous pouvez également choisir de lancer l'erreur à nouveau pour qu'elle soit capturée à un niveau supérieur
      throw error;
    });
  }

function showLGBTMovies(data) {
  lgbt.innerHTML = '';

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

  lgbt.appendChild(cardsDiv); // Ajout de la div "cards" contenant toutes les cards à l'élément avec l'id "popular"
}

