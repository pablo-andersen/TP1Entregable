document.addEventListener("DOMContentLoaded", function() {
    // declaracion de variables del loader
    // porcentaje de carga que se presenta al inicio
    let contenedor = document.querySelector(".loaderContainer");
    const telarania = document.querySelector(".telarania");
    const arania = document.querySelector(".arania");
    const porcentaje = document.querySelector(".porcentaje");
    const lineaBlanca = document.querySelector(".lineaBlanca");
    let avance = 0;
    let posicion = -200;
    let posicionLineaBlanca = -395;


    //declaracion de variables del header (logo sticky)
    let logo = document.querySelector("#logoSpidey");

    //declaracion de variables de hero-parallax
    let fondoCieloNubes = document.querySelector("#fondoCieloNubes");
    let edificioIzq = document.querySelector("#edificio01");
    let edificioFdo = document.querySelector("#edificio02");
    let edificioDer = document.querySelector("#edificio03");
    let mainSpideyRojo = document.querySelector("#mainSpideyRojo");
    let mainSpideyBlanco = document.querySelector("#mainSpideyBlanco");
    let mainSpideyNegro = document.querySelector("#mainSpideyNegro");
    let telaIzq = document.querySelector("#telaIzq");
    let telaDer = document.querySelector("#telaDer");

    //declaracion de variables seccion duende
    let duende =  document.querySelector("#duende");

    //declaracion de variables sección cards
    let flexCard01 = document.querySelector("#card01");
    let flexCard02 = document.querySelector("#card02");
    let flexCard03 = document.querySelector("#card03");

    //declaracion de variables seccion con imágenes fijas y texto con efecto fade
    let imgSticky01 =  document.querySelector("#imgSticky01");
    let imgSticky02 =  document.querySelector("#imgSticky02");
    let imgSticky03 =  document.querySelector("#imgSticky03");
    let imgSticky04 =  document.querySelector("#imgSticky04");
    let txtSticky01 =  document.querySelector("#textSticky01");
    let txtSticky02 =  document.querySelector("#textSticky02");
    let txtSticky03 =  document.querySelector("#textSticky03");
    let txtSticky04 =  document.querySelector("#textSticky04");

    //declaracion de variables seccion Ghost Spidey
    let bannerGhost = document.querySelector('.bannerGhost');
    let demo01 = document.querySelector("#demo01");
    let demo02 = document.querySelector("#demo02");
    let demo03 = document.querySelector("#demo03");

    //declaracion de variables menu hambrguesa
    let barra01 = document.querySelector("#barra01");
    let barra02 = document.querySelector("#barra02");
    let barra03 = document.querySelector("#barra03");
    let menuHamburguesa = document.querySelector("#menuHamburguesa");

    //declaracion de variables para efecto parallax en seccion vengadores
    let capa01 = document.querySelector("#capa01");
    let capa02 = document.querySelector("#capa02");
    let capa03 = document.querySelector("#capa03");
    let capa04 = document.querySelector("#capa04");
    let capa05 = document.querySelector("#capa05");
    let capa06 = document.querySelector("#capa06");

    //Efecto parallax en sección vengadores, a traves del movimiento del mouse. Llama a la función parallaxVengadores que se define a continuacion
    document.addEventListener("mousemove", parallaxVengadores);

    function parallaxVengadores(e){
        //determino el centro de la pantalla
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;

        //determino posicion del mouse
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;

        //calculo diferencia de la posicion del mouse respecto del centro de la ventana
        let desplazamientoX = _mouseX - _w;
        let desplazamientoY = _mouseY - _h;
        console.log(capa01.style);

        //calculo deslpazamiento de cada capa en proporcion al desplazamiento calculado anteriormente
        //telaIzq.setAttribute('style', 'transform: translate3d( 0px, ' + yPos + 'px, 0px)');
        capa01.setAttribute('style', 'transform: translate3d( ' + desplazamientoX * 0.01 + 'px, ' + desplazamientoY * 0.01 + 'px, 0px)');
        capa02.setAttribute('style', 'transform: translate3d( ' + desplazamientoX * 0.02 + 'px, ' + desplazamientoY * 0.02 + 'px, 0px)');
        capa05.setAttribute('style', 'transform: translate3d( ' + desplazamientoX * 0.03 + 'px, ' + desplazamientoY * 0.03 + 'px, 0px)');
        capa04.setAttribute('style', 'transform: translate3d( ' + desplazamientoX * 0.04 + 'px, ' + desplazamientoY * 0.04 + 'px, 0px)');
        capa06.setAttribute('style', 'transform: translate3d( ' + desplazamientoX * 0.05 + 'px, ' + desplazamientoY * 0.05 + 'px, 0px)');
        capa03.setAttribute('style', 'transform: translate3d( ' + desplazamientoX * 0.06 + 'px, ' + desplazamientoY * 0.06 + 'px, 0px)');

    }


    //Menu hamburguesa transiciona a una X en el evento click (y vuelve a estado inicial con otro click)
    menuHamburguesa.addEventListener("click", (e) =>{
        barra01.classList.toggle("barra01_x");
        barra01.classList.toggle("sombraAzul");
        barra02.classList.toggle("barra02_x");
        barra03.classList.toggle("barra03_x");
        barra03.classList.toggle("sombraAzul");
    });



    //loader de 5 segundos con porcentaje de carga
    function cargaSimulada() {
        if (avance < 100) {
            telarania.style.opacity = avance/100;
            avance += 1;
            posicion+= (360/100);     
            posicionLineaBlanca += (360/100);
            arania.style.top = posicion + "px";
            porcentaje.textContent = avance + "%";
            lineaBlanca.style.top = posicionLineaBlanca + "px";
            setTimeout(cargaSimulada, 50); // Actualiza la barra cada 50ms
        } 
        else {
            contenedor.classList.add("noMostrar");
        }
    }
    cargaSimulada();



    //Efecto flotante de las tarjetas de demo del juego en la seccion Ghost Spidey
    demo01.addEventListener("mouseover", (e)=> {
        demo01.classList.remove('demoOut');
        demo01.classList.add('demoIn');
    });
    demo01.addEventListener("mouseout", (e)=>{
        demo01.classList.remove('demoIn');
        demo01.classList.add('demoOut');
    });

    demo02.addEventListener("mouseover", (e)=> {
        demo02.classList.remove('demoOut');
        demo02.classList.add('demoIn');
    });
    demo02.addEventListener("mouseout", (e)=>{
        demo02.classList.remove('demoIn');
        demo02.classList.add('demoOut');
    });

    demo03.addEventListener("mouseover", (e)=> {
        demo03.classList.remove('demoOut');
        demo03.classList.add('demoIn');
    });
    demo03.addEventListener("mouseout", (e)=>{
        demo03.classList.remove('demoIn');
        demo03.classList.add('demoOut');
    });


    //evento scroll en el documento. En función del avance en el scroll, se ejecutan las acciones para: 
    // * achicar el logo sticky
    // * mostrar las cards a destiempo y ocultarlas si se scrollea hacia arriba
    // * controlar visualización de la seccion con imagenes fijas y texto con efecto fade
    
    document.addEventListener("scroll", (e)=>{
        
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


        if (window.scrollY < 3800) {
            imgSticky01.style.opacity = 0;
            txtSticky01.style.opacity = 0;
        }
        else if (window.scrollY > 3800 && window.scrollY < 4200) {
            imgSticky01.style.opacity = 1;
            txtSticky01.style.opacity = 1;
            imgSticky02.style.opacity = 0;
            txtSticky02.style.opacity = 0;
        }
        else if (window.scrollY > 4200 && window.scrollY < 4700) {
            imgSticky01.style.opacity = 0;
            txtSticky01.style.opacity = 0;
            imgSticky02.style.opacity = 1;
            txtSticky02.style.opacity = 1;
            imgSticky03.style.opacity = 0;
            txtSticky03.style.opacity = 0;
        }
        else if (window.scrollY > 4700 && window.scrollY < 5400) {
            imgSticky02.style.opacity = 0;
            txtSticky02.style.opacity = 0;
            imgSticky03.style.opacity = 1;
            txtSticky03.style.opacity = 1;
            imgSticky04.style.opacity = 0;
            txtSticky04.style.opacity = 0;
        }
        else if (window.scrollY > 5400 && window.scrollY < 6000) {
            imgSticky03.style.opacity = 0;
            txtSticky03.style.opacity = 0;
            imgSticky04.style.opacity = 1;
            txtSticky04.style.opacity = 1;
        } 
        else {
            imgSticky04.style.opacity = 0;
            txtSticky04.style.opacity = 0;
        }
    });


    //evento scroll en el documento. En función del avance en el scroll, se ejecutan las acciones para: 
    // * efecto parallax en seccion hero
    // * entrada en pantalla de los spideys principales en la seccion hero junto con las telarañas
    // * desplazamiento lento del cuende al scrollear
    // * desplazamiento a destiempo del fondo en la seccion Ghost Spidey

    window.addEventListener("scroll", (e)=>{
        let top = window.scrollY;
        let speed, yPos;
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

        if(top >= 100 && top < 750){
            let pos = duende.getBoundingClientRect(); 
            if (pos.top < window.innerHeight && pos.bottom > 0) {
            duende.style.transform = 'translateY('+
                (window.scrollY - pos.top) * 0.25
            +'px)';
            }
        }
        
        if (top > 1200 && top <= 2858){
            let pos = bannerGhost.getBoundingClientRect(); 
            bannerGhost.style.transform = 'translateY('+window.scrollY * 0.2+'px)';
        }

    });

});