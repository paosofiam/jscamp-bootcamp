/* Aquí va la lógica para filtrar los resultados de búsqueda */
export function readFilters() {
    let filters = {};
    const searchInput = document.getElementById('search-form__bar__input');
    const technologyFilter = document.getElementById('technology-filter');
    const locationFilter = document.getElementById('location-filter');
    const contractTypeFilter = document.getElementById('contract-type-filter');
    const experienceLevelFilter = document.getElementById('experience-level-filter');
    filters.searchTerm = searchInput.value.toLowerCase();
    filters.technology = technologyFilter.value;
    filters.location = locationFilter.value;
    filters.contract = contractTypeFilter.value;
    filters.experience = experienceLevelFilter.value;

    return filters;
}

export function filterPaginateJobs(results, search, technology, location, contract, experience, jobsPerPage) {
    let filteredJobs = [];
    results.forEach((job) => {
        if ((!search || job.title.toLowerCase().includes(search.toLowerCase())) && (!technology || job.technologies.includes(technology)) && (!location || job.location.toLowerCase().includes(location.toLowerCase())) && (!contract || job.contract === contract) && (!experience || job.experience === experience)) {
            filteredJobs.push(job);
        }
    });
    let pagedJobs = [];
    for (let i = 0; i < filteredJobs.length; i += jobsPerPage) {
        pagedJobs.push(filteredJobs.slice(i, i + jobsPerPage));
    }
    return pagedJobs;
}

/* -------------------- or... -------------------- */

const searchForm = document.getElementById('search-form');

const searchInput = document.getElementById('search-form__bar__input');
const technologyFilter = document.getElementById('technology-filter');
const locationFilter = document.getElementById('location-filter');
const contractTypeFilter = document.getElementById('contract-type-filter');
const experienceLevelFilter = document.getElementById('experience-level-filter');


searchForm?.addEventListener('change', () => {
    const jobs = document.querySelectorAll('#search-results li.search-result__item');
    const searchTerm = searchInput.value.toLowerCase();
    const technology = technologyFilter.value;
    const location = locationFilter.value;
    const contract = contractTypeFilter.value;
    const experience = experienceLevelFilter.value;

    jobs.forEach((job) => {
        if (job.classList.contains('hidden')) {
            job.classList.remove('hidden');
        }
    });
    
    jobs.forEach((job) => {
        if ((searchTerm && !job.dataset.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) || (technology && !job.dataset.jobTechnologies.includes(technology)) || (location && !job.dataset.jobLocation.toLowerCase().includes(location.toLowerCase())) || (contract && job.dataset.jobContract != contract) || (experience && job.dataset.jobExperience != experience)) {
            job.classList.add('hidden');
        }
    });
});

searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const jobs = document.querySelectorAll('#search-results li.search-result__item');
    const searchTerm = searchInput.value.toLowerCase();
    const technology = technologyFilter.value;
    const location = locationFilter.value;
    const contract = contractTypeFilter.value;
    const experience = experienceLevelFilter.value;

    jobs.forEach((job) => {
        if (job.classList.contains('hidden')) {
            job.classList.remove('hidden');
        }
    });
    
    jobs.forEach((job) => {
        if ((searchTerm && !job.dataset.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) || (technology && !job.dataset.jobTechnologies.includes(technology)) || (location && !job.dataset.jobLocation.toLowerCase().includes(location.toLowerCase())) || (contract && job.dataset.jobContract != contract) || (experience && job.dataset.jobExperience != experience)) {
            job.classList.add('hidden');
        }
    });
});