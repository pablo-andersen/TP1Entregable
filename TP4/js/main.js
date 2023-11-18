
window.onscroll = function() { stickyLogo() };

function stickyLogo() {
    var logo = document.querySelector("#logoSpidey");

    // Obtener la posición actual de desplazamiento
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Agregar la clase 'small' cuando el desplazamiento es mayor que 100px (puedes ajustar este valor)
    if (scrollPosition > 50) {
        logo.classList.add("small");
    } else {
        logo.classList.remove("small");
    }
}


