//Definimos constantes de la pantalla y todos los botones.
const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll("button");
const calculadora = document.getElementById("calculadora");
let codigoSecretoActivado = false;
let bodyS2Active = false;


//Funcion para agregar operador si no esta repetido.
const agregarOperador = (operador) => {
  if (pantalla.value.slice(-1).match(/[+\-*/]/)) {
    pantalla.value = pantalla.value.slice(0, -1);
  }
  pantallaError(operador);
};

//Comprueba si el fondo del body es el original o el nuevo y lo cambia.
function toggleBodyBackground() {
  if (bodyS2Active) {
    document.body.style.backgroundColor = '#206fca'; // Establecer el color de fondo original
    bodyS2Active = false;
  } else {
    document.body.style.backgroundColor = '#df478e'; // Establecer el nuevo color de fondo
    bodyS2Active = true;
  }
}
//Funcion que agrega el boton pulsado sobre los mensajes de error.
function pantallaError(value) {
  if (pantalla.value == "ERROR!" || pantalla.value == "0" || pantalla.value == "NaN"||pantalla.value=="## codigo secreto ##") {
    if(pantalla.value=="0"&&value=="."){
      pantalla.value="0."
    }else{
      pantalla.value = value;
    }
  } else if (!codigoSecretoActivado) {
    pantalla.value += value;
  } else {
    codigoSecretoActivado = false;
  }
  codigoSecreto(); // Llama a la función codigoSecreto aquí
}

//Recorremos el arreglo de los botones y les asignamos el evento Listener
botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const botonPulsado = boton.value;
    //Validaciones segun el boton pulsado
    if (boton.id === "igual") {
      //Intentamos ejecutar la operacion de la pantalla, si no aparece error
      try {
        const resultado = eval(pantalla.value);
        pantalla.value = parseFloat(resultado.toFixed(3));
      } catch (error) {
        pantalla.value = "ERROR!";
      }
    } else if (boton.id === "borrar") {
      //Borramos el ultimo valor ingresado
      pantalla.value = pantalla.value.slice(0, -1);
    } else if (boton.id === "ce") {
      //Reseteamos la pantalla a un 0
      pantalla.value = "0";
    } else if (boton.id === "raiz") {
      //Calcular raiz solo si no hay un error
      if (pantalla.value != "ERROR!") {
        pantalla.value = Math.sqrt(parseFloat(pantalla.value)).toFixed(1);
      }
    } else if (boton.textContent.match(/[+\-*/]/)) {
      //Ingresamos operador solo si no esta repetido
      agregarOperador(boton.textContent);
    } else {
      //Validamos el contenido de la pantalla para agregar el boton pulsado
      pantallaError(botonPulsado);
    }
  });
});

//Funcion de las teclas presionadas que necesitamos, con sus validaciones.
const botonesInput = (key) => {
  if (key.match(/[+\-*/]/)) {
    agregarOperador(key);
  } else if (key.match(/[0-9]/)) {
    pantallaError(key);
  } else if (key === "Backspace") {
    pantalla.value = pantalla.value.slice(0, -1);
  } else if (key === "Enter" || key === "=") {
    try {
      const resultado = eval(pantalla.value);
      pantalla.value = parseFloat(resultado.toFixed(3));
    } catch (error) {
      pantalla.value = "ERROR!";
    }
  } else if (key == "c" || key == "C") {
    pantalla.value = "";
  }
};

//Listeneer al documento al presionar una tecla
document.addEventListener("keydown", (event) => {
  botonesInput(event.key);
});

//Funcion para cambiar el color de la calculadora
function codigoSecreto() {
  if (pantalla.value == "/(+)/") {
    calculadora.classList.toggle("calculadora-s2");
    document.body.classList.toggle("body-s2");
    pantalla.value = "## codigo secreto ##";
    codigoSecretoActivado = true;
    toggleBodyBackground();

  }
}