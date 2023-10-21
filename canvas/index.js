let ctx= document.getElementById("canvas").getContext("2d");
// ctx.fillStyle = "#FF0000";
// ctx.fillRect (50,50,400,400);

// ctx.beginPath();
// ctx.ariaChecked(450,110,100 Math.PI * 1/2, Math.PI * 3/2);
// ctx.lineWidth = 15;
// ctx.lineCap = 'round';
// ctx.strokeStyle = 'rgba(255,127,0,0.5)';
// ctx.stroke();

let width = 900;
let height = 600;
let r= 255;
let b= 0;
let g= 0;
let a= 255;
let imageData = ctx.createImageData(width,height);
let coeficiente = 255/width;

for (let i=0; i<width/2;i++){
    for (let j=0; j<height/2;j++) {
         x= i*2;
         y= j*2;
        setPixel(imageData, x, y, r, g, b, a);
    } 
}

ctx.putImageData(imageData, 0, 0);
function setPixel(imageData, x, y, r, g, b, a){

    index = (x + y * imageData.width) * 4;

    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


//esto no anda
ctx.beginPath();
ctx.arc(150,150, 100,0, Math.PI * 2);
ctx.lineWidth = 15;
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';
ctx.strokeStyle();
ctx.closePath();
