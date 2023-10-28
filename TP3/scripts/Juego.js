class Juego{
    
    constructor(){
        this.tablero = new Tablero();
        this.FICHAS_INICIALES = Math.round(FILAS * COLUMNAS / 2);
        this.RADIO = 25;
    }
    
    iniciarJuego(){
        this.tablero.draw();
    }

    //instancio una ficha (circulo) y la agrego al arreglo
    addFicha(posX, posY, imagenEquipo) {
        addCirculo(posX, posY, imagenEquipo);
        drawFigure();
    }

    addCirculo(posX, posY, imagenEquipo){
        let nuevaFicha = new Circulo(posX, posY, this.randomRGBA(), this.context, this.RADIO);
        figuras.push(nuevaFicha);
    }

    //CLear canvas debe pintar por encima, pero no cargar la imagen nuevamente a memoria. Vuelve a dibujar la que ya tiene cargada desde el principio. 
    //No ejecutar siempre el onload() de la imagen

    //Al hacer mouseDown, guardar el offset para que no se desplace al arrastrar.
    //

    //Una vez que encuentro la ficha, retorna el elemento, agrego ahí el addEventListener de MouseDrag() y cuando lo suelto mouseUP, mato el evento creado
    //Tambien verificar si columna es valida.

    //Verificar ganador con 3 doble for y un for simple (para verificar vertical)
}