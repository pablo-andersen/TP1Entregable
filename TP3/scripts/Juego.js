let canvas = document.querySelector('#juego-4-en-linea');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let context = canvas.getContext('2d');


const FILAS = 6;
const COLUMNAS = 7;
const FICHAS_INICIALES = Math.round(FILAS * COLUMNAS / 2);
const MARGEN_HORIZONTAL = 15;
const MARGEN_VERTICAL = 50;
const DISPERSION_HORIZONTAL = 15;
const DISPERSION_VERTICAL = 75;
const RADIO = 8;
const GAP_FICHAS = 5;
const ANCHO_TABLERO = (COLUMNAS*(RADIO*2)) + (GAP_FICHAS*(COLUMNAS+1));
const ALTURA_TABLERO = (FILAS*(RADIO*2)) + (GAP_FICHAS*(FILAS+1));
const POS_X_INI_TABLERO = (canvasWidth - ANCHO_TABLERO) / 2;
const POS_Y_INI_TABLERO = (canvasHeight - ALTURA_TABLERO) / 2;



/*
//Dibujar fichas del equipo 1
for (let index = 0; index < FICHAS_INICIALES ; index++){
    context.fillStyle = randomRGBA();
    context.beginPath();
    context.arc(Math.round(Math.random() * DISPERSION_HORIZONTAL + MARGEN_HORIZONTAL), Math.round(Math.random() * DISPERSION_VERTICAL + MARGEN_VERTICAL), RADIO,  0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
}

//Dibujar fichas del equipo 2
for (let index = 0; index < FICHAS_INICIALES ; index++){
    context.fillStyle = randomRGBA();
    context.beginPath();
    context.arc(canvasWidth - (Math.round(Math.random() * DISPERSION_HORIZONTAL+ MARGEN_HORIZONTAL)), Math.round(Math.random() * DISPERSION_VERTICAL + MARGEN_VERTICAL), RADIO,  0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
}*/

for (let j=0; j < FICHAS_INICIALES; j++){
    for (let k=0; k < FICHAS_INICIALES; k++){
        
    }
}

function randomRGBA(){
    let r = Math.round(Math.random()*200);
    let g = Math.round(Math.random()*200);
    let b = Math.round(Math.random()*200);
    const a = 255;
    return `rgba(${r},${g},${b},${a})`;
}