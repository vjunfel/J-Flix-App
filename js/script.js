const global = {
	currentPage: window.location.pathname,
};

// Highlight active link
function hightlightActiveLink() {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}

// Displaying 20 popoular movies from TMDB_API endpoint
async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular');

	results.forEach((movie) => {
		const divMovie = document.createElement('div');
		divMovie.classList.add('card');
		divMovie.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${
					movie.poster_path
						? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
						: `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
				}

            </a>
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
        </div>`;

		document.querySelector('#popular-movies').appendChild(divMovie);
	});
}

// Displaying 20 popoular TV-shows from TMDB_API endpoint
async function displayPopularShows() {
	const { results } = await fetchAPIData('tv/popular');

	results.forEach((show) => {
		const divShow = document.createElement('div');
		divShow.classList.add('card');
		divShow.innerHTML = ` 
            <a href="show-details.html?id=${show.id}">
            ${
					show.poster_path
						? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
						: `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${show.name}"
                />`
				}

            </a>
            <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
                <small class="text-muted">Air Date: ${
							show.first_air_date
						}</small>
            </p>
        </div>`;

		document.querySelector('#popular-shows').appendChild(divShow);
	});
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
	// Register your key at https://www.themoviedb.org/settings/api and enter here
	// Only use this for development or very projects. You should store your key and make request from a server.
	const API_KEY = '8e67bb99873b039127de01ef403220f4';
	const API_URL = 'https://api.themoviedb.org/3/';

	showSpinner();

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);

	const data = await response.json();
	hideSpinner();
	return data;
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

// Initialize App
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			break;
		case '/shows.html':
			displayPopularShows();
			break;
		case '/movie-details.html':
			console.log('Movie Details');
			break;
		case '/tv-details.html':
			console.log('TV Details');
			break;
		case '/search.hmtl':
			console.log('Search');
			break;
	}

	hightlightActiveLink();
}

window.addEventListener('DOMContentLoaded', init);
