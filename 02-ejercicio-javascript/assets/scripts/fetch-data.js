/* Aquí va la lógica para mostrar los resultados de búsqueda */
/* fetch('assets/data/jobs.json')
    .then(response => response.json())
    .then(data => {}) */

/* -------------------- OG -------------------- */


//import { readFilters, filterPaginateJobs } from './filters.js';
import { printResults, handlePageChange } from './print.js';

const searchForm = document.getElementById('search-form');
const jobsList = document.getElementById('search-results');
const pageControls = document.getElementById('pagination');

//let jobsData = [];

fetch('./data.json')
    .then((response) => {
        return response.json();
    })
    .then(jobs => {
        const jobsData = jobs;
        //console.log('jobsData:', jobsData);
        const pagedJobs = filterPaginateJobs(jobsData, null, null, null, null, null, 3);
        printResults(jobsList, pageControls, pagedJobs, 1);
    })
    .catch(error => console.error('Error al cargar los datos:', error));
 
searchForm?.addEventListener('change', () => {
    const filters = readFilters();
    const pagedJobs = filterPaginateJobs(jobsData, filters.searchTerm, filters.technology, filters.location, filters.contract, filters.experience, 3);
    printResults(jobsList, pageControls, pagedJobs, 1);

});
/*
searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const filters = readFilters();
    const pagedJobs = filterPaginateJobs(jobsData, filters.searchTerm, filters.technology, filters.location, filters.contract, filters.experience, 3);
    printResults(jobsList, pageControls, pagedJobs, 1);
}); */

pageControls?.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target && event.target.tagName === 'BUTTON' && event.target.classList.contains('pagination__page')) {
        const pageNumber = parseInt(event.target.dataset.toPage);
        //handlePageChange(jobsData,jobsList, pageControls, pageNumber);
    }
});