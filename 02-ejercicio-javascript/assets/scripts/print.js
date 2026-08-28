import { readFilters, filterPaginateJobs } from './filters.js';

export function printResults(searchResultsContainer, paginationContainer, pagedJobs, pageNumber) {
    searchResultsContainer.innerHTML = '';
    if (!pagedJobs || pagedJobs.length === 0) {
        searchResultsContainer.innerHTML = '<li class="search-result__item"><small>No se encontraron resultados.</small></li>';
    }
    else {
        pagedJobs[pageNumber - 1].forEach(job => {
            const element = document.createElement('li');
            element.className = 'search-result__item';

            element.dataset.jobId = job?.id ?? '';
            element.dataset.jobTitle = job?.titulo ?? '';
            element.dataset.jobCompany = job?.empresa ?? '';
            element.dataset.jobLocation = job?.ubicacion ?? '';
            element.dataset.jobTechnologies = job?.data?.technology ? JSON.stringify(job.data.technology) : '';
            element.dataset.jobSkills = job?.skills ? JSON.stringify(job.skills) : '';
            element.dataset.jobContract = job?.contract ?? '';
            element.dataset.jobExperience = job?.data?.nivel ? JSON.stringify(job.data.nivel) : '';
            element.dataset.jobApplied = job?.applied ?? '';

            element.innerHTML = `<article class="">
                                    <div class="search-result__item__info flex-col align-start width-full">
                                        <a href="empleo.html"><h3>${job?.titulo}</h3></a>
                                        <small>${job?.empresa} | ${job?.ubicacion}</small>
                                        <p>${job?.descripcion}</p>
                                    </div>
                                    ${job?.applied ? '<button class="btn bg-primary bg-green" disabled>¡Aplicado!</button>' : '<button class="btn bg-primary">Aplicar</button>'}
                                </article>`;
            searchResultsContainer.appendChild(element);
        });
    }
    printPagination(paginationContainer, pagedJobs.length, pageNumber);
}

export function printPagination(paginationContainer, totalPages, currentPage) {
    paginationContainer.innerHTML = '';
    if( totalPages > 1 ) {
        paginationContainer.innerHTML = `<li><button type="button" class="btn pagination__page${currentPage - 1 <= 0 ? ' hidden' : ''}" aria-label="Página anterior" aria-controls="search-results" data-to-page="${currentPage <= 1 ? 1 : currentPage - 1}"${currentPage <= 1 ? ' disabled' : ''}>
                                            &lt;
                                        </button></li>
                                        <li><button type="button" class="btn pagination__page${currentPage - 2 <= 0 ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage - 2 <= 0 ? 1 : currentPage - 2}">${currentPage - 2}</button></li>
                                        <li><button type="button" class="btn pagination__page${currentPage - 1 <= 0 ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage - 1 <= 0 ? 1 : currentPage - 1}">${currentPage - 1}</button></li>
                                        <li><button type="button" class="btn pagination__page pagination__page--current" aria-controls="search-results" aria-current="page" data-to-page="${currentPage}">${currentPage}</button></li>
                                        <li><button type="button" class="btn pagination__page${currentPage + 1 > totalPages ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage + 1 > totalPages ? currentPage : currentPage + 1}">${currentPage + 1}</button></li>
                                        <li><button type="button" class="btn pagination__page${currentPage + 2 > totalPages ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage + 2 > totalPages ? currentPage : currentPage + 2}">${currentPage + 2}</button></li>
                                        <li><button type="button" class="btn pagination__page${currentPage + 1 > totalPages ? ' hidden' : ''}" aria-label="Página siguiente" aria-controls="search-results" data-to-page="${currentPage >= totalPages ? totalPages : currentPage + 1}"${currentPage >= totalPages ? ' disabled' : ''}>
                                            &gt;
                                        </button></li>`;
    }
}

export function handlePageChange(jobsData, searchResultsContainer, paginationContainer, pageNumber) {
    const filters = readFilters();
    const pagedJobs = filterPaginateJobs(jobsData, filters?.searchTerm, filters?.technology, filters?.location, filters?.contract, filters?.experience, 3);
    console.log('pagedJobs:', pagedJobs);
    printResults(searchResultsContainer, paginationContainer, pagedJobs, pageNumber);
}