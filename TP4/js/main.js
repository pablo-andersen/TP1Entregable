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
            avance += 1;
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


window.onscroll = function() { stickyLogo() };

function stickyLogo() {
    var logo = document.querySelector("#logoSpidey");

    // Obtener la posición actual de desplazamiento
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    // Agregar la clase 'small' cuando el desplazamiento es mayor que 100px (puedes ajustar este valor)
    if (scrollPosition > 200) {
        logo.classList.add("small");
    } else {
        logo.classList.remove("small");
    }
}
let flexCard01 = document.querySelector("#card01");
let flexCard02 = document.querySelector("#card02");
let flexCard03 = document.querySelector("#card03");
document.addEventListener("scroll", (e)=>{
    if(window.scrollY > 1250){
        setTimeout(()=>{
            flexCard01.classList.add("showUp");
        },250);
        setTimeout(()=>{
            flexCard02.classList.add("showUp");
        },500);
        setTimeout(()=>{
            flexCard03.classList.add("showUp");
        },750);        
    }
});

