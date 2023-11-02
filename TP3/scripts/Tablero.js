class Tablero extends Figura{

    constructor(posX, posY, fill, context, width, height, gap, filas, columnas, radio){
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.RADIO = radio;
        this.FILAS = filas;
        this.COLUMNAS = columnas;
        this.tablero= [[]];
    }    

    inicializarTablero(filas, columnas){
        for(let f = 0; f < filas; f++){
            for(let c = 0; c < columnas; c++){
                this.tablero[f[c]] = 0;
                console.log('f-> '+ f + 'c->' + c + ' valor -> ' + this.tablero[f[c]]);
            }
        }
        console.info(this.tablero);
    }

    obtenerCasillero(posX,posY){
        let filaRes = -1;
        let colRes = -1;
        console.log(posX+','+posY);
        for (let c=0; c < this.COLUMNAS; c++){
            if ((posX > (this.posX + (c+1)*this.gap) + (c*2*this.radio) - (this.gap/2)) && 
                (posX < (this.posX + ((c+1)*this.gap) + (c+1)*2*this.radio)) + (this.gap/2)) {
                    colRes = c;                    
                    for(let f = 0; f < this.FILAS ; f++){
                        if (this.tablero[f[colRes]] != 0){
                            if (f != 0) {
                                colRes = -1;
                            }
                            else {
                                filaRes = f-1;
                            }
                            break;
                        }
                    }
                break;
            }
        }
        return {
            fila:filaRes,
            columna:colRes,
        };
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
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
            }

        }
        else {
            return false;
        }
    }
}