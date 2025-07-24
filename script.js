const API_KEY = '20a299fd'; // Replace with your actual OMDb key

const form = document.getElementById('searchForm');
const queryInput = document.getElementById('query');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = queryInput.value.trim();
    if (!query) return;
    searchMovie(query);
});

function searchMovie(title) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;
    resultsDiv.innerHTML = 'Loading...';

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (data.Response === 'False') {
                resultsDiv.textContent = data.Error;
                return;
            }
            displayMovie(data);
        })
        .catch(err => {
            resultsDiv.textContent = `Error: ${err.message}`;
        });
}

function displayMovie(movie) {
    resultsDiv.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'movie';
    const poster = movie.Poster !== 'N/A' ? `<img src="${movie.Poster}" alt="Poster" />` : '';
    div.innerHTML = `
    ${poster}
    <h3>${movie.Title} (${movie.Year})</h3>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p>${movie.Plot}</p>
    <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
  `;
    resultsDiv.appendChild(div);
}