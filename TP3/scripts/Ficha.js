class Ficha extends Figura{
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
        let imagen = new Image();
        imagen.src = "../img/AvatarFirulais.svg";
        imagen.onload = function(){
            this.context.fill();
        }
    }

    isPointInside(posX, posY){
        let _x = this.posX - posX;
        let _y = this.posY - posY;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
    
    drawFicha(){
        //Dibujar fichas del equipo 1
        for (let index = 0; index < FICHAS_INICIALES ; index++){
            context.fillStyle = randomRGBA();
            context.beginPath();
            context.arc(Math.round(Math.random() * DISPERSION_HORIZONTAL + MARGEN_HORIZONTAL), Math.round(Math.random() * DISPERSION_VERTICAL + MARGEN_VERTICAL), RADIO,  0, 2 * Math.PI);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
    
    drawFicha(){
        //Dibujar fichas del equipo 2
        for (let index = 0; index < FICHAS_INICIALES ; index++){
            context.fillStyle = randomRGBA();
            context.beginPath();
            context.arc(canvasWidth - (Math.round(Math.random() * DISPERSION_HORIZONTAL+ MARGEN_HORIZONTAL)), Math.round(Math.random() * DISPERSION_VERTICAL + MARGEN_VERTICAL), RADIO,  0, 2 * Math.PI);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }

    randomRGBA(){
        let r = Math.round(Math.random()*200);
        let g = Math.round(Math.random()*200);
        let b = Math.round(Math.random()*200);
        const a = 255;
        return `rgba(${r},${g},${b},${a})`;
    }
}