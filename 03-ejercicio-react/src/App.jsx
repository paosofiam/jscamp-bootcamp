import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { SearchFormSection } from './components/SearchFormSection'
import { SearchResultsSection } from './components/SearchResultsSection'
import { Pagination } from './components/Pagination.jsx'
import { Footer } from './components/Footer'
// import datos from './data.json'

const JOBS_PER_PAGE = 5;
const API_URL = 'https://jscamp-api.vercel.app/api/jobs';
// const TECH_ALIASES = { 'c#': 'csharp' };

function getSearchParams() {
  return new URLSearchParams(window.location.search);
}

function syncSearchParams({ search, technology, location, experience, page }) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (technology) params.set('technology', technology);
  if (location) params.set('location', location);
  if (experience) params.set('experience', experience);
  if (page > 1) params.set('page', String(page));

  const queryString = params.toString();
  const newUrl = queryString ? `?${queryString}` : window.location.pathname;
  window.history.replaceState(null, '', newUrl);
}

/* function filterPaginateJobs(results, search, technology, location, experience, jobsPerPage) {
    const filteredJobs = results.filter((job) => {
        const matchesSearch = !search || job.titulo.toLowerCase().includes(search.toLowerCase());
        const matchesTech = !technology || job.data?.technology.includes(technology);
        const matchesLocation = !location || job.ubicacion.toLowerCase().includes(location.toLowerCase());
        const matchesLevel = !experience || job.data?.nivel === experience;
        return matchesSearch && matchesTech && matchesLocation && matchesLevel;
    });
    let pagedJobs = [];
    for (let i = 0; i < filteredJobs.length; i += jobsPerPage) {
        pagedJobs.push(filteredJobs.slice(i, i + jobsPerPage));
    }
    return pagedJobs;
} */

function App() {
  const [currentPage, setCurrentPage] = useState(() => Number(getSearchParams().get('page')) || 1);
  const [searchValue, setSearchValue] = useState(() => getSearchParams().get('search') || '');
  const [technologyValue, setTechnologyValue] = useState(() => getSearchParams().get('technology') || '');
  const [locationValue, setLocationValue] = useState(() => getSearchParams().get('location') || '');
  const [experienceLevelValue, setExperienceLevelValue] = useState(() => getSearchParams().get('experience') || '');
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    syncSearchParams({ search: searchValue, technology: technologyValue, location: locationValue, experience: experienceLevelValue, page });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setCurrentPage(1);
    syncSearchParams({ search: value, technology: technologyValue, location: locationValue, experience: experienceLevelValue, page: 1 });
  };

  const handleTechnologyChange = (e) => {
    const value = e.target.value;
    setTechnologyValue(value);
    setCurrentPage(1);
    syncSearchParams({ search: searchValue, technology: value, location: locationValue, experience: experienceLevelValue, page: 1 });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationValue(value);
    setCurrentPage(1);
    syncSearchParams({ search: searchValue, technology: technologyValue, location: value, experience: experienceLevelValue, page: 1 });
  };

  const handleExperienceLevelChange = (e) => {
    const value = e.target.value;
    setExperienceLevelValue(value);
    setCurrentPage(1);
    syncSearchParams({ search: searchValue, technology: technologyValue, location: locationValue, experience: value, page: 1 });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('limit', JOBS_PER_PAGE);
    params.set('offset', (currentPage - 1) * JOBS_PER_PAGE);
    if (searchValue) params.set('text', searchValue);//
    if (technologyValue) params.set('technology', technologyValue);
    if (locationValue) params.set('type', locationValue);
    if (experienceLevelValue) params.set('level', experienceLevelValue);

    fetch(`${API_URL}?${params}`)
      .then((res) => res.json())
      .then((json) => {
        setJobs(json.data);
        setTotal(json.total);
      });
  }, [searchValue, technologyValue, locationValue, experienceLevelValue, currentPage]);

/*   const rawTech = technologyValue?.toLowerCase();
  const technology = TECH_ALIASES[rawTech] ?? rawTech;
  const experience = experienceLevelValue?.toLowerCase();
  const pagedJobs = filterPaginateJobs(datos, searchValue, technology, locationValue, experience, JOBS_PER_PAGE);
  const hasResults = pagedJobs.length > 0;
  const totalPages = pagedJobs.length || 1;
  const currentPageJobs = pagedJobs[currentPage - 1] ?? []; */

  const hasResults = total > 0;
  const totalPages = Math.max(1, Math.ceil(total / JOBS_PER_PAGE));

  return (
    <>
      <Header />
      <main>
        <SearchFormSection
          searchValue={searchValue}
          technologyValue={technologyValue}
          locationValue={locationValue}
          experienceLevelValue={experienceLevelValue}
          onSearchChange={handleSearchChange}
          onTechnologyChange={handleTechnologyChange}
          onLocationChange={handleLocationChange}
          onExperienceLevelChange={handleExperienceLevelChange}
        />
        <SearchResultsSection jobs={jobs} />
        {hasResults && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onClick={handlePageChange} />
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
