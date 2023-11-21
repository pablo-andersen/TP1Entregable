document.addEventListener("DOMContentLoaded", function() {
    
    // porcentaje de carga que se presenta al inicio
    let contenedor = document.querySelector(".loaderContainer");
    const telarania = document.querySelector(".telarania");
    const arania = document.querySelector(".arania");
    const porcentaje = document.querySelector(".porcentaje");
    const lineaBlanca = document.querySelector(".lineaBlanca");
    var estilos = window.getComputedStyle(lineaBlanca);

    let avance = 0;
    let posicion = -200;
    let posicionLineaBlanca = -395;

    
    function cargarSimulada() {
        if (avance < 100) {
            telarania.style.opacity = avance/100;
            avance += 10;
            posicion+= (360/100);     
            posicionLineaBlanca += (360/100);
            arania.style.top = posicion + "px";
            porcentaje.textContent = avance + "%";
            lineaBlanca.style.top = posicionLineaBlanca + "px";
            setTimeout(cargarSimulada, 50); // Actualiza la barra cada 50ms
        } 
        else {
            contenedor.classList.add("noMostrar");
        }
    }
    cargarSimulada();
});


let logo = document.querySelector("#logoSpidey");
let fondoCieloNubes = document.querySelector("#fondoCieloNubes");
let edificioIzq = document.querySelector("#edificio01");
let edificioFdo = document.querySelector("#edificio02");
let edificioDer = document.querySelector("#edificio03");
let mainSpideyRojo = document.querySelector("#mainSpideyRojo");
let mainSpideyBlanco = document.querySelector("#mainSpideyBlanco");
let mainSpideyNegro = document.querySelector("#mainSpideyNegro");
let telaIzq = document.querySelector("#telaIzq");
let telaDer = document.querySelector("#telaDer");
let duende =  document.querySelector("#duende");
let flexCard01 = document.querySelector("#card01");
let flexCard02 = document.querySelector("#card02");
let flexCard03 = document.querySelector("#card03");
let imgSticky01 =  document.querySelector("#imgSticky01");
let imgSticky02 =  document.querySelector("#imgSticky02");
let imgSticky03 =  document.querySelector("#imgSticky03");
let imgSticky04 =  document.querySelector("#imgSticky04");

document.addEventListener("scroll", (e)=>{
    
    // Agregar la clase 'small' cuando el desplazamiento es mayor que 200px
    if (window.scrollY > 20) {
        logo.classList.add("small");
    } else {
        logo.classList.remove("small");
    }

    if(window.scrollY > 1250){
        setTimeout(()=>{
            flexCard01.classList.add("showUp");
        },0);
        setTimeout(()=>{
            flexCard02.classList.add("showUp");
        },150);
        setTimeout(()=>{
            flexCard03.classList.add("showUp");
        },400);        
    } else {
        flexCard01.classList.remove("showUp");
        flexCard02.classList.remove("showUp");
        flexCard03.classList.remove("showUp");
    }
    if(window.scrollY >= 5363){
        imgSticky04.style.opacity = 0;
    }
    else if (window.scrollY >= 5063 && window.scrollY < 5363){
        imgSticky03.style.opacity = 0;
        imgSticky04.style.opacity = 1;
    } else  if (window.scrollY >= 4563 && window.scrollY < 5063){
        imgSticky02.style.opacity = 0;
        imgSticky03.style.opacity = 1;
        imgSticky04.style.opacity = 0;
    } else  if (window.scrollY >= 4063 && window.scrollY < 4563){
        imgSticky01.style.opacity = 0;
        imgSticky02.style.opacity = 1;
        imgSticky03.style.opacity = 0;
    } else  if (window.scrollY >= 3763 && window.scrollY < 4063){
        imgSticky02.style.opacity = 0;
        imgSticky01.style.opacity = 1;
    } else {
        imgSticky01.style.opacity = 0;
    }
});

var scrollPos = 0;
window.addEventListener("scroll", (e)=>{
    let top = window.scrollY;
    let speed, yPos;
    let currentScrollPos = window.scrollY;
    let stepScroll = currentScrollPos-scrollPos;
    let scale = 1;

    // mover el cielo
    speed = fondoCieloNubes.getAttribute('data-speed');
    yPos = (top * (speed / 40));
    fondoCieloNubes.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

    // mover edif izq
    speed = edificioIzq.getAttribute('data-speed');
    yPos = (top * (speed / 40));
    edificioIzq.setAttribute('style', 'transform: translate3d(-' + yPos + 'px, ' + yPos + 'px, 0px)');

    // mover edif der
    speed = edificioDer.getAttribute('data-speed');
    yPos = (top * (speed / 40));
    edificioDer.setAttribute('style', 'transform: translate3d(' + yPos + 'px, ' + yPos + 'px, 0px)');

    //mover el edif fondo
    speed = edificioFdo.getAttribute('data-speed');
    yPos = (top * (speed / 40));
    edificioFdo.setAttribute('style', 'transform: translate3d( 0px, ' + yPos + 'px, 0px)');
    if (window.scrollY < 300){
        
        yPos = mainSpideyBlanco.getAttribute('top')-top;
        scale =scale * 1.07;
      
        mainSpideyBlanco.setAttribute('style', 'transform: translate3d( '+ yPos/4 +'px, ' + yPos + 'px, 0px)');
    
        yPos = mainSpideyRojo.getAttribute('top')-top;
        mainSpideyRojo.setAttribute('style', 'transform: translate3d( 0px, ' + yPos + 'px, 0px)');
    
        yPos = mainSpideyNegro.getAttribute('top')-top;
        mainSpideyNegro.setAttribute('style', 'transform: translate3d( '+ -yPos/4 +'px, ' + yPos + 'px, 0px)');
    
        yPos = telaIzq.getAttribute('top')-top;
        telaIzq.setAttribute('style', 'transform: translate3d( 0px, ' + yPos + 'px, 0px)');
    
        yPos = telaDer.getAttribute('top')-top;
        telaDer.setAttribute('style', 'transform: translate3d( '+ -yPos/4 +'px, ' + yPos + 'px, 0px)');
    }

    if(top >= 200 && top < 1400){
        let pos = duende.getBoundingClientRect(); 
        if (pos.top < window.innerHeight && pos.bottom > 0) {
          duende.style.transform = 'translateY('+
            (window.scrollY - pos.top) * 0.0275
          +'px)';
        }
    }
    scrollPos = currentScrollPos;
});