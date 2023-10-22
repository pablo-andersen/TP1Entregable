let canvas = document.querySelector('#juego-4-en-linea');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let context = canvas.getContext('2d');


const FILAS = 6;
const COLUMNAS = 7;
const FICHAS_INICIALES = Math.round(FILAS * COLUMNAS / 2);
const MARGEN_HORIZONTAL = 50;
const MARGEN_VERTICAL = 100;
const DISPERSION_HORIZONTAL = 100;
const DISPERSION_VERTICAL = 335;
const RADIO = 25;
const GAP_FICHAS = 15;
const ANCHO_TABLERO = (COLUMNAS*(RADIO*2)) + (GAP_FICHAS*(COLUMNAS+1));
const ALTURA_TABLERO = (FILAS*(RADIO*2)) + (GAP_FICHAS*(FILAS+1));
const POS_X_INI_TABLERO = (canvasWidth - ANCHO_TABLERO) / 2;
const POS_Y_INI_TABLERO = (canvasHeight - ALTURA_TABLERO) / 2;



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
}

//Dibujar tablero azul
context.beginPath();
context.fillStyle = 'rgba(60,60,200,255)';
context.fillRect(POS_X_INI_TABLERO, POS_Y_INI_TABLERO, ANCHO_TABLERO, ALTURA_TABLERO);
context.stroke();

//Dibujar todas las fichas rojas en el tablero azul, ocupando cada casillero
for (let j=0; j < FILAS; j++){
    for (let k=0; k < COLUMNAS; k++){
        //determinar coordenadas X,Y del centro de la ficha
        let posX = POS_X_INI_TABLERO + GAP_FICHAS * (k+1) + (RADIO * 2 * (k+1)) - RADIO; 
        let posY = POS_Y_INI_TABLERO + GAP_FICHAS * (j+1) + (RADIO * 2 * (j+1)) - RADIO; 

        // dibujar la ficha en la posición calculada anteriormente
        context.fillStyle = 'rgba(255,0,0,255)';
        context.beginPath();
        context.arc(posX, posY, RADIO,  0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    }
}

function randomRGBA(){
    let r = Math.round(Math.random()*200);
    let g = Math.round(Math.random()*200);
    let b = Math.round(Math.random()*200);
    const a = 255;
    return `rgba(${r},${g},${b},${a})`;
}