document.addEventListener("DOMContentLoaded", function() {

    // Abrir cerrar menu al clickear boton de menu hamburguesa
    const menuToggle = document.querySelector("#menu-toggle");
    const listaMenu = document.querySelector("#lista-menu");

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
    });

    //validar si están los campos del formulario completos. Si no están completos, 
    //tirar mensaje de error.
    //Si están completos, animar y luego redirigir a indexLog.

    const btnLogin = document.querySelector("#btn-login");
    const btnRegistro = document.querySelector("#btn-registro");
    const banner = document.querySelector("#banner-exitoso");

    if(btnLogin) {
        btnLogin.addEventListener("click", (e) => {
            e.preventDefault();
    
            const campoUsuario = document.querySelector("#usuario").value;
            const campoContrasenia = document.querySelector("#contrasenia").value;
    
            console.info("campoContrasenia --> ", campoContrasenia);
            console.info("campoUsuario --> ", campoUsuario);
            //solo si se completaron los campos entra al if
            if (campoUsuario && campoContrasenia) {
                
                banner.classList.remove("no-mostrar");                    
                //primero muestro animacion y luego redirijo al usuario
                setTimeout(() => {
                    window.location.href = "indexLog.html";
                }, 2500);
            }
        });
    }

    if(btnRegistro) {
        btnRegistro.addEventListener("click", (e) => {
            e.preventDefault();
    
            const nombre = document.querySelector("#nombre").value;
            const edad = document.querySelector("#edad").value;
            const email = document.querySelector("#correo").value;
            const pass = document.querySelector("#contrasenia").value;
            const repetirPass = document.querySelector("#repetir-contrasenia").value;
    
           
            //solo si se completaron los campos entra al if
            if (nombre && edad && email && pass && repetirPass && (pass == repetirPass)) {
                
                banner.classList.remove("no-mostrar");                    
                //primero muestro animacion y luego redirijo al usuario
                setTimeout(() => {
                    window.location.href = "indexLog.html";
                }, 2500);
            }
        });
    }
    
});