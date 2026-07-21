/* Aquí va la lógica para mostrar los resultados de búsqueda */
fetch('assets/data/jobs.json')
    .then(response => response.json())
    .then(data => {})

/* -------------------- OG -------------------- */


import { readFilters, filterPaginateJobs } from './filters.js';
import { printResults, handlePageChange } from './print.js';

const searchForm = document.getElementById('search-form');
const jobsList = document.getElementById('search-results');
const pageControls = document.getElementById('pagination');

export let jobsData = [];

fetch('assets/data.json')
    .then((response) => {
        return response.json();
    })
    .then(jobs => {
        jobsData = jobs;
        const pagedJobs = filterPaginateJobs(jobs, null, null, null, null, null, 3);
        printResults(jobsList, pageControls, pagedJobs, 1);
    })
    .catch(error => console.error('Error al cargar los datos:', error));

searchForm?.addEventListener('change', () => {
    const filters = readFilters();
    const pagedJobs = filterPaginateJobs(jobsData, filters.searchTerm, filters.technology, filters.location, filters.contract, filters.experience, 3);
    printResults(jobsList, pageControls, pagedJobs, 1);

});

searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const filters = readFilters();
    const pagedJobs = filterPaginateJobs(jobsData, filters.searchTerm, filters.technology, filters.location, filters.contract, filters.experience, 3);
    printResults(jobsList, pageControls, pagedJobs, 1);
});

jobsList?.addEventListener('click', function (event) {
    if (event.target && event.target.tagName === 'BUTTON') {
        event.target.textContent = '¡Aplicado!';
        event.target.classList.toggle('bg-green');
        event.target.disabled = true;
        const jobElement = event.target.closest('li.search-result__item');
        let jobIndex = jobsData.findIndex(job => job.id == jobElement.dataset.jobId);
        jobElement.dataset.jobApplied = true;
        jobsData[jobIndex].applied = true;
    }
});

pageControls?.addEventListener('click', function (event) {
    if (event.target && event.target.tagName === 'BUTTON' && event.target.classList.contains('pagination__page')) {
        const pageNumber = parseInt(event.target.dataset.toPage);
        handlePageChange(jobsData,jobsList, pageControls, pageNumber);
    }
});
