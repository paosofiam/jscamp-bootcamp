export function printResults(searchResultsContainer, paginationContainer, pagedJobs, pageNumber) {
    searchResultsContainer.innerHTML = '';
    pagedJobs[pageNumber - 1].forEach(job => {
        const element = document.createElement('li');
        element.className = 'search-result__item';

        element.dataset.jobId = job.id;
        element.dataset.jobTitle = job.title;
        element.dataset.jobCompany = job.company;
        element.dataset.jobLocation = job.location;
        element.dataset.jobTechnologies = JSON.stringify(job.technologies);
        element.dataset.jobSkills = JSON.stringify(job.skills);
        element.dataset.jobContract = job.contract;
        element.dataset.jobExperience = job.experience;
        element.dataset.jobApplied = job.applied;

        element.innerHTML = `<article class="flex-row align-start">
                                            <div class="search-result__item__info flex-col align-start width-full">
                                                <a href="empleo.html"><h1>${job.title}</h1></a>
                                                <span>${job.company} | ${job.location}</span>
                                                <p>${job.description}</p>
                                            </div>
                                            ${job.applied ? '<button class="btn bg-primary bg-green" disabled>¡Aplicado!</button>' : '<button class="btn bg-primary">Aplicar</button>'}
                                        </article>`;
        searchResultsContainer.appendChild(element);
    });
    printPagination(paginationContainer, pagedJobs.length, pageNumber);
}

export function printPagination(paginationContainer, totalPages, currentPage) {
    paginationContainer.innerHTML = '';
    if( totalPages > 1 ) {
        paginationContainer.innerHTML = `<li><button type="button" class="btn pagination__page${currentPage - 1 <= 0 ? ' hidden' : ''}" aria-label="Página anterior" aria-controls="search-results" data-to-page="${currentPage <= 1 ? 1 : currentPage - 1}"${currentPage <= 1 ? ' disabled' : ''}>&lt</button></li>
                                    <li><button type="button" class="btn pagination__page${currentPage - 2 <= 0 ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage - 2 <= 0 ? 1 : currentPage - 2}">${currentPage - 2}</button></li>
                                    <li><button type="button" class="btn pagination__page${currentPage - 1 <= 0 ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage - 1 <= 0 ? 1 : currentPage - 1}">${currentPage - 1}</button></li>
                                    <li><button type="button" class="btn pagination__page pagination__page--current" aria-controls="search-results" aria-current="page" data-to-page="${currentPage}">${currentPage}</button></li>
                                    <li><button type="button" class="btn pagination__page${currentPage + 1 > totalPages ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage + 1 > totalPages ? currentPage : currentPage + 1}">${currentPage + 1}</button></li>
                                    <li><button type="button" class="btn pagination__page${currentPage + 2 > totalPages ? ' hidden' : ''}" aria-controls="search-results" data-to-page="${currentPage + 2 > totalPages ? currentPage : currentPage + 2}">${currentPage + 2}</button></li>
                                    <li><button type="button" class="btn pagination__page${currentPage + 1 > totalPages ? ' hidden' : ''}" aria-label="Página siguiente" aria-controls="search-results" data-to-page="${currentPage >= totalPages ? totalPages : currentPage + 1}"${currentPage >= totalPages ? ' disabled' : ''}>&gt</button></li>`;
    }
}

export function handlePageChange(jobsData, searchResultsContainer, paginationContainer, pageNumber) {
    //const filters = readFilters();
    const pagedJobs = filterPaginateJobs(jobsData, filters.searchTerm, filters.technology, filters.location, filters.contract, filters.experience, 3);
    printResults(searchResultsContainer, paginationContainer, pagedJobs, pageNumber);
}