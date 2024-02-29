//TMDB API URL

const API_KEY = 'api_key=4167b87055ac256fb149485d86ca5b86';
const BASE_URL = 'https://api.themoviedb.org/3';
const upcoming_API_URL = BASE_URL + '/movie/upcoming?' + API_KEY;
const popular_API_URL = BASE_URL + '/movie/popular?' + API_KEY;
const topRated_API_URL = BASE_URL + '/movie/top_rated?' + API_KEY;
const lgbt_API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&language=en-US&sort_by=popularity.desc&page=1&with_keywords=158718';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const upcoming = document.getElementById('upcoming');
const popular = document.getElementById('popular');
const topRated = document.getElementById('top-rated');
const lgbt = document.getElementById('lgbt');

async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films :', error);
    throw error;
  }
}

async function displayMovies(container, data) {
  container.innerHTML = '';

  const cardsDiv = document.createElement('div');
  cardsDiv.classList.add('cards');

  data.forEach(movie => {
    const {title, poster_path, vote_average, release_date} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('card');
    movieEl.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}" class="poster">
      <div class="cont">
        <h4>${title}</h4>
        <div class="sub">
          <p>${release_date}</p>
          <h3><span>TMDB</span><i class='bx bxs-star'></i> ${vote_average}</h3>
        </div>
      </div>
    `;
    cardsDiv.appendChild(movieEl);
  });

  container.appendChild(cardsDiv);
}

async function getPopularMovies(url) {
  try {
    const data = await fetchMovies(url);
    console.log(data);
    await displayMovies(popular, data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films populaires :', error);
  }
}

async function getTopRatedMovies(url) {
  try {
    const data = await fetchMovies(url);
    console.log(data);
    await displayMovies(topRated, data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films les mieux notés :', error);
  }
}

async function getLGBTMovies(url) {
  try {
    const data = await fetchMovies(url);
    console.log(data);
    await displayMovies(lgbt, data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films LGBT :', error);
  }
}

// Appels aux fonctions pour récupérer et afficher les films
getPopularMovies(popular_API_URL);
getTopRatedMovies(topRated_API_URL);
getLGBTMovies(lgbt_API_URL);

// Search Data Load

// let search = document.getElementsByClassName('search')[0];
// let search_input = document.getElementById('search_input')[0];


// document.getElementById('title').innerText = data[0].title;
// document.getElementById('genre').innerText = data[0].genre;
// document.getElementById('release-date').innerText = data[0].release_date;
// document.getElementById('vote-average').innerHTML = '<span>TMDB</span><i class='bx bxs-star'></i> ${data[0].vote_average}';

// data.forEach(element => {
//   let {title, poster_path, vote_average, release_date} = element;
//   let card = document.createElement('a');
//   card.classList.add('card');
//   card.innerHTML = `
//     <img src="${IMG_URL+poster_path}" alt="">
//       <div class="cont">
//         <h3>${title}</h3>
//         <p>${genre},${release_date},<span>TMDB</span><i class='bx bxs-star'></i> ${vote_average}</h3>
//       </div>    
//     `
//   search.appendChild(card);
// });

// Search Data Load

/////////////////////////

data.forEach(movie => {
  const {title, poster_path, vote_average, release_date} = movie;
  const movieEl = document.createElement('a');
  movieEl.classList.add('card');
  movieEl.innerHTML = `
    <img src="${IMG_URL+poster_path}" alt="${title}">
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

//////////////////////////////////////////


// form.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   const searchTerm = search.value;

//   if(searchTerm) {
//     getMovies(searchURL+'&query='+searchTerm)
//   }else{
//     getMovies(API_URL);
//   }
// })

