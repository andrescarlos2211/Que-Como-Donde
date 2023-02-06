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




  axios.get('https://www.quecomodonde.ml/js/Productos.json')
  .then(response => {
    // aquí puedes usar los datos del archivo JSON
    console.log(response.data);
  })
  .catch(error => {
    // maneja el error aquí
    console.error(error);
  });

// `<div class="card card-body mt-3">
// <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
//     <div class="mr-2 mb-3 mb-lg-0">
        
//             <img src="/img/quesocabra.jpg.jpeg" width="20vw" alt="">
       
//     </div>

//     <div class="media-body">
//         <h6 class="media-title font-weight-semibold">
//             <a href="#" data-abc="true">Queso de cabra "La pradera"</a>
//         </h6>

//         <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
//             <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">Queso</a></li>
//             <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">Extracción animal</a></li>
//         </ul>

//         <p class="mb-3">Vendo exquisito queso de cabra madurado, realizado por artesanos de Coyaritahue </p>


//     </div>

//     <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
//         <h3 class="mb-0 font-weight-semibold">$5000 x Kilo</h3>

//         <div>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>

//         </div>

//         <div class="text-muted">A 100 Metros de ti</div>

//     </div>
// </div>
// </div> `