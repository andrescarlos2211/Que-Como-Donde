let signup = document.querySelector(".signup");
    let login = document.querySelector(".login");
    let slider = document.querySelector(".slider");
    let formSection = document.querySelector(".form-section");
    
    signup.addEventListener("click", () => {
      slider.classList.add("moveslider");
      formSection.classList.add("form-section-move");
    });
    
    login.addEventListener("click", () => {
      slider.classList.remove("moveslider");
      formSection.classList.remove("form-section-move");
    });

// funcion para validacion de contrasenas
    function comprobarClave() {
      clave1 = document.f1.clave1.value
      clave2 = document.f1.clave2.value

      if (clave1 == clave2) {
        alert("Las dos claves son iguales...\nRealizaríamos las acciones del caso positivo")
      } else {
        alert("Las dos claves son distintas...\nRealizaríamos las acciones del caso negativo")
      }
    }