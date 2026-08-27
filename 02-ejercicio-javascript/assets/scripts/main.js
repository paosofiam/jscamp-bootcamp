import './fetch-data.js';
/* import { printResults, handlePageChange } from './print.js';
import { readFilters, filterPaginateJobs } from './filters.js'; */
import './apply-button.js';

const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('search');
const inputElement = document.getElementById('search-form__input');
if (inputElement) {
  inputElement.value = searchQuery || '';
}