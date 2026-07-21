
import { readFilters, filterPaginateJobs } from './filters.js';
import { printResults, handlePageChange } from './print.js';
import { jobsData } from './fetch-data.js';

const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('search');

document.getElementById('search-form__bar__input')?.value = searchQuery || '';

alert("hello word!");