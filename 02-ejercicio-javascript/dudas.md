<!-- Aquí puedes introducir tus dudas sobre el ejercicio, la consigna, la corrección, etc -->
De momento no tengo dudas sobre sintaxis o lógica de javascript, pero estoy abierta a cualquier feedback sobre buenas prácticas.

**Duda de formato:** me tomé la libertad de hacer mi ejercicio de javascript sobre el html que se aprobó en el ejercicio 01 de html, y reemplacé por completo el html proporcionado, esto siguiendo la lógica de que al ver las clases en vivo, ibamos construyendo los ejercicios sobre el código de la clase anterior, pero no me lo cuestioné hasta que no terminé el ejercicio, es esto un problema? para el ejercicio de react, sería mejor que separe los componentes del html proporcionado, o del html que he entregado para los ejercicios??? De antemano muchas gracias c:

Nota: En un principio realicé el código antes de que liberaran el ejercicio a la par de los stream de las clases en vivo, y cuando lo liberaron había código ya hecho diferente del mío al cual tuve que adaptar mi solución, por eso hay una mezcla de comentarios y variables en inglés y en español...

**Respuesta:**
Hola! No hay problema :) Lo que puede pasar en ejercicios siguientes es que si se complique un poco porque tenemos el código de los ejercicios adaptados a lo que se pide. Pero en este caso, no hay problema. Tomate la libertad de hacerlo.

Para el ejercicio de React si quieres usa el HTML que tienes, y lo separas en componentes.

**Respuesta Pao:**
Igual creo que en delante usaré el código proporcionado para que mis futuras entregas no dependan de la aprobación o feedback de los ejercicios anteriores.

**Duda de arrow functions y event listeners:** En ./assets/scripts/fetch-data.js hiciste una mejora compactando mi código en la función renderJobs() y reusando dentro de varios event listeners... mi duda es, si esta función hubiese tenido parámetros, cómo habría invocado la función dentro del event listener? ya que el ejemplo en el código de llama sin paréntesis () solo con el nombre de la función, pero si hubiese tenido parámetros, cómo se los hubiera pasado???

**Respuesta:**

Muy buena pregunta! Si la función necesita parámetros se pasaría así:

```js
// Como se usa ahora SIN parámetros
searchForm?.addEventListener('change', renderJobs);

// Como se usaría ahora CON parámetros
searchForm?.addEventListener('change', () => renderJobs(param1, param2));
```

Esto que hice de invocar la función sin `()` hay que usarlo SOLO cuando la función no necesita parámetros, porque internamente se traduce como:

```js
searchForm?.addEventListener('change', renderJobs);
searchForm?.addEventListener('change', (...evt) => renderJobs(...evt)); // Es lo mismo que lo de arriba
```

`renderJobs()` como no tiene parámetros, no hay problema que le pasemos el evento completo porque no lo va a usar nunca.

En cambio, si tiene parámetros y lo llamamos sin `()`, lo que estamos haciendo es pasarle todo el evento, cuando tal vez lo que esperamos en la función es un número.

Te voy a dejar un ejemplo para que lo pruebes y veas tu misma como funciona:

```js
const showEventParams = (...evt) => {
  console.log(`Los eventos que se reciben son: ${evt}`)
}

const sumNumbers = (num1, num2) => {
  const result = num1 + num2
  console.log(`Sumando ${num1} y ${num2} resulta en ${result}`)
}

const ignoreEvent = () => {
  console.log('Como no recibimos el evento, no pasa nada que nos envíen parámetros.')
}

// Vas a ver como se envían muchos parámetros a `showEventParams`
window.addEventListener('change', showEventParams);
// Vas a ver que `sumNumbers` recibe parámetros aunque no pongamos `()` y como no son números se rompe.
window.addEventListener('change', sumNumbers);
// Vas a ver que al no recibir parametros, no pasa nada que le enviemos el evento completo.
window.addEventListener('change', ignoreEvent);
```

Esto lo podes copiar en tu `fetch-data.js` y ver como funciona en la consola del navegador.

Muchas gracias por la explicación, no tengo más dudas