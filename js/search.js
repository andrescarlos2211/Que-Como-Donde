const contenido = [
    {nombre:"Manzanas",slug:"catalogo.html"},
    {nombre:"Queso",slug:"catalogo.html"},
    {nombre:"Champiñones",slug:"catalogo.html"},
    {nombre:"Maceteros",slug:"catalogo.html"},
    {nombre:"Colaciones",slug:"catalogo.html"},
    {nombre:"Lechugas",slug:"catalogo.html"},
    {nombre:"Fitocosmetica",slug:"catalogo.html"},
    {nombre:"Verduras a domicilio",slug:"catalogo.html"},
    {nombre:"Frutos secos",slug:"catalogo.html"},
    {nombre:"Almendras",slug:"catalogo.html"},
    {nombre:"Dátiles",slug:"catalogo.html"},
    {nombre:"Nueces",slug:"catalogo.html"},
    {nombre:"te organico",slug:"catalogo.html"},
    {nombre:"Pan de masa madre",slug:"catalogo.html"},
    {nombre:"kombucha",slug:"catalogo.html"},
    {nombre:"Merken",slug:"catalogo.html"},
    {nombre:"Muebleria",slug:"catalogo.html"},
    {nombre:"Queque de oregano",slug:"catalogo.html"},
    {nombre:"Chocolate Vegano",slug:"catalogo.html"},
    {nombre:"Empanadas caseras",slug:"catalogo.html"},
    {nombre:"Aloe vera",slug:"catalogo.html"},
    {nombre:"Zuelas de cañamo",slug:"catalogo.html"},
    {nombre:"Seitan",slug:"catalogo.html"},
    {nombre:"Romero",slug:"rocatalogo.htmlmero"}

]

function autocompletado () {            
    var pal = document.getElementById("buscar-pal").value;
    document.getElementById("demo").innerHTML = '';
    if(pal.length>0){                
        var html='';
        contenido.forEach(function(element) {
            let posicion = element.nombre.toLowerCase().indexOf(pal.toLowerCase());
            if (posicion !== -1)
                html += "<li class='list-group-item'><a href='/"+element.slug+"'>"+element.nombre+"</a></li>";
        })
        document.getElementById("demo").innerHTML = html ;
    }
}
