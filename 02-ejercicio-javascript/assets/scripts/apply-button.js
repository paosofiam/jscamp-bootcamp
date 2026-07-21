/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */
document.getElementById('search-results').addEventListener('click', function(event) {
    if(event.target && event.target.tagName === 'BUTTON') {
        event.target.textContent = '¡Aplicado!';
        event.target.classList.toggle('is-applied');
        event.target.disabled = true;
    }
}); 