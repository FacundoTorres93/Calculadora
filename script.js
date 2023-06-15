const botonNumero = document.querySelectorAll("[data-numero]");
const botonOperador = document.querySelectorAll("[data-operador]");
const botonBorrarTodo = document.querySelector("[data-borrar-todo]");
const botonBorrar = document.querySelector("[data-borrar]");
const botonIgual = document.querySelector("[data-igual]");
const textoValorSuperior = document.querySelector("[data-valor-superior]");
const textoValorInferior = document.querySelector("[data-valor-inferior]");

class Calculadora {
  constructor(textoValorSuperior, textoValorInferior) {
    this.textoValorInferior = textoValorInferior;
    this.textoValorSuperior = textoValorSuperior;
    this.valorInferior = "";
    this.valorSuperior = "";
    this.operador = undefined;
  }
  agregarNumero(numero) {
    if (numero === "." && this.valorInferior.includes(".")) return; // sal del programa
    this.valorInferior = this.valorInferior + numero;
  }
  imprimirDisplay() {
    this.textoValorInferior.innerText = this.valorInferior;
    this.textoValorSuperior.innerText = this.valorSuperior;
  }
  borrar() {
    this.valorInferior = this.valorInferior.slice(0, -1);
  }
  elegirOperacion(operador) {
    if (this.valorInferior == "") return; // si no hay nada retornar
    if (this.valorSuperior != "") {
      this.realizarCalculo();
    }
    this.operador = operador;
    this.valorSuperior = this.valorInferior;
    this.valorInferior = "";
  }
  realizarCalculo() {
    let resultado;
    let conversionValorSup = parseFloat(this.valorSuperior); // transformar de string a number
    let conversionValorInf = parseFloat(this.valorInferior);
    if (isNaN(conversionValorSup) || isNaN(conversionValorInf)) return;
    switch (this.operador) {
      case "+":
        resultado = conversionValorSup + conversionValorInf;
        break;
      case "-":
        resultado = conversionValorSup - conversionValorInf;
        break;
      case "*":
        resultado = conversionValorSup * conversionValorInf;
        break;
      case "÷":
        resultado = conversionValorSup / conversionValorInf;
        break;
      default:
        return;
    }

    this.valorInferior = resultado;
    this.operador = undefined;
    this.valorSuperior = "";
  }

  limpiarPantalla() {
    this.valorInferior = "";
    this.valorSuperior = "";
    this.operador = undefined;
  }
}

const calculadora = new Calculadora(textoValorSuperior, textoValorInferior);

botonNumero.forEach((boton) => {
  boton.addEventListener("click", () => {
    calculadora.agregarNumero(boton.innerText);
    calculadora.imprimirDisplay();
    //console.log(boton.innerText);
  });
});

botonBorrar.addEventListener("click", () => {
  calculadora.borrar();
  calculadora.imprimirDisplay();
});

botonOperador.forEach((boton) => {
  boton.addEventListener("click", () => {
    calculadora.elegirOperacion(boton.innerText);
    calculadora.imprimirDisplay();
  });
});

botonIgual.addEventListener("click", () => {
  calculadora.realizarCalculo();
  calculadora.imprimirDisplay();
});

botonBorrarTodo.addEventListener("click", () => {
  calculadora.limpiarPantalla();
  calculadora.imprimirDisplay();
});
