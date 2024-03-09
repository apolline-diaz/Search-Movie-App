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
let upcomingData = [];

// Outils : Conversion date numérique en string

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-'); // divise la chaîne de caractères en un tableau de sous-chaînes
  const date = new Date(year, month - 1, day); // crée une nouvelle instance de l'objet Date
  const options = { month: 'long', day: 'numeric', year: 'numeric' }; // définit les options de formatage
  return date.toLocaleDateString('en-US', options); // renvoie la chaîne de caractères formatée
}

const releaseDate = "2024-03-08"; // exemple de chaîne de caractères représentant une date au format "AAAA-MM-JJ"
const formattedDate = formatDate(releaseDate); // appelle la fonction formatDate avec la chaîne de caractères en argument

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
              <h4>${formatDate(release_date)}</h4>
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

// Attention au "data" car on en a plus

async function getUpcomingMovies(url) {
  try {
    upcomingData = await fetchMovies(url);
    console.log(data);
    await displayUpcomingMovies(upcoming, upcomingData.slice(2)); // méthode slice pour récupérer seulement 3 films
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
          <p>${formatDate(release_date)}</p>
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

// Création du pop up film

function createPopup(id){
  let popupNode = document.querySelector(id);
  let overlay = popupNode.querySelector(".overlay");
  let closeBtn = popupNode.querySelector(".close-btn");
  function openPopup(){
    popupNode.classList.add("active");
  }
  function closePopup(){
    popupNode.classList.remove("active");
  }
  overlay.addEvenlistener("click", closePopup);
  closeBtn.addEvenlistener("click", closePopup);
  return openPopup;
}

let popup = createPopup("#popup");
document.querySelector("#open-popup").addEventListener("click",popup);