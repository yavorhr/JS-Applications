let moviesSection = document.querySelector('.movies');

function showPage() {
    moviesSection.classList.remove('hidden');
    fetchMovies();
}

function hidePage() {
    moviesSection.classList.add('hidden');
}

function fetchMovies() {
    fetch(`http://localhost:3030/data/movies`)
        .then(response => response.json())
        .then(renderMovies)
}

function renderMovies(movies) {
    let movieTemplate = moviesSection.querySelector('#movie-card-template');
    let movieListElement = document.querySelector('.movie-list');
    movieListElement.innerHTML = '';

    for (const movie of movies) {

        let currentMovieElement = movieTemplate.cloneNode(true);
        currentMovieElement.classList.remove('hidden');
        currentMovieElement.removeAttribute('id');

        currentMovieElement.querySelector('.card-title').textContent = movie.title;
        currentMovieElement.querySelector('.card-text').textContent = movie.description;

        movieListElement.appendChild(currentMovieElement);

        console.log(movieListElement);
    }

    moviesSection.appendChild(movieListElement);
}

export default {
    showPage,
    hidePage
}

