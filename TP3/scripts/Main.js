//Declaracion de las variables del main.

let preJuego = document.querySelector("#pre-juego");
let j1 = document.querySelector("#j1");
let j2 = document.querySelector("#j2");
let canvas = document.querySelector('#juego-4-en-linea');
let navTimer = document.querySelector('#barra-timer');
let timer = document.querySelector('#timer');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let context = canvas.getContext('2d');
let fichaJ1;
let fichaJ2;
let modoJuego;
let fondoCanvas;
let minutosTimer;
let segundosTimer;
let intervalo;
let FICHAS_INICIALES;
let RADIO = 23;
let GAP_FICHAS = 6;
let MARGEN_HORIZONTAL = 50;
let MARGEN_VERTICAL = 100;
let DISPERSION_HORIZONTAL = 100;
let DISPERSION_VERTICAL = 335;
let nombreJ1;
let nombreJ2;
let turnoJ1;
let hayGanador;
let fichasJ1;
let fichasJ2;
var fichaSeleccionada;
let isMouseDown;
let ANCHO_TABLERO;
let ALTURA_TABLERO;
let POS_X_INI_TABLERO;
let POS_Y_INI_TABLERO;
let imagenFicha1;
let imagenFicha2;
let offsetX = 0;
let offsetY = 0;
let cantFichasParaGanar;
let fichasGanadoras = [];

let reiniciar = document.querySelector('#boton-reiniciar');
reiniciar.addEventListener('click',(e)=>{
    e.preventDefault();
    clearInterval(intervalo);
    iniciarJuego();
});
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
            navTimer.classList.remove("no-mostrar");

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
                    cantFichasParaGanar = 4;
                    break;
                case '5 en línea':
                    FILAS = 7;
                    COLUMNAS = 8;
                    cantFichasParaGanar = 5;
                    break;
                case '6 en línea':
                    FILAS = 8;
                    COLUMNAS = 9;
                    cantFichasParaGanar = 6;
                    break;
                case '7 en línea':
                    FILAS = 9;
                    COLUMNAS = 10;
                    cantFichasParaGanar = 7;
                    break;
                default:
                    FILAS = 6;
                    COLUMNAS = 7;
                    cantFichasParaGanar = 4;
            }
            //inicializamos las variables del juego
            nombreJ1 = j1.value;
            nombreJ2 = j2.value;
            FICHAS_INICIALES = Math.round(FILAS * COLUMNAS / 2);  


            //let partida = new Juego(canvasWidth, canvasHeight, context, j1.value, j2.value, imagenFicha1, imagenFicha2, modoJuego, canvas);
            iniciarJuego();

        }, 1000);
    } 
    else {
        alert('Para continuar selecciona las fichas de cada jugador.');
    }
});



function iniciarJuego(){
    //inicializa los parámetros del juego y del tablero.
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup',onMouseUp);
    context.lineWidth = 1;
    turnoJ1 = false;
    hayGanador = false;
    fichaSeleccionada=null;
    isMouseDown=false;
    minutosTimer = 3;
    segundosTimer = 0;
    dibujarTimer();
    intervalo = setInterval(()=>{
        if (minutosTimer === 0 && segundosTimer === 0) {
            canvas.removeEventListener("mousedown", onMouseDown);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
            clearInterval(intervalo);
            mostrarMensaje('Tiempo finalizado!');
        } 
        else if (segundosTimer === 0) {
            minutosTimer--;
            segundosTimer = 59;
        } 
        else {
            segundosTimer--;
        }
        dibujarTimer();
    },1000);
    fichasJ1 = [];
    fichasJ2 = [];
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
    let fill = "rgba(20,20,92,255)";
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
    let fila = ubicacion.fila;
    let columna = ubicacion.columna;    

    ficha_posX = POS_X_INI_TABLERO + GAP_FICHAS * (columna+1) + (RADIO * 2 * (columna+1)) - RADIO; 
    ficha_posY = POS_Y_INI_TABLERO + GAP_FICHAS * (fila+1) + (RADIO * 2 * (fila+1)) - RADIO;
    fichaSeleccionada.setPosition(ficha_posX, ficha_posY);
    fichaSeleccionada.setDisponible(false);
    tablero.ocuparCasillero(fila, columna, turnoJ1);
    clearCanvas();
    tablero.draw();
    for (let ficha of fichasJ1.concat(fichasJ2)) {
        ficha.draw();
    }
    comprobarGanador(ubicacion);
    if(!hayGanador){
        iniciarTurno();
    }
    else {
        console.log('terminarJuego();');
        let jugadorGanador;
        if (turnoJ1){
            jugadorGanador = nombreJ1;
        }
        else {
            jugadorGanador = nombreJ2;
        }
        resaltarFichasGanadoras(fichasGanadoras);
        mostrarGanador(jugadorGanador, fichasGanadoras);
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        clearInterval(intervalo);
    }
}

function comprobarGanador(ubicacion){
    let fila = ubicacion.fila;
    let col = ubicacion.columna;
    let valorBuscado;
    let contador;
    let valorActual;
    let filaActual;
    let columnaActual;
    let ubicacionActual;

    if (turnoJ1){
        valorBuscado = 1;
    }
    else {
        valorBuscado = 2;
    }
    if (!hayGanador){
        verificarGanadorVertical(ubicacion,valorBuscado);
    }
    if (!hayGanador){
        verificarGanadorHorizontal(ubicacion,valorBuscado);
    }
    if (!hayGanador){
        verificarGanadorDiagonalAscendente(ubicacion,valorBuscado);
    }
    if (!hayGanador){
        verificarGanadorDiagonalDescendente(ubicacion,valorBuscado);
    }
    
}

function verificarGanadorDiagonalDescendente(ubicacion,valorBuscado){
    contador = 0;
    let posGanadora;
    filaActual = ubicacion.fila;
    columnaActual = ubicacion.columna;
    ubicacionActual = {fila:filaActual,columna:columnaActual};
    valorActual = tablero.getValor(ubicacionActual);

        //Primero cuento hacia la izquierda y arriba
    while ((columnaActual >= 0) && (filaActual >= 0) && (contador < cantFichasParaGanar) && (valorActual == valorBuscado)) {  
        posGanadora = {fila:filaActual,columna:columnaActual};
        fichasGanadoras.push(posGanadora);
        contador ++;
        columnaActual --;
        filaActual --;
        if((columnaActual >= 0) && (filaActual >= 0)){
            ubicacionActual = {fila:filaActual,columna:columnaActual};
            valorActual = tablero.getValor(ubicacionActual);
        }
    }
        //Despues hacia la derecha y abajo
    columnaActual = ubicacion.columna + 1;
    filaActual = ubicacion.fila + 1;
    if((columnaActual < COLUMNAS) && (filaActual < FILAS)){
        ubicacionActual = {fila:filaActual,columna:columnaActual};
        valorActual = tablero.getValor(ubicacionActual);
    }
    while ((columnaActual < COLUMNAS) && (filaActual < FILAS) && (contador < cantFichasParaGanar) && (valorActual == valorBuscado)) {  
        posGanadora = {fila:filaActual,columna:columnaActual};
        fichasGanadoras.push(posGanadora);
        contador ++;
        columnaActual ++;
        filaActual ++;
        if((columnaActual < COLUMNAS) && (filaActual < FILAS)){
            ubicacionActual = {fila:filaActual,columna:columnaActual};
            valorActual = tablero.getValor(ubicacionActual);
        }
    }
    if(contador == cantFichasParaGanar){
        hayGanador = true;
        console.log('Hay ganador!!! Ganó jugador 1? ' + turnoJ1 +'. Las fichas ganadoras se encuentran en las posiciones: ');
        for (let z= 0 ; z < fichasGanadoras.length; z++){
            console.log(fichasGanadoras[z]);
        }
    }
    else {
        fichasGanadoras = [];
    }
}

function verificarGanadorDiagonalAscendente(ubicacion,valorBuscado){
    contador = 0;
    let posGanadora;
    filaActual = ubicacion.fila;
    columnaActual = ubicacion.columna;
    ubicacionActual = {fila:filaActual,columna:columnaActual};
    valorActual = tablero.getValor(ubicacionActual);

        //Primero cuento hacia la derecha y arriba
    while ((columnaActual < COLUMNAS) && (filaActual >= 0) && (contador < cantFichasParaGanar) && (valorActual == valorBuscado)) {  
        posGanadora = {fila:filaActual,columna:columnaActual};
        fichasGanadoras.push(posGanadora);
        contador ++;
        columnaActual ++;
        filaActual --;
        if((columnaActual < COLUMNAS) && (filaActual >= 0)){
            ubicacionActual = {fila:filaActual,columna:columnaActual};
            valorActual = tablero.getValor(ubicacionActual);
        }
    }
        //Despues hacia la izquierda y abajo
    columnaActual = ubicacion.columna - 1;
    filaActual = ubicacion.fila + 1;
    if((columnaActual >= 0) && (filaActual < FILAS)){
        ubicacionActual = {fila:filaActual,columna:columnaActual};
        valorActual = tablero.getValor(ubicacionActual);
    }
    while ((columnaActual >= 0) && (filaActual < FILAS) && (contador < cantFichasParaGanar) && (valorActual == valorBuscado)) {  
        posGanadora = {fila:filaActual,columna:columnaActual};
        fichasGanadoras.push(posGanadora);
        contador ++;
        columnaActual --;
        filaActual ++;
        if((columnaActual >= 0) && (filaActual < FILAS)){
            ubicacionActual = {fila:filaActual,columna:columnaActual};
            valorActual = tablero.getValor(ubicacionActual);
        }
    }
    if(contador == cantFichasParaGanar){
        hayGanador = true;
        console.log('Hay ganador!!! Ganó jugador 1? ' + turnoJ1 +'. Las fichas ganadoras se encuentran en las posiciones: ');
        for (let z= 0 ; z < fichasGanadoras.length; z++){
            console.log(fichasGanadoras[z]);
        }
    }
    else {
        fichasGanadoras = [];
    }
}

function verificarGanadorHorizontal(ubicacion, valorBuscado){
    contador = 0;
    let posGanadora;
    filaActual = ubicacion.fila;
    columnaActual = ubicacion.columna;
    ubicacionActual = {fila:filaActual,columna:columnaActual};
    valorActual = tablero.getValor(ubicacionActual);

        //Primero cuento hacia la izq
    while ((columnaActual >= 0) && (contador < cantFichasParaGanar) && (valorActual == valorBuscado)) {                
        posGanadora = {fila:filaActual,columna:columnaActual};
        fichasGanadoras.push(posGanadora);
        contador ++;
        columnaActual --;
        if(columnaActual >= 0){
            ubicacionActual = {fila:filaActual,columna:columnaActual};
            valorActual = tablero.getValor(ubicacionActual);
        }
    }
        //Despues hacia la der
    columnaActual = ubicacion.columna + 1;
    if (columnaActual < COLUMNAS){
        ubicacionActual = {fila:filaActual,columna:columnaActual};
        valorActual = tablero.getValor(ubicacionActual);
    }
    while ((columnaActual < COLUMNAS) && (contador < cantFichasParaGanar) && (valorActual == valorBuscado)) {
        posGanadora = {fila:filaActual,columna:columnaActual};
        fichasGanadoras.push(posGanadora);
        contador ++;             
        columnaActual ++; 
        if (columnaActual < COLUMNAS){
            ubicacionActual = {fila:filaActual,columna:columnaActual};
            valorActual = tablero.getValor(ubicacionActual);
        }
    }
    if(contador == cantFichasParaGanar){
        hayGanador = true;
        console.log('Hay ganador!!! Ganó jugador 1? ' + turnoJ1 +'. Las fichas ganadoras se encuentran en las posiciones: ');
        for (let z= 0 ; z < fichasGanadoras.length; z++){
            console.log(fichasGanadoras[z]);
        }
    }
    else {
        fichasGanadoras = [];
    }
}    

function verificarGanadorVertical(ubicacion,valorBuscado) {
    contador = 0;
    let posGanadora;
    filaActual = ubicacion.fila;
    columnaActual = ubicacion.columna;
    ubicacionActual = {fila:filaActual,columna:columnaActual};
    valorActual = tablero.getValor(ubicacionActual);
    
    while ((filaActual < FILAS) && (contador < cantFichasParaGanar) && (valorActual == valorBuscado)) {           
        posGanadora = {fila:filaActual,columna:columnaActual};
        fichasGanadoras.push(posGanadora);
        contador ++;    
        filaActual ++;
        if (filaActual < FILAS){
            ubicacionActual = {fila:filaActual,columna:columnaActual};           
            valorActual = tablero.getValor(ubicacionActual);
        }
    }
    if(contador == cantFichasParaGanar){
        hayGanador = true;
    }
    else {
        fichasGanadoras = [];
    }
}

function mostrarMensaje(mensaje){
    let mensajeWidth = 350;
    let mensajeHeight = 60;
    let mensajeX = (canvas.width - mensajeWidth) / 2;
    let mensajeY = (canvasHeight-mensajeHeight) /2;
    context.fillStyle = "rgba(38,45,227,0.7)";
    context.fillRect(mensajeX, mensajeY, mensajeWidth, mensajeHeight);
    let bannerX = canvas.width / 2;
    let bannerY = (canvasHeight+20) /2;
    // Dibujar el texto del mensaje
    context.font = "30px 'M PLUS Rounded 1c', sans-serif";
    context.fillStyle = "rgba(54,247,43,1)";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.textAlign = "center";
    context.strokeText(mensaje, bannerX, bannerY);
    context.fillText(mensaje, bannerX, bannerY);
}

function mostrarGanador(jugador) {    
    let mensaje = 'Ganó ' + jugador;
    
    // Dibujar el Letrero
    mostrarMensaje(mensaje);
}

function resaltarFichasGanadoras(fichasGanadoras){
    for(let i = 0; i < fichasGanadoras.length ; i++){
        let fila= fichasGanadoras[i].fila;
        let columna = fichasGanadoras[i].columna;
        ficha_posX = POS_X_INI_TABLERO + GAP_FICHAS * (columna+1) + (RADIO * 2 * (columna+1)) - RADIO; 
        ficha_posY = POS_Y_INI_TABLERO + GAP_FICHAS * (fila+1) + (RADIO * 2 * (fila+1)) - RADIO; 
        context.filter = "blur(3px)";
        context.beginPath();
        context.arc(ficha_posX, ficha_posY, RADIO-1,  0, 2 * Math.PI);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "rgba(54,247,43,255)";
        context.stroke();
        context.filter = "none";
    }
}

function dibujarTimer(){
    let tiempoRestante = String(minutosTimer).padStart(2,'0') + ':' + String(segundosTimer).padStart(2,'0');
    timer.innerHTML = tiempoRestante;
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
            let ubicacion = tablero.obtenerCasillero(posX, posY);
            if ((ubicacion.fila == -1) && (ubicacion.columna == -1)){
                devolverAPosicionInicial();
            }
            else {
                soltarFicha(ubicacion);
            }
        }
        else {
            devolverAPosicionInicial();
        }
        fichaSeleccionada = null;
        isMouseDown = false;
    }
}