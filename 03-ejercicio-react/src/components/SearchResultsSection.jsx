import datos from '../data.json';
import { JobListings } from './JobListings.jsx';
import {Pagination} from './Pagination.jsx';

export function SearchResultsSection() {
    return (
        <section>
          <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
          <JobListings jobs={datos} />
          <Pagination paginas={5} paginaActual={1} />
        </section>
    );
}