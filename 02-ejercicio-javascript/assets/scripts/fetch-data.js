/* Aquí va la lógica para mostrar los resultados de búsqueda */
import { filterPaginateJobs, readFilters } from './filters.js';
import { handlePageChange, printResults } from './print.js';

const searchForm = document.getElementById('search-form');
const jobsList = document.getElementById('search-results');
const pageControls = document.getElementById('pagination');

let jobsData = [];

fetch('./data.json')
    .then((response) => {
        return response.json();
    })
    .then(jobs => {
        jobsData = jobs;
        const pagedJobs = filterPaginateJobs(jobsData, null, null, null, null, null, 3);
        printResults(jobsList, pageControls, pagedJobs, 1);
    })
    .catch(error => console.error('Error al cargar los datos:', error));
 
// Si repetimos código en más de un sitio, que además es exactamente igual, podemos pasarlo a una variable y simplificar el código.
function renderJobs() {
    const filters = readFilters();
    const pagedJobs = filterPaginateJobs(jobsData, filters?.searchTerm, filters?.technology, filters?.location, filters?.contract, filters?.experience, 3);
    printResults(jobsList, pageControls, pagedJobs, 1);
}

// Ahora usamos la función
searchForm?.addEventListener('change', renderJobs);
searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    renderJobs();
});

pageControls?.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target && event.target.tagName === 'BUTTON' && event.target.classList.contains('pagination__page')) {
        const pageNumber = parseInt(event.target.dataset.toPage);
        handlePageChange(jobsData,jobsList, pageControls, pageNumber);
    }
});