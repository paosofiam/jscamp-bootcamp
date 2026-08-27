document.getElementById('search-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('#search-form__input').value.toLowerCase().trim();
    const params = new URLSearchParams(window.location.search);
    params.set('search', searchQuery);
    window.location.search = params.toString();
});
