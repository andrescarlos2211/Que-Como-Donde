const initApp = () => {
    const hamburgerBtn = document.getElementById('hamburger-button')
    const mobileMenu = document.getElementById('mobile-menu')

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden')
        mobileMenu.classList.toggle('flex')
        hamburgerBtn.classList.toggle('toggle-btn')
    }

    hamburgerBtn.addEventListener('click', toggleMenu)
    mobileMenu.addEventListener('click', toggleMenu)
}

document.addEventListener('DOMContentLoaded', initApp)

// Base de datos y manejo de DOM

let dataBase = [{
    "Producto": "Kombucha",
    "Distancia": "20",
    "Keyword1": "Fermentos",
    "Keyword2": "Bebestibles",
    "Keyword3": "Probioticos",
    "Descripción": "Vendo Kombucha variados sabores, también dispongo de Scoby por si deseas realizar la tuya. Buscame en instagram como: kokombicoCl",
    "Precio": "1500",
    "Imagen": "/img/kom.jpg",
    slug: "/catalogo.html"
}, {
    "Producto": "Queso de cabra La pradera",
    "Distancia": "50",
    "Keyword1": "Lacteo",
    "Keyword2": "Procedencia animal",
    "Keyword3": "Artesanal",
    "Descripción": "Vendo exquisito queso de cabra madurado, realizado por artesanos de Coyaritahue",
    "Precio": "5000",
    "Imagen": "/img/quesocabra.jpg.jpeg",
    slug: "/catalogo.html"
}, {
    "Producto": "Manzanas Organicas de mi huerto",
    "Distancia": "100",
    "Keyword1": "Frutas",
    "Keyword2": "Organicas",
    "Keyword3": "Fructosa",
    "Descripción": "Muy frescas y libres de pesticidas, tambien permuto por cosas interesantes. Comunicarse al +56987452156",
    "Precio": "1500",
    "Imagen": "/img/manzana.jpg",
    slug: "/catalogo.html"
}, {
    "Producto": "Champiñones ¡Precios al por mayor!",
    "Distancia": "150",
    "Keyword1": "Fungi",
    "Keyword2": "Proteina",
    "Keyword3": "",
    "Descripción": "Recién cosechados, si me recomiendas te recompensare",
    "Precio": "1500",
    "Imagen": "/img/champi.jpg",
    slug: "/catalogo.html"
}, {
    "Producto": "Lechugas hidropónicas",
    "Distancia": "300",
    "Keyword1": "Verduras",
    "Keyword2": "Hidroponia",
    "Keyword3": "",
    "Descripción": "Realizo despachos gratuitos todos los días viernes, comunicarse al +56985214532",
    "Precio": "990",
    "Imagen": "/img/lechuga-hidroponica-e1591367578551.jpg",
    slug: "/catalogo.html"
}, {
    "Producto": "Almendras",
    "Distancia": "500",
    "Keyword1": "Frutos secos",
    "Keyword2": "Proteina vegetal",
    "Keyword3": "",
    "Descripción": "Almendras partidas a mitad de precio, APURATE! se van rápido.",
    "Precio": "750 x 100g",
    "Imagen": "/img/1.jpg",
    slug: "/catalogo.html"
}, {
    "Producto": "Empanadas Caseras",
    "Distancia": "750",
    "Keyword1": "Vegan",
    "Keyword2": "Almidon",
    "Keyword3": "Harina refinada",
    "Descripción": "A domicilio y a pedido, disponemos de gran catalogo. Tenemos sitio web y contamos con despacho gratuito.",
    "Precio": "1500",
    "Imagen": "/img/empanadas.png",
    slug: "/catalogo.html"
}, {
    "Producto": "La birra de Carlitos",
    "Distancia": "900",
    "Keyword1": "Cerveza",
    "Keyword2": "Artesanal",
    "Keyword3": "Todo Grano",
    "Descripción": "Ahora también disponible en tu botilleria más cercana. El catálogo de siempre más variedades únicas para que disfrutes el verdadero sabor a cerveza artesana.",
    "Precio": "2500",
    "Imagen": "/img/cerveza.jpg",
    slug: "/catalogo.html"
}, {
    "Producto": "Pan de masa madre",
    "Distancia": "1000",
    "Keyword1": "Pan",
    "Keyword2": "Gluten",
    "Keyword3": "Fermentos",
    "Descripción": "Pan con semillas, integral, de centeno, el que te puedas imaginar. Tenemos stock diario y trabajamos a pedido.",
    "Precio": "2000",
    "Imagen": "/img/pan.jpg",
    slug: "/catalogo.html"
}, {
    "Producto": "Queque de oregano",
    "Distancia": "1100",
    "Keyword1": "Oregano",
    "Keyword2": "Gluten",
    "Keyword3": "Libre de azucar",
    "Descripción": "Tambien tenemos de otros sabores. Me puedes encontrar en Los Alelies 1148",
    "Precio": "3000",
    "Imagen": "/img/queque.jpg",
    slug: "./catalogo.html"
}]



// function autocompletado() {
//     var pal = document.getElementById("buscar-pal").value;
//     document.getElementById("demo").innerHTML = '';
//     if (pal.length > 0) {
//         var html = '';
//         dataBase.forEach(function (element) {
//             let posicion = element.Producto.toLowerCase().indexOf(pal.toLowerCase());
//             if (posicion !== -1)
//                 html += "<li class='list-group-item'><a href='/" + element.slug + "'>" + element.Producto + "</a></li>";
//         })
//         document.getElementById("demo").innerHTML = html;
//     }
// }


dataBase.Producto


window.addEventListener('scroll', function () {
    var scrollIndicator = document.getElementById('scroll-indicator');
    if (window.scrollY > 0) {
        scrollIndicator.classList.add('hide');
    } else {
        scrollIndicator.classList.remove('hide');
    }
});
