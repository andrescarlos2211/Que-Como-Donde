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
    "Producto":"Kombucha",
    "Distancia":"20",
    "Keyword1": "Fermentos",
    "Keyword2": "Bebestibles",
    "Keyword3": "Probioticos",
    "Descripción":"Vendo Kombucha variados sabores, también dispongo de Scoby por si deseas realizar la tuya. Buscame en instagram como: kokombicoCl",
    "Precio":"1500",
    "Imagen": "/img/kom.jpg"
},{
    "Producto":"Queso de cabra La pradera",
    "Distancia":"50",
    "Keyword1":"Lacteo",
    "Keyword2":"Procedencia animal",
    "Keyword3":"Artesanal",
    "Descripción":"Vendo exquisito queso de cabra madurado, realizado por artesanos de Coyaritahue",
    "Precio":"5000",
    "Imagen": "/img/quesocabra.jpg.jpeg"
},{
    "Producto":"Manzanas Organicas de mi huerto",
    "Distancia":"100",
    "Keyword1":"Frutas",
    "Keyword2":"Organicas",
    "Keyword3":"Fructosa",
    "Descripción":"Muy frescas y libres de pesticidas, tambien permuto por cosas interesantes. Comunicarse al +56987452156",
    "Precio":"1500",
    "Imagen": "/img/manzana.jpg"
},{
    "Producto":"Champiñones ¡Precios al por mayor!",
    "Distancia":"150",
    "Keyword1":"Fungi",
    "Keyword2":"Proteina",
    "Keyword3":"",
    "Descripción":"Recién cosechados, si me recomiendas te recompensare",
    "Precio":"1500",
    "Imagen": "/img/champi.jpg"
},{
    "Producto":"Lechugas hidropónicas",
    "Distancia":"300",
    "Keyword1":"Verduras",
    "Keyword2":"Hidroponia",
    "Keyword3":"",
    "Descripción":"Realizo despachos gratuitos todos los días viernes, comunicarse al +56985214532",
    "Precio":"990",
    "Imagen": "/img/lechuga-hidroponica-e1591367578551.jpg"
},{
    "Producto":"Almendras",
    "Distancia":"500",
    "Keyword1":"Frutos secos",
    "Keyword2":"Proteina vegetal",
    "Keyword3":"",
    "Descripción":"Almendras partidas a mitad de precio, APURATE! se van rápido.",
    "Precio":"750 x 100g",
    "Imagen": "/img/1.jpg"
},{
    "Producto":"Empanadas Caseras",
    "Distancia":"750",
    "Keyword1":"Vegan",
    "Keyword2":"Almidon",
    "Keyword3":"Harina refinada",
    "Descripción":"A domicilio y a pedido, disponemos de gran catalogo. Tenemos sitio web y contamos con despacho gratuito.",
    "Precio":"1500",
    "Imagen": "/img/empanadas.png"
},{
    "Producto":"La birra de Carlitos",
    "Distancia":"900",
    "Keyword1":"Cerveza",
    "Keyword2":"Artesanal",
    "Keyword3":"Todo Grano",
    "Descripción":"Ahora también disponible en tu botilleria más cercana. El catálogo de siempre más variedades únicas para que disfrutes el verdadero sabor a cerveza artesana.",
    "Precio":"2500",
    "Imagen": "/img/cerveza.jpg"
},{
    "Producto":"Pan de masa madre",
    "Distancia":"1000",
    "Keyword1":"Pan",
    "Keyword2":"Gluten",
    "Keyword3":"Fermentos",
    "Descripción":"Pan con semillas, integral, de centeno, el que te puedas imaginar. Tenemos stock diario y trabajamos a pedido.",
    "Precio":"2000",
    "Imagen": "/img/pan.jpg"
},{
    "Producto":"Queque de oregano",
    "Distancia":"1100",
    "Keyword1":"Oregano",
    "Keyword2":"Gluten",
    "Keyword3":"Libre de azucar",
    "Descripción":"Tambien tenemos de otros sabores. Me puedes encontrar en Los Alelies 1148",
    "Precio":"3000",
    "Imagen": "/img/queque.jpg"
}]



function enlistarproductos() {

    for (var i = 0; i < dataBase.length; i++) {

                let name = dataBase[i].Producto;
                let price = dataBase[i].Precio;
                let kw1 = dataBase[i].Keyword1;
                let kw2 = dataBase[i].Keyword2;
                let kw3 = dataBase[i].Keyword3;
                let distance = dataBase[i].Distancia;
                let description = dataBase[i].Descripción;
                let imagen = dataBase[i].Imagen
                document.getElementById("productscontainer").innerHTML +=  `<div class="card card-body mt-3">
                 <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                     <div class="mr-2 mb-3 mb-lg-0">
                        
                             <img src="${imagen}" width="20vw" alt="">
                       
                     </div>
                
                     <div class="media-body">
                         <h6 class="media-title font-weight-semibold">
                             <a href="#" data-abc="true">${name}</a>
                         </h6>
                
                         <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                             <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">${kw1}</a></li>
                             <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">${kw2}</a></li>
                                <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">${kw3}</a></li>
                         </ul>
                
                         <p class="mb-3">${description}</p>
                
                
                     </div>
                
                     <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                         <h3 class="mb-0 font-weight-semibold">${price} x Kilo</h3>
                
                         <div>
                             <i class="fa fa-star"></i>
                             <i class="fa fa-star"></i>
                             <i class="fa fa-star"></i>
                             <i class="fa fa-star"></i>
                             <i class="fa fa-star"></i>
                
                         </div>
                
                         <div class="text-muted">A ${distance} metros de distancia</div>
                
                     </div>
                 </div>
                 </div> `
            }
        }