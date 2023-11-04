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

let FICHAS_INICIALES
let RADIO = 23;
let GAP_FICHAS = 6;
let MARGEN_HORIZONTAL = 50;
let MARGEN_VERTICAL = 100;
let DISPERSION_HORIZONTAL = 100;
let DISPERSION_VERTICAL = 335;
let nombreJ1 = j1.value;
let nombreJ2 = j2.value;
let turnoJ1 = false;
let hayGanador = false;
let fichasJ1= [];
let fichasJ2= [];
var fichaSeleccionada = null;
let isMouseDown = false;
let ANCHO_TABLERO;
let ALTURA_TABLERO;
let POS_X_INI_TABLERO;
let POS_Y_INI_TABLERO;
let imagenFicha1;
let imagenFicha2;
let offsetX = 0;
let offsetY = 0;

// canvas.addEventListener('mousemove',(e)=>{
   
// });
let fichas1 = document.querySelectorAll('input[name="f1"]');
fichas1.forEach(ficha => {
    ficha.addEventListener('change', (e) =>{
        fichaJ1 = e.target.value;
    });
});
let fichas2 = document.querySelectorAll('input[name="f2"]');
fichas2.forEach(ficha => {
    ficha.addEventListener('change', (e) =>{
        fichaJ2 = e.target.value;
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
    
    
    if(fichaJ1 && fichaJ2) {
        preJuego.classList.add("fade-out");
        setTimeout(function(){
            //
            preJuego.classList.add("no-mostrar");

            //Se asignan las imagenes de las fichas de cada equipo.
            imagenFicha1 = new Image();
            imagenFicha1.src = fichaJ1;
            imagenFicha2 = new Image();
            imagenFicha2.src = fichaJ2;

            //Se define el tamaño del tablero.
            switch (modoJuego) {
                case '4 en línea':
                    FILAS = 6;
                    COLUMNAS = 7;
                  break;
                case '5 en línea':
                    FILAS = 7;
                    COLUMNAS = 8;
                  break;
                case '6 en línea':
                    FILAS = 8;
                    COLUMNAS = 9;
                  break;
                case '7 en línea':
                    FILAS = 9;
                    COLUMNAS = 10;
                  break;
                default:
                  FILAS = 6;
                  COLUMNAS = 7;
            }
            //inicializamos las variables del juego

            FICHAS_INICIALES = Math.round(FILAS * COLUMNAS / 2);  


            //let partida = new Juego(canvasWidth, canvasHeight, context, j1.value, j2.value, imagenFicha1, imagenFicha2, modoJuego, canvas);
            iniciarJuego();

        }, 1000);
    } 
    else {
        alert('Para continuar selecciona las fichas de cada jugador.');
    }
});

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup',onMouseUp);


function iniciarJuego(){
    //inicializa los parámetros del juego y del tablero.
    
    // instancia un tablero vacío.
    ANCHO_TABLERO = (COLUMNAS*(RADIO*2)) + (GAP_FICHAS*(COLUMNAS+1));
    ALTURA_TABLERO = (FILAS*(RADIO*2)) + (GAP_FICHAS*(FILAS+1));
    POS_X_INI_TABLERO = (canvasWidth - ANCHO_TABLERO) / 2;
    POS_Y_INI_TABLERO = (canvasHeight - ALTURA_TABLERO) / 2;
    let fillStyle = "rgba(71,38,134,255)";
    tablero = new Tablero(POS_X_INI_TABLERO, POS_Y_INI_TABLERO, fillStyle, context, ANCHO_TABLERO, ALTURA_TABLERO, GAP_FICHAS, FILAS, COLUMNAS, RADIO);
    tablero.inicializarTablero(FILAS, COLUMNAS);
    
    //dibuja el tablero
    clearCanvas();
    tablero.draw();
    
    // instancia las fichas, las agrega al arreglo de cada jugador y las dibuja en su posicion inicial.
    
    //cargo el arreglo de fichas de jugador1
    for(let i=0; i< FICHAS_INICIALES; i++){
        let posX = Math.round(Math.random() * DISPERSION_HORIZONTAL + MARGEN_HORIZONTAL);
        let posY = Math.round(Math.random() * DISPERSION_VERTICAL + MARGEN_VERTICAL);
        addFicha(posX, posY, imagenFicha1, fichasJ1);
    }
    
    //cargo el arreglo de fichas de jugador2
    for(let j=0; j< FICHAS_INICIALES; j++){
        let posX = canvasWidth - Math.round(Math.random() * DISPERSION_HORIZONTAL + MARGEN_HORIZONTAL);
        let posY = Math.round(Math.random() * DISPERSION_VERTICAL + MARGEN_VERTICAL);
        addFicha(posX, posY, imagenFicha2, fichasJ2);          
    }
    
    //dibuja las fichas de ambos jugadores al costado del tablero
    for(let k=0;k<FICHAS_INICIALES; k++){                     
        fichasJ1[k].draw();
        fichasJ2[k].draw();
    }
    iniciarTurno();
}

function clearCanvas(){
    let fill = "rgba(2,48,82,255)";
    context.fillStyle = fill;
    context.beginPath();
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.stroke();
}

//instancio una ficha (circulo) y la agrego al arreglo
function addFicha(posX, posY,imagenEquipo, arreglo) {
    let fillStyle = "rgba(240, 40, 40,255)";
    let ficha = new Ficha(posX, posY, fillStyle , context, RADIO, imagenEquipo);
    arreglo.push(ficha);        
}

function iniciarTurno(){
    turnoJ1 = !turnoJ1;
}

function recorrerArreglo(arreglo, e){
    for(let i=arreglo.length-1; i>=0; i--){
        if (arreglo[i].getDisponible()){
            if (arreglo[i].isPointInside(e.layerX, e.layerY)){
                isMouseDown = true;
                canvas.addEventListener('mousemove',onMouseMove);
                fichaSeleccionada = arreglo[i];
                let posXactual = fichaSeleccionada.getPosX();
                let posYactual = fichaSeleccionada.getPosY();
                offsetX = e.layerX-posXactual;
                offsetY = e.layerY-posYactual;
                fichaSeleccionada.setPosIniX(posXactual);
                fichaSeleccionada.setPosIniY(posYactual);                
                console.log('Posicion Inicial  x: ', fichaSeleccionada.getPosIniX() + ' e y: ' + fichaSeleccionada.getPosIniY());
                break;
            }
        }           
    }
}   

function devolverAPosicionInicial(){
    let nuevaPosX = fichaSeleccionada.getPosIniX();
    let nuevaPosY = fichaSeleccionada.getPosIniY();
    fichaSeleccionada.setPosition(nuevaPosX, nuevaPosY);
    fichaSeleccionada = null;
    clearCanvas();
    tablero.draw();
    for (let ficha of fichasJ1.concat(fichasJ2)) {
        ficha.draw();
    }
}

function soltarFicha(ubicacion){
    console.log('Entró a Soltar Ficha');
    let fila = ubicacion.fila;
    let columna = ubicacion.columna;    

    ficha_posX = POS_X_INI_TABLERO + GAP_FICHAS * (columna+1) + (RADIO * 2 * (columna+1)) - RADIO; 
    ficha_posY = POS_Y_INI_TABLERO + GAP_FICHAS * (fila+1) + (RADIO * 2 * (fila+1)) - RADIO;
    console.log('coordenadas nueva posicion '+ficha_posX+':'+ficha_posY);
    fichaSeleccionada.setPosition(ficha_posX, ficha_posY);
    fichaSeleccionada.setDisponible(false);
    tablero.ocuparCasillero(fila, columna, turnoJ1);
    clearCanvas();
    tablero.draw();
    for (let ficha of fichasJ1.concat(fichasJ2)) {
        ficha.draw();
    }
    iniciarTurno();
}

//eventos 
function onMouseDown(e){    
    let arreglo;
    if(turnoJ1){
        arreglo = fichasJ1;
    } 
    else{
        arreglo = fichasJ2;
    }

    recorrerArreglo(arreglo, e);
}

function onMouseMove(e){
    if (isMouseDown){
        let nuevaPosX = e.layerX - offsetX;
        let nuevaPosY = e.layerY - offsetY;
        fichaSeleccionada.setPosition(nuevaPosX,nuevaPosY);
        clearCanvas();
        tablero.draw();
        for (let ficha of fichasJ1.concat(fichasJ2)) {
            ficha.draw();
        }
    }       
}

function onMouseUp(e){
    if (isMouseDown){
        canvas.removeEventListener('mousemove',onMouseMove);
        let posX = fichaSeleccionada.getPosX();
        let posY = fichaSeleccionada.getPosY();
        if(tablero.posicionValida(posX, posY)){
            console.log('coordenadas a convertir --> ' + posX + ',' + posY)
            let ubicacion = tablero.obtenerCasillero(posX, posY);
            console.log(ubicacion);
            if ((ubicacion.fila == -1) && (ubicacion.columna == -1)){
                console.log('Devolver a por Inicial');
                devolverAPosicionInicial();
            }
            else {
                console.log('Soltar en la columna');
                soltarFicha(ubicacion);
            }
        }
        else {
            console.log('Devolver a por Inicial');
            devolverAPosicionInicial();
        }
        fichaSeleccionada = null;
        isMouseDown = false;
    }
}

 
