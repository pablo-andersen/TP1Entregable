document.addEventListener("DOMContentLoaded", function() {
    const contenedor = document.querySelector(".contenedor-cargador");
    const barra = document.querySelector(".barra");
    const porcentaje = document.querySelector(".porcentaje");
    let avance = 0;

    function cargarSimulada() {
        if (avance < 100) {
            avance += 1;
            barra.style.width = avance + "%";
            porcentaje.textContent = avance + "%";
            setTimeout(cargarSimulada, 50); // Actualiza la barra cada 50ms
        } 
        else {
            contenedor.classList.add("no-mostrar");
        }

    }

    cargarSimulada();
});
