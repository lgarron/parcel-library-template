import {SwappableInverter} from "../../";

var inverter = new SwappableInverter("R U R'");
function displayAlg() {
  document.getElementById("alg").textContent = inverter.getAlg();
}

function set() {
  try {
    const algInput = document.getElementById("alg-input") as HTMLInputElement;
    inverter.swap(algInput.value);
    document.getElementById("error").textContent = "";
    displayAlg();
  } catch (e) {
    document.getElementById("error").textContent = e;
  }
}

function invert() {
  inverter.invert();
  displayAlg();
}

window.addEventListener("DOMContentLoaded", () => {
  displayAlg();
  document.querySelector("#set").addEventListener("click", set);
  document.querySelector("#invert").addEventListener("click", invert);
})
