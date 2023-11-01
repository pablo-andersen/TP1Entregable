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
    }
    
    iniciarJuego(){
        //inicializa los parámetros del juego y del tablero.
        let fillStyle = "rgba(71,38,134,255)";
        this.ANCHO_TABLERO = (this.COLUMNAS*(this.RADIO*2)) + (this.GAP_FICHAS*(this.COLUMNAS+1));
        this.ALTURA_TABLERO = (this.FILAS*(this.RADIO*2)) + (this.GAP_FICHAS*(this.FILAS+1));
        this.POS_X_INI_TABLERO = (this.canvasWidth - this.ANCHO_TABLERO) / 2;
        this.POS_Y_INI_TABLERO = (this.canvasHeight - this.ALTURA_TABLERO) / 2;
        
        // instancia un tablero y lo dibuja vacío.
        this.tablero = new Tablero(this.POS_X_INI_TABLERO, this.POS_Y_INI_TABLERO, fillStyle, this.context, this.ANCHO_TABLERO, this.ALTURA_TABLERO, this.GAP_FICHAS, this.FILAS, this.COLUMNAS, this.RADIO);
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
                    this.moverFicha(arreglo[i], e.layerX, e.layerY);
                    break;
                }
            }           
        }
    }
    
    moverFicha(ficha, posX, posY){
        console.log(ficha);
        console.log(posX);
        console.log(posY);
        let posIniX=  ficha.getPosX();
        let posIniY= ficha.getPosY();
        let offsetX = posX - posIniX;
        let offsetY= posY - posIniY;
        this.canvas.addEventListener('mousemove', (e)=>{
            ficha.setPosition(e.layerX-offsetX, e.layerY-offsetY);
            //clearCanvas();
            this.tablero.draw();
            for (let ficha of this.fichasJ1.concat(this.fichasJ2)) {
                    ficha.draw();
                }
        });
        this.canvas.addEventListener( 'mouseup', (e)=>{
            this.tablero.posicionValida(e.layerX, e.layerY);
        });
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