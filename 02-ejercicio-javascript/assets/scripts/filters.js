/* Aquí va la lógica para filtrar los resultados de búsqueda */
export function readFilters() {
    let filters = {};
    const searchInput = document.getElementById('search-form__input');
    const technologyFilter = document.getElementById('technology-filter');
    const locationFilter = document.getElementById('location-filter');
    const contractTypeFilter = document.getElementById('contract-type-filter');
    const experienceLevelFilter = document.getElementById('experience-level-filter');
    filters.searchTerm = searchInput?.value?.toLowerCase().trim();
    // filters.technology = technologyFilter?.value;
    // El select guarda valores como "JavaScript" o "C#", pero en data.json están escritos en minúsculas: "javascript" y "csharp". Por eso la comparación nunca coincidía, y el filtro de tecnología no encontraba ningún resultado.
    // Pasamos el valor a minúsculas y traducimos los casos especiales para que coincidan con las tecnologías de data.json.
    const techAliases = { 'c#': 'csharp' };
    const rawTech = technologyFilter?.value?.toLowerCase();
    filters.technology = techAliases[rawTech] ?? rawTech; // si hay traducción la usamos, si no, dejamos el valor tal cual
    filters.location = locationFilter?.value;
    filters.contract = contractTypeFilter?.value;
    filters.experience = experienceLevelFilter?.value?.toLowerCase();

    return filters;
}

export function filterPaginateJobs(results, search, technology, location, contract, experience, jobsPerPage) {
    // Antes todo el filtrado estaba dentro de un "if" gigante de una sola línea que era muy difícil de leer.
    // Ahora usamos .filter(), que recorre el arreglo y devuelve solo los empleos que pasan la prueba.
    const filteredJobs = results.filter((job) => {
        const matchesSearch = !search || job.titulo.toLowerCase().includes(search.toLowerCase());
        const matchesTech = !technology || job.data?.technology.includes(technology);
        const matchesLocation = !location || job.ubicacion.toLowerCase().includes(location.toLowerCase());
        const matchesLevel = !experience || job.data?.nivel === experience;
        return matchesSearch && matchesTech && matchesLocation && matchesLevel;
    });
    
    // results.forEach((job) => {
    //     if ((!search || job?.titulo.toLowerCase().includes(search.toLowerCase())) && (!technology || job?.data?.technology.includes(technology)) && (!location || job?.ubicacion.toLowerCase().includes(location.toLowerCase())) && (!contract || job?.contract === contract) && (!experience || job?.data?.nivel === experience)) {
    //         filteredJobs.push(job);
    //     }
    // });
    let pagedJobs = [];
    for (let i = 0; i < filteredJobs.length; i += jobsPerPage) {
        pagedJobs.push(filteredJobs.slice(i, i + jobsPerPage));
    }
    return pagedJobs;
}

/* -------------------- or... -------------------- */

/* const searchForm = document.getElementById('search-form');

const searchInput = document.getElementById('search-form__bar__input');
const technologyFilter = document.getElementById('technology-filter');
const locationFilter = document.getElementById('location-filter');
const contractTypeFilter = document.getElementById('contract-type-filter');
const experienceLevelFilter = document.getElementById('experience-level-filter');


searchForm?.addEventListener('change', () => {
    const jobs = document.querySelectorAll('#search-results li.search-result__item');
    const searchTerm = searchInput.value.toLowerCase().trim();
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
}); */