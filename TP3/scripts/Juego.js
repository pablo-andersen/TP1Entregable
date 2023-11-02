class Juego{    
    constructor(canvasWidth, canvasHeight, context, jug1, jug2, ficha1, ficha2, modoJuego, canvas){
        switch (modoJuego) {
            case '4 en línea':
                this.FILAS = 6;
                this.COLUMNAS = 7;
              break;
            case '5 en línea':
                this.FILAS = 7;
                this.COLUMNAS = 8;
              break;
            case '6 en línea':
                this.FILAS = 8;
                this.COLUMNAS = 9;
              break;
            case '7 en línea':
                this.FILAS = 9;
                this.COLUMNAS = 10;
              break;
            default:
              this.FILAS = 6;
              this.COLUMNAS = 7;
        }
        this.canvas = canvas;
        this.FICHAS_INICIALES = Math.round(this.FILAS * this.COLUMNAS / 2);  
        this.RADIO = 23;
        this.GAP_FICHAS = 6;
        this.MARGEN_HORIZONTAL = 50;
        this.MARGEN_VERTICAL = 100;
        this.DISPERSION_HORIZONTAL = 100;
        this.DISPERSION_VERTICAL = 335;
        this.imgF1 = ficha1;
        this.imgF2 = ficha2;
        this.nombreJ1 = jug1;
        this.nombreJ2 = jug2;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.context = context;
        this.turnoJ1 = true;
        this.hayGanador = false;
        this.fichasJ1= [];
        this.fichasJ2= [];
        this.fichaSeleccionada = null;
    }
    
    iniciarJuego(){
        //inicializa los parámetros del juego y del tablero.
        
        //Controller
        // instancia un tablero vacío.
        this.ANCHO_TABLERO = (this.COLUMNAS*(this.RADIO*2)) + (this.GAP_FICHAS*(this.COLUMNAS+1));
        this.ALTURA_TABLERO = (this.FILAS*(this.RADIO*2)) + (this.GAP_FICHAS*(this.FILAS+1));
        this.POS_X_INI_TABLERO = (this.canvasWidth - this.ANCHO_TABLERO) / 2;
        this.POS_Y_INI_TABLERO = (this.canvasHeight - this.ALTURA_TABLERO) / 2;
        let fillStyle = "rgba(71,38,134,255)";
        this.tablero = new Tablero(this.POS_X_INI_TABLERO, this.POS_Y_INI_TABLERO, fillStyle, this.context, this.ANCHO_TABLERO, this.ALTURA_TABLERO, this.GAP_FICHAS, this.FILAS, this.COLUMNAS, this.RADIO);
        this.tablero.inicializarTablero(this.FILAS, this.COLUMNAS);
        
        //View
        //dibuja el tablero
        this.clearCanvas();
        this.tablero.draw();
        
        // instancia las fichas, las agrega al arreglo de cada jugador y las dibuja en su posicion inicial.
        
        //cargo el arreglo de fichas de jugador1
        for(let i=0; i< this.FICHAS_INICIALES; i++){
            let posX = Math.round(Math.random() * this.DISPERSION_HORIZONTAL + this.MARGEN_HORIZONTAL);
            let posY = Math.round(Math.random() * this.DISPERSION_VERTICAL + this.MARGEN_VERTICAL);
            this.addFicha(posX, posY, this.imgF1, this.fichasJ1);
        }
        
        //cargo el arreglo de fichas de jugador2
        for(let j=0; j< this.FICHAS_INICIALES; j++){
            let posX = this.canvasWidth - Math.round(Math.random() * this.DISPERSION_HORIZONTAL + this.MARGEN_HORIZONTAL);
            let posY = Math.round(Math.random() * this.DISPERSION_VERTICAL + this.MARGEN_VERTICAL);
            this.addFicha(posX, posY, this.imgF2, this.fichasJ2);          
        }
        
        //dibuja las fichas de ambos jugadores al costado del tablero
        for(let k=0;k<this.FICHAS_INICIALES; k++){                     
            this.fichasJ1[k].draw();
            this.fichasJ2[k].draw();
        }
        this.iniciarTurno();
    }
    
    //instancio una ficha (circulo) y la agrego al arreglo
    addFicha(posX, posY,imagenEquipo, arreglo) {
        let ficha;
        let fillStyle = "rgba(240, 40, 40,255)";
        ficha = new Ficha(posX, posY, fillStyle , this.context, this.RADIO, imagenEquipo);
        arreglo.push(ficha);        
    }

    iniciarTurno(){
        this.canvas.addEventListener('mousedown', (e)=>{            
            if(this.turnoJ1){
                    this.recorrerArreglo(this.fichasJ1, e);
                } else{
                        this.recorrerArreglo(this.fichasJ2, e);
                    }
        });
    }
            
    recorrerArreglo(arreglo, e){
        for(let i=arreglo.length-1; i>=0; i--){
            if (arreglo[i].getDisponible()){
                if (arreglo[i].isPointInside(e.layerX, e.layerY)){
                    this.fichaSeleccionada = arreglo[i];
                    this.moverFicha(e.layerX, e.layerY);
                    break;
                }
            }           
        }
    }
    
    
    moverFicha(posX, posY){
        if (this.fichaSeleccionada != null){
            console.log(this.fichaSeleccionada);
            console.log(posX);
            console.log(posY);
            this.canvas.addEventListener('mousemove',this.onMouseMove); 
            this.canvas.addEventListener('mouseup', this.onMouseUp); 
        }
        
    }    
    
    onMouseMove(e){
        let offsetX = e.layerX - this.fichaSeleccionada.getPosX();
        let offsetY= e.layerY - this.fichaSeleccionada.getPosY();
        this.fichaSeleccionada.setPosition(e.layerX-offsetX, e.layerY-offsetY);
        this.clearCanvas();
        this.tablero.draw();
        for (let ficha of this.fichasJ1.concat(this.fichasJ2)) {
            ficha.draw();
        }
    }
    
    onMouseUp(e){
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        let posFichaX = e.layerX-offsetX;
        let posFichaY = e.layerY-offsetY;
        if(this.tablero.posicionValida(posFichaX, posFichaY )){
            let ubicacion = this.tablero.obtenerCasillero(posFichaX, posFichaY);
            console.log(ubicacion);
            //     if ((ubicacion.fila == -1) && (ubicacion.columna == -1)){
                //         devolverAPosicionInicial();
                //     }
                //     else {
                    //         soltarFicha(ubicacion);
                    //     }
                    // }
                    // else {
                        //     devolverAPosicionInicial();
        }
    }
                
                clearCanvas(){
                    let fill = "rgba(2,48,82,255)";
                    this.context.fillStyle = fill;
                    this.context.beginPath();
                    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.context.stroke();
                }
                
                
                
                
                hayGanador(){}
                
    //CLear canvas debe pintar por encima, pero no cargar la imagen nuevamente a memoria. Vuelve a dibujar la que ya tiene cargada desde el principio. 
    //No ejecutar siempre el onload() de la imagen

    //Al hacer mouseDown, guardar el offset para que no se desplace al arrastrar.
    //
    
    //Una vez que encuentro la ficha, retorna el elemento, agrego ahí el addEventListener de MouseDrag() y cuando lo suelto mouseUP, mato el evento creado
    //Tambien verificar si columna es valida.
    
    //Verificar ganador con 3 doble for y un for simple (para verificar vertical)
    
    //dibujar puntos de colores en el click del mouse, para ver cuál es el que nos sirveº
}