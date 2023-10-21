class Circulo extends Figura{
    constructor(posX, posY, fill, context, radius){
        super(posX, posY, fill, context);
        this.radius = radius;
    }

    getradius(){
        return this.radius;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0 , 2*Math.PI);
        this.context.fill();
        this.context.closePath();
    }
}