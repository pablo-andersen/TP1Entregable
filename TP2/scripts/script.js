document.addEventListener("DOMContentLoaded", function() {

    // Abrir cerrar menu al clickear boton de menu hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const listaMenu = document.getElementById("lista-menu");

    menuToggle.addEventListener("click", function () {
        listaMenu.classList.toggle("no-mostrar");
    });


    // Cerrar menu cuando clickeas en una opcion del menu desplegado
    const itemMenu = document.querySelectorAll(".lista-menu li");
    itemMenu.forEach((e) => {
        e.addEventListener("click", () => {
            listaMenu.classList.toggle("no-mostrar");
        })
    })

    const btnCarrito = document.querySelector("#btn-carrito");
    const carrito = document.querySelector("#carrito");

    btnCarrito.addEventListener("click", () => {
        carrito.classList.toggle("no-mostrar");
    })

    //validar si están los campos del formulario completos. Si no están completos, 
    //tirar mensaje de error.
    //Si están completos, animar y luego redirigir a indexLog.

    const btnLogin = document.querySelector("#btn-login");
    const icono = btnLogin.querySelector("icono-animado");

    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();

        const campoUsuario = document.querySelector("#usuario").value;
        const campoContrasenia = document.querySelector("#contrasenia").value;

        console.info("campoContrasenia --> ", campoContrasenia);
        console.info("campoUsuario --> ", campoUsuario);
        
        if (campoUsuario && campoContrasenia) {
            
            
            //solo si se completaron los campos entra al if

            //primero muestro animacion y luego redirijo al usuario
            //para mostrar animacion, se crea una clase css y se aplica al 
            //elemento únicamente cuando entró a este if. 
            //la animación dura 2 segundos, pero la redirección se hace 
            //a los 4 segundos. Usamos setTimeout().
            // btnLogin.classList.add("fondo-animado");
            // icono.Style.animation = "none";
            // void icono.offsetWidth;
            // icono.Style.animation = null;
            setTimeout(() => {
                window.location.href = "indexLog.html";
            }, 500);
            
           

        }
    });
    
});