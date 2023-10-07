document.addEventListener("DOMContentLoaded", function() {
    // Comportamiento del menu hamburguesa

    const menuToggle = document.getElementById("menu-toggle");
    const listaMenu = document.getElementById("lista-menu");

    menuToggle.addEventListener("click", function () {
        listaMenu.classList.toggle("no-mostrar");
    });
});