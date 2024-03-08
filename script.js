//TMDB API URL

const API_KEY = 'api_key=4167b87055ac256fb149485d86ca5b86';
const BASE_URL = 'https://api.themoviedb.org/3';
const upcoming_API_URL = BASE_URL + '/movie/upcoming?' + API_KEY +'&language=en-US&page=1';
const popular_API_URL = BASE_URL + '/movie/popular?' + API_KEY;
const topRated_API_URL = BASE_URL + '/movie/top_rated?' + API_KEY;
const lgbt_API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&language=en-US&sort_by=popularity.desc&page=1&with_keywords=158718';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genre_URL = BASE_URL + '/genre/movie/list?' + API_KEY;

const upcoming = document.getElementById('upcoming-slider');
const popular = document.getElementById('popular');
const topRated = document.getElementById('top-rated');
const lgbt = document.getElementById('lgbt');

let genreMap = {};
let upcomingData = {};


// Fonction pour récupérer les noms de genres correspondants à leurs ID

async function getGenreNames() {
  try {
    const response = await fetch(genre_URL);
    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }
    const data = await response.json();
    data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des genres :', error);
  }
}

// Fonction pour récupérer les films et les afficher dans les cartes

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

// Home Page : Image Slider 

var counter = 1;
setInterval(function(){
    document.getElementById('radio'+ counter).checked = true;
    counter++;
    if(counter > 3){
        counter = 1;
    }
}, 5000);

let currentIndex = 0;
setInterval(() => {
  currentIndex = (currentIndex + 1) % upcomingData.length;
  displayUpcomingMovies(upcoming, [upcomingData[currentIndex]]);
}, 5000); 

// Conversion date numérique en string

function dateToString () {
  dt = new Date( 'release_date' );
  month = dt.toLocaleString('default', { month: 'long' });
  return (month + ' ' +  dt.getDate() + ', ' + dt.getFullYear())
  }

// Home Page : Upcoming Movies

async function displayUpcomingMovies(home_container, upcomingData) {
  // home_container.innerHTML = '';
  // home_container.removeChild('upcoming-card')
  // supprime le container et donc le slide automatique (dont radio button)

  // on cherche toutes les cartes  et on les supprime chacune
  const boxes = home_container.querySelectorAll('.upcoming-card');

    boxes.forEach(upcomingCard => {
      upcomingCard.remove();
    });

  // on remet un truc dans la dive et on réappelle les donénes de l'API mais différement
  // const SliderDiv = document.createElement('div');
  // SliderDiv.classList.add('upcoming-slider-wrapper');

  upcomingData.forEach(movie => {
    const {title, overview, backdrop_path, vote_average, release_date, genre_ids} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('upcoming-card');
    movieEl.innerHTML = `
      <img src="${IMG_URL + backdrop_path}" alt="" class="home-img">
      <div class="content">
          <h1 id="title">${title}</h1>
          <p>${overview}</p>
          <div class="details">
              <h5 id="gen">
              ${genre_ids.map(id => genreMap[id]).join(', ')}
              </h5>
              <h4>${console.log(dateToString(release_date))}</h4>
              <h3 id="rate"><img src="img/tmdb_logo.svg" alt="" class="tmdb-img"><i class='bx bxs-star'></i> ${vote_average}</h3>
          </div>
            <a href="https://youtu.be/PeMlORxufuc" class="watch-btn">
              <i class='bx bx-right-arrow' ></i>
              <span>Watch the trailer</span>
            </a>
        </div>
    `;
    home_container.appendChild(movieEl);
  // on remet les cards dans les home container et donc au même niveau que les boutons 

  });

  // home_container.appendChild(SliderDiv);
}

getGenreNames();

// attention au "data" car on en a plus
async function getUpcomingMovies(url) {
  try {
    upcomingData = await fetchMovies(url);
    console.log(data);
    await displayUpcomingMovies(upcoming, upcomingData.slice(0, 3)); // méthode slice pour récupérer seulement 3 films
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films populaires :', error);
  }
}

getUpcomingMovies(upcoming_API_URL);

// Sections : Popular, Top Rated, Popular LGBT

async function displaySectionsMovies(container, data) {
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
    await displaySectionsMovies(popular, data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films populaires :', error);
  }
}

async function getTopRatedMovies(url) {
  try {
    const data = await fetchMovies(url);
    console.log(data);
    await displaySectionsMovies(topRated, data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films les mieux notés :', error);
  }
}

async function getLGBTMovies(url) {
  try {
    const data = await fetchMovies(url);
    console.log(data);
    await displaySectionsMovies(lgbt, data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des films LGBT :', error);
  }
}

// Appels aux fonctions pour récupérer et afficher les films

getPopularMovies(popular_API_URL);
getTopRatedMovies(topRated_API_URL);
getLGBTMovies(lgbt_API_URL);

///////////////////////

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

//////////////////////////////////

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   const searchTerm = search.value;

//   if(searchTerm) {
//     getMovies(searchURL+'&query='+searchTerm)
//   }else{
//     getMovies(API_URL);
//   }
// })

///////////////////////////////////////////