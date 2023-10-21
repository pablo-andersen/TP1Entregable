class Figura {
    constructor(posX, posY, fill, context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
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
            y: this.getPosY()
        };
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
}