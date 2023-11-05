class Tablero extends Figura{

    constructor(posX, posY, fill, context, width, height, gap, filas, columnas, radio){
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.RADIO = radio;
        this.FILAS = filas;
        this.COLUMNAS = columnas;
        this.tablero= [];
    }    

    inicializarTablero(filas, columnas){
        for(let f = 0; f < filas; f++){
            this.tablero[f] = [];
            for(let c = 0; c < columnas; c++){
                this.tablero[f][c] = 0;
            }
        }
        console.log ('tablero inicializado');
        for (let fila of this.tablero){
            console.log(fila);
        }
    }

    ocuparCasillero(fila, columna, turnoJ1){
        console.log('valor casillero ->', this.tablero[fila][columna]);
        if(turnoJ1){
            this.tablero[fila][columna] = 1; 
        } 
        else {
            this.tablero[fila][columna] = 2;
        }
        console.log('valor casillero ->', this.tablero[fila][columna]);
    }

    obtenerCasillero(posX,posY){
        let filaRes = -1;
        let colRes = -1;
        for (let col=0; col < this.COLUMNAS; col++){
            if (posX > (this.posX + (col+1)*this.gap) + (col*2*this.RADIO) - (this.gap/2)) {
                if (posX < (this.posX + (col+1)*this.gap) + ((col+1)*2*this.RADIO) + (this.gap/2)){
                    colRes = col;   
                    let contenido;
                    let f = 0;
                    while (f < this.FILAS){
                        contenido = this.tablero[f][colRes];
                        console.log('iteracion ' + (f+1) + ': ' + contenido + '. Posicion['+f+']['+colRes+']');
                        if (contenido !== 0){
                            if (f == 0) {
                                colRes = -1;
                            }
                            else {
                                filaRes = f-1;
                            }
                            break;
                        }
                        f++;
                    }
                    if(f == this.FILAS){
                        filaRes = f-1;
                    }
                    break;
                }
            }                 
        }        
        return {
            fila: filaRes,
            columna: colRes
        };
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getValor(ubicacion){
        let fila = ubicacion.fila;
        let columna = ubicacion.columna;
        let valor = this.tablero[fila][columna];
        return valor;
    }

    draw(){
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
        // //Dibujar tablero azul
        this.context.beginPath();
        this.context.stroke();
        let ficha_posX;
        let ficha_posY;
        context.globalCompositeOperation = "destination-out";

        //Dibujar todas las fichas rojas en el tablero azul, ocupando cada casillero
        for (let j=0; j < this.FILAS; j++){
            for ( let k=0; k < this.COLUMNAS; k++){
                    //determinar coordenadas X,Y del centro de la ficha
                ficha_posX = this.posX + this.gap * (k+1) + (this.RADIO * 2 * (k+1)) - this.RADIO; 
                ficha_posY = this.posY + this.gap * (j+1) + (this.RADIO * 2 * (j+1)) - this.RADIO; 
                    // dibujar la ficha en la posición calculada anteriormente
                context.fillStyle = 'rgba(255,0,0,255)';
                context.beginPath();
                context.arc(ficha_posX, ficha_posY, this.RADIO,  0, 2 * Math.PI);
                context.closePath();
                context.fill();
                context.stroke();
            }
        }
        context.globalCompositeOperation = "source-over";
    }

    posicionValida(posX, posY){
        if(posY <= this.posY-this.RADIO) {
            if((posX > this.posX) && (posX < this.posX+this.width)){
                console.log('Posicion válida');
                return true;                
            }
            else {
                
                console.log('Posicion no válida');
                return false;
            }
        }
        else {            
            console.log('Posicion no válida');
            return false;
        }
    }
}