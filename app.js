const tituloCancion = document.querySelector('.reproductor-musica h1')
const nombreCancion = document.querySelector(".reproductor-musica p")

const progreso = document.getElementById("progreso");
const cancion = document.getElementById("cancion");

const iconoControl = document.getElementById("iconoControl");
const botonReproducirPausar = document.querySelector('.controles button.reproducir-pausar')

const botonAtras = document.querySelector('.controles button.atras')
const botonAdelante = document.querySelector('.controles button.adelante')

const indicadorCarga = document.getElementById("indicadorCarga");
let intervaloCarga;
let contadorPuntos = 0;

const canciones = [
    {
        titulo:'Como queremos',
        nombre:'Siddhartha',
        fuente:'music/Siddhartha - Como Queremos.mp3'
    },
    {
        titulo:'Diamantes',
        nombre:'Siddhartha, El Zar',
        fuente:'music/Siddhartha, El Zar - Diamantes.mp3'
    },
    {
        titulo:'Aurora',
        nombre:'Siddhartha',
        fuente:'music/Siddhartha - Aurora.mp3'
    },
    
    {
        titulo:'Día Tras Día',
        nombre:'Siddhartha',
        fuente:'music/Siddhartha - Día Tras Día.mp3'
    },
    {
        titulo:'Acapulco',
        nombre:'Siddhartha, Emmanuel Horvilleur',
        fuente:'music/Siddhartha, Emmanuel Horvilleur - Acapulco.mp3'
    },
    {
        titulo:'Nada por Hecho',
        nombre:'Siddhartha',
        fuente:'music/Siddhartha - Nada por Hecho.mp3'
    },
    {
        titulo:'Danzón Nereidas',
        nombre:'Enjambre',
        fuente:'music/Enjambre - Danzón Nereidas.mp3'
    }, 
    {
        titulo:'Secuaz',
        nombre:'Enjambre',
        fuente:'music/Enjambre - Secuaz - Noches de Salón.mp3'
    },
    {
        titulo:'Vida En El Espejo',
        nombre:'Enjambre',
        fuente:'music/Enjambre - Vida En El Espejo - Noches de Salón.mp3'
    },
    {
        titulo:'Divergencia',
        nombre:'Enjambre',
        fuente:'music/Enjambre - Divergencia - Noches de Salón.mp3'
    },
    
];

let indiceCancionActual = 0;

const actualizarInfoCancion=()=>{
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreCancion.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    /* cancion.addEventListener('loadeddata',reproducirPausar); */
}

cancion.addEventListener('loadedmetadata', ()=>{
    progreso.max=cancion.duration;
    progreso.value = cancion.currentTime;
})

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    }else{
        pausarCancion();   
    }
}
const reproducirCancion = () =>{
    cancion.play().catch(error =>{
        console.log("Error al reproducir la cancion ", error);
    });
    iconoControl.classList.add('bi-pause-fill');
    iconoControl.classList.remove('bi-play-fill');
}

const pausarCancion = ()=>{
    cancion.pause();
    iconoControl.classList.remove('bi-pause-fill')
    iconoControl.classList.add('bi-play-fill')
}

cancion.addEventListener('timeupdate', ()=>{
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
})

progreso.addEventListener('input', ()=>{
    cancion.currentTime = progreso.value;
})

botonAdelante.addEventListener('click',()=>{
    indiceCancionActual=(indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
    /* console.log(indiceCancionActual); */ 
})

botonAtras.addEventListener('click',()=>{
    indiceCancionActual=(indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
    /* console.log(indiceCancionActual); */ 
})

/* progreso.addEventListener('change', ()=>{
    reproducirCancion();
})  */

botonReproducirPausar.addEventListener('click', reproducirPausar);

// Función para actualizar el texto del indicador de carga
const actualizarTextoCarga = () => {
    const puntos = '.'.repeat(contadorPuntos % 4); // Crea una cadena de puntos
    indicadorCarga.textContent = `Cargando${puntos}`; // Actualiza el texto
    contadorPuntos++; // Incrementa el contador
}

// Evento para mostrar el indicador de carga
cancion.addEventListener('loadstart', () => {
    indicadorCarga.style.display = 'block'; // Muestra el indicador de carga
    contadorPuntos = 0; // Reinicia el contador de puntos
    actualizarTextoCarga(); // Muestra el texto inicial
    intervaloCarga = setInterval(actualizarTextoCarga, 500); // Actualiza el texto cada 500 ms
});

// Evento para ocultar el indicador de carga
cancion.addEventListener('canplay', () => {
    clearInterval(intervaloCarga); // Detiene el intervalo
    indicadorCarga.style.display = 'none'; // Oculta el indicador de carga
});

actualizarInfoCancion();