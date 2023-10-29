//Declaracion de las variables del main.

let preJuego = document.querySelector("#pre-juego");
let j1 = document.querySelector("#j1");
let j2 = document.querySelector("#j2");
let canvas = document.querySelector('#juego-4-en-linea');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let context = canvas.getContext('2d');
let fichaJ1;
let fichaJ2;
let modoJuego;

// canvas.addEventListener('mousemove',(e)=>{
//     console.log('layerX --> ',e.layerX);
//     console.log('layerY --> ',e.layerY);
//     console.log('offsetX --> ',e.offsetX);
//     console.log('offsetY --> ',e.offsetY);
//     console.log('pageX --> ',e.pageX);
//     console.log('pageY --> ',e.pageY);    
// });
let fichas1 = document.querySelectorAll('input[name="f1"]');
fichas1.forEach(ficha => {
    ficha.addEventListener('change', (e) =>{
        fichaJ1 = e.target.value;
        console.log(fichaJ1);
        console.log(e);
    });
});
let fichas2 = document.querySelectorAll('input[name="f2"]');
fichas2.forEach(ficha => {
    ficha.addEventListener('change', (e) =>{
        fichaJ2 = e.target.value;
        console.log(fichaJ2);
        console.log(e);
    });
});

let botonesModalidad = document.querySelectorAll('input[type="button"]');
botonesModalidad.forEach(boton => {
    boton.addEventListener('click', (e) =>{
        botonesModalidad.forEach(btn=>{
            btn.classList.remove('seleccionado');
        });
        boton.classList.add('seleccionado');
        modoJuego = e.target.value;
    });
});

let botonComenzar = document.querySelector('#boton-comenzar');


// Declaracion de eventos 

j1.addEventListener('click', (e)=>{
    j2.classList.remove("seleccionado");
    j1.classList.add("seleccionado");
});
j2.addEventListener('click', (e)=>{
    j1.classList.remove("seleccionado");
    j2.classList.add("seleccionado");
});

botonComenzar.addEventListener('click', (e)=>{
    e.preventDefault();
    console.error('opciones iniciales de juego');
    console.info('Nombre Jugador 1 -->', j1.value);
    console.info('Ficha Jugador 1 -->', fichaJ1);
    console.info('Nombre Jugador 2 -->', j2.value);
    console.info('Ficha Jugador 2 -->', fichaJ2);
    console.info('Modalidad de juego -->', modoJuego);

    if(fichaJ1 && fichaJ2) {
        preJuego.classList.add("fade-out");
        setTimeout(function(){
            //
            preJuego.classList.add("no-mostrar");
            let imagenFicha1 = new Image();
            imagenFicha1.src = fichaJ1;
            let imagenFicha2 = new Image();
            imagenFicha2.src = fichaJ2;
            let partida = new Juego(canvasWidth, canvasHeight, context, j1.value, j2.value, imagenFicha1, imagenFicha2, modoJuego);
            partida.iniciarJuego();
        }, 1000);
    } 
    else {
        alert('Para continuar selecciona las fichas de cada jugador.');
    }
    
});