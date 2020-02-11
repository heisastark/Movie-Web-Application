const API_KEY = "d19c14d0cad9166f4bee9c0d2f3d20e6";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=d19c14d0cad9166f4bee9c0d2f3d20e6";

const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const movieSearchable = document.querySelector("#movie-searchable");

function movieSection(movies) {
  return movies.map(movie => {
    return `
    <img src=${movie.poster_path} data-movie-id=${movie.id}/>`;
  });
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
  <section class="section">
  ${movieSection(movies)} 
  </section>
  <div class="content">
    <p id="content-close">X</p>
  </div>
  `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

buttonElement.onclick = function(event) {
  event.preventDefault();
  const value = inputElement.value;

  const newUrl = url + "&query=" + value;

  fetch(newUrl)
    .then(res => res.json())
    .then(data => {
      const movies = data.results;
      const movieBlock = createMovieContainer(movies);
      movieSearchable.appendChild(movieBlock);
      console.log("Data", data);
    })
    .catch(error => {
      console.log("Error", error);
    });

  console.log(value);
};
