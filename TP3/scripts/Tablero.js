class Tablero extends Figura{

    constructor(posX, posY, fill, context, width, height, gap, filas, columnas, radio){
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.RADIO = radio;
        this.FILAS = filas;
        this.COLUMNAS = columnas;
    }    

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    draw(){
        console.log('posX--> ',this.posX );
        console.log('posY--> ', this.posY );
        console.log('width--> ', this.width );
        console.log('height--> ', this.height );
        console.log('radio--> ', this.RADIO);
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
}