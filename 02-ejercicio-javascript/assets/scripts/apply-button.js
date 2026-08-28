/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */
document.getElementById('search-results').addEventListener('click', function(event) {
    if(event.target && event.target.tagName === 'BUTTON') {
        event.target.textContent = '¡Aplicado!';
        // La clase `is-applied` no existe en el CSS, por eso no se pone verde el botón.
        // event.target.classList.toggle('is-applied');
        // Vamos a usamos la clase 'bg-green', que ya existe en styles.css y pinta el botón de verde.
        // Por otro lado, toggle sirve para "prender" y "apagar" una clase, nosotros no tenemos esa funcionalidad en el botón, una vez que aplicamos ya se desactiva. Por eso vamos a usar `add`.
        event.target.classList.add('bg-green');
        event.target.disabled = true;
    }
}); 