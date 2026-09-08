import { JobListings } from './JobListings.jsx';

export function SearchResultsSection({ jobs }) {

    return (
        <section>
          <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
          <JobListings jobs={jobs} />
        </section>
    );
}
