class Figura {
    constructor(posX, posY, fill, context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.figuras = [];
        this.ultimaFiguraClickeada = null;
        this.isMouseDown = false;
    }
    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.getPosY;
    }
    
    getPosition(){
        return {
            x: this.getPosX(),
            y: this.getPosY(),
        };
    }
    
    setPosition(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }

    getFill(){
        return this.fill
    }

    setFill(fill){
        this.fill = fill;
    }

    draw(){
        this.context.fillStyle = this.fill;
    }

    isPointInside(posX, posY){};

    //Represento en el canvas un objeto dado
    drawFigure(){
        clearCanvas();
        for (let i = 0; i < figuras.length; i++){
            figuras[i].draw();
        }
    }
}