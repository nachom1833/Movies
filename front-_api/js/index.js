//SEGUNDA PARTE - MOSTRARla paginacion de las peliculas

let pagina = 1;
const botonanterior = document.getElementById('botonanterior');
const botonsiguiente = document.getElementById('botonsiguiente');

botonsiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
    
    
});

botonanterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
    
    
});

//PRIMERA PARTE - PRIMERO EMPECE POR ACA
//consideraciones
// en index.hmtl comente los divs de cada pelicula
// al final del index.html escribi un script para acceder a index.js (este mismo archivo)
// agregue en index html, ids para el botonanteior y botonsiguiente

const cargarPeliculas = async() => {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ee5f9019004b3e013f9bc1f3f0d3aef0&language=es-MX&page=${pagina}`)
    // el fetch estamos realizando una peticion a la api de la pagina peliculas, es traer informacion de peliculas populares
    //la direccion https://api.themoviedb.org/3/movie es para acceder a la pelicula
    //La direcccion https://api.themoviedb.org/3/movie/popular es para acceder a peliculas populares
    // se agregar el & para agregar mas atributos de movie, en este caso es el leguanje y la paginacion
    // el await junto con async() lo que hace es traer toda la informacion desde la api de peliculas
    


    console.log(respuesta); // esto es para probar que devuelve la consola consola

    const datos = await respuesta.json();
    // de la peticion obtengo su JSON y lo guardo en una contante datos para luego manipularlo

    //
    
    //console.log(datos.results);

    let peliculas = '';
    //Creo una constante peliculas vacia

    // de la constante datos quiero acceder a sus resultados (con results) de ahi recorro con un foreach y evaluo cada elemente en una variable pelicula
    // en la variable peliculas pego el div donde se contiene el formato de la imagen de la pelicula
    // se modifica el src agregando la direccion de la api + la foto de la pelicula (que seria poster.path segun la documentacion de la api)
    //Agrego el titulo de cada pelicula con "title"
    datos.results.forEach(pelicula => {
        
        peliculas += `
        <div class="peliculas"><a href="./pages/detalle.html">
        <div class="pelicula"><img class="imgTendencia"
                src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"
                alt="${pelicula.title}" loading="lazy">
            <div class="tituloPelicula">
                <h4>"${pelicula.title}"</h4>
            </div>
        </div>
        </a></div>
        `;     
    });

    //obtengo el contenedor principal y muestro las peliculas
    document.getElementById('tendenciasContainer').innerHTML = peliculas;

}

// llamo a la funcio cargar peliculas al iniciar lapagina
cargarPeliculas();