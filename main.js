import {
  estadoInicial,
  ingresarUsuario,
  setearPalabraAAdivinar,
  adivinarLetra,
  //está de más - checkearSiTerminaPartida,
  mostrarResultadoFinal,
  mostrarLetrasYaIntentadas,
} from "./index.js";

let estado = estadoInicial();

const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const progresoPre = document.getElementById("progreso");
const letrasIntentadas = document.getElementById("letrasIntentadas");
const vidasRestantes = document.getElementById("vidasRestantes");
const mensajeDiv = document.getElementById("mensaje");
const inputLetra = document.getElementById("inputLetra");
const intentarBtn = document.getElementById("intentarBtn");
const reiniciarBtn = document.getElementById("reiniciarBtn");
const usernameInput = document.getElementById("username");
const palabraInput = document.getElementById("palabra");
const startBtn = document.getElementById("startBtn");

function actualizarUI() {
  progresoPre.textContent = mostrarLetrasYaIntentadas(estado);

  letrasIntentadas.innerHTML = "";

  estado.letrasYaIntentadas.forEach((letra) => {
    const pill = document.createElement("span");
    pill.textContent = letra;
    pill.classList.add("pill");
    pill.style.backgroundColor = estado.palabraAAdivinar.includes(letra)
      ? "rgba(0, 216, 163, 0.6)"
      : "rgba(255, 0, 0, 0.3)";
    letrasIntentadas.appendChild(pill);
  });

  vidasRestantes.textContent = `Vidas restantes: ${estado.vidas}`;

  if (estado.partidaTerminada) {
    mensajeDiv.innerHTML = mostrarResultadoFinal(estado);
    intentarBtn.disabled = true;
    inputLetra.disabled = true;
  } else {
    mensajeDiv.textContent = "";
    intentarBtn.disabled = false;
    inputLetra.disabled = false;
  }
  inputLetra.value = "";
  inputLetra.focus();
}

startBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const palabra = palabraInput.value.trim();

  if (!username) {
    alert("Ingresa un nombre de usuario");
    return;
  }

  if (!/^[a-zA-Z]+$/.test(palabra)) {
    alert("Ingresa una palabra válida (solo letras, sin espacios)");
    return;
  }

  //está demás - estado = estadoInicial();
  estado = ingresarUsuario(estado, username);
  estado = setearPalabraAAdivinar(estado, palabra);
  estado.partidaTerminada = false;

  setupDiv.style.display = "none";
  gameDiv.style.display = "block";

  actualizarUI();
});

intentarBtn.addEventListener("click", () => {
  const letra = inputLetra.value.trim();
  if (!/^[a-zA-Z]$/.test(letra)) {
    alert("Ingresa solo una letra válida");
    inputLetra.value = "";
    return;
  }
  estado = adivinarLetra(letra, estado);

  actualizarUI();
});

inputLetra.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputLetra.value.trim() !== "") {
    intentarBtn.click();
  }
});

reiniciarBtn.addEventListener("click", () => {
  estado = estadoInicial();
  setupDiv.style.display = "block";
  gameDiv.style.display = "none";
  mensajeDiv.textContent = "";
  usernameInput.value = "";
  palabraInput.value = "";
  inputLetra.value = "";
});
