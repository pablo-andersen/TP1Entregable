class Tablero{

    letructor(posX, posY, fill, context, width, height){
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
        this.FILAS = 4;
        this.COLUMNAS = 5;
        this.GAP_FICHAS = 15;
        this.ANCHO_TABLERO = (COLUMNAS*(RADIO*2)) + (GAP_FICHAS*(COLUMNAS+1));
        this.ALTURA_TABLERO = (FILAS*(RADIO*2)) + (GAP_FICHAS*(FILAS+1));
        this.POS_X_INI_TABLERO = (canvasWidth - ANCHO_TABLERO) / 2;
        this.POS_Y_INI_TABLERO = (canvasHeight - ALTURA_TABLERO) / 2;
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
        //Dibujar tablero azul
        context.beginPath();
        context.fillStyle = 'rgba(60,60,200,255)';
        context.fillRect(POS_X_INI_TABLERO, POS_Y_INI_TABLERO, ANCHO_TABLERO, ALTURA_TABLERO);
        context.stroke();

        //Dibujar todas las fichas rojas en el tablero azul, ocupando cada casillero
        for (this.j=0; j < FILAS; j++){
            for (this.k=0; k < COLUMNAS; k++){
                //determinar coordenadas X,Y del centro de la ficha
                this.posX = POS_X_INI_TABLERO + GAP_FICHAS * (k+1) + (RADIO * 2 * (k+1)) - RADIO; 
                this.posY = POS_Y_INI_TABLERO + GAP_FICHAS * (j+1) + (RADIO * 2 * (j+1)) - RADIO; 
                
                // dibujar la ficha en la posición calculada anteriormente
                context.fillStyle = 'rgba(255,0,0,255)';
                context.beginPath();
                context.arc(posX, posY, RADIO,  0, 2 * Math.PI);
                context.closePath();
                context.fill();
                context.stroke();
            }
        }
    }
}