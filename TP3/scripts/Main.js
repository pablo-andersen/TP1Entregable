let canvas = document.querySelector('#juego-4-en-linea');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let context = canvas.getContext('2d');

let opciones = document.querySelector('#pre-juego');
let jugador1 = opciones.j1;
let jugador2 = opciones.j2;
let ficha1 = opciones.f1;
let ficha2 = opciones.f2;
let juego = opciones.juego;


const MARGEN_HORIZONTAL = 50;
const MARGEN_VERTICAL = 100;
const DISPERSION_HORIZONTAL = 100;
const DISPERSION_VERTICAL = 335;

let partida = new Juego();