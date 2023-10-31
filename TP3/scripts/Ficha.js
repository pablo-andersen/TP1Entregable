class Ficha extends Figura{
    constructor(posX, posY, fill, context, radius, imagen){
        super(posX, posY, fill, context);
        this.radius = radius;
        this.imagen = imagen;
        this.disponible = true;
    }
    getradius(){
        return this.radius;
    }

    getDisponible(){
        return this.disponible;
    }
    
    setDisponible(valor){
        this.disponible = valor;
    }

    draw(){
        super.draw();
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0 , 2*Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.context.drawImage(this.imagen, this.posX-this.radius, this.posY-this.radius, this.radius*2, this.radius*2);
    }

    isPointInside(posX, posY){
        let _x = this.posX - posX;
        let _y = this.posY - posY;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

}