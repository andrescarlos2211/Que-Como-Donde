const seccionesPagina = new fullpage('#fullpage', {
    licenseKey: 'gplv3-license',
    autoScrolling: true, // Se activa el scroll.
    fitToSection: true, // Acomoda el scroll automaticamente para que la seccion se muestre en pantalla.
    fitToSectionDelay: 300, // Delay antes de acomodar la seccion automaticamente.
    easing: 'easeInOutCubic', // Funcion de tiempo de la animacion.
    scrollingSpeed: 700, // Velocidad del scroll. Valores: en milisegundos.
    css3: true, // Si usara CSS3 o javascript.
    easingcss3: 'ease-out', // Curva de velocidad del efecto.
    loopBottom: true, // Regresa a la primera seccion siempre y cuando se ya haya llegado a la ultima sección y el ususario siga scrolleando.
    // ──────────────────────────────────────────────────
    //   :::::: Barra de navegación
    // ──────────────────────────────────────────────────
    navigation: false, // Muesta la barra de navegación.
    menu: '#menu', // Menu de navegación.

    // menu de navegacion
    anchors: ['inicio', 'nosotros', 'blog', 'discusión'], // Anclas, las usamos para identificar cada seccion y poder acceder a ellas con el menu.
    navigationTooltips: ['Inicio', 'Nosotros', 'Blog', 'Discusión'], // Tooltips que mostrara por cada boton.
    showActiveTooltip: false, // Mostrar tooltip activa
    sectionsColor : ['#556B2F', '#452F6B', '#556B2F', '452F6B' ], // Color de fondo de cada seccion.
     })
     