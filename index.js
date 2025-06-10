/**
 * Inicial partida ()
 * Ingresar usuario (estado,string) -> (estadoActualizado)
 * Setear palabra a adivinar (estado,string) -> (estadoActualizado)
 * Loop {
 *  Adivinar letra ⚠️ (letra, letras adivinadas, estado) -> (estadoActualizado)
 *  Mostrar resultado parcial ⚠️ (estado) -> ()
 *  Checkear si termina la partida (estado) -> ()
 * }
 * Mostrar resultado final (estado) -> ()
 */

const PALABRA_A_ADIVINAR = "ESCALERA";
/* 
function iniciarPartida() {
  let estado = {
    letrasYaAdivinadas: [],
    palabraAAdivinar: "",
    partidaTerminada: false,
    ultimoIntentoCorrecto: true
  };

  estado = ingresarUsuario(estado);
  /*estado = setearPalabraAAdivinar(estado);

  do {
    estado = adivinarLetra("A", estado);
    mostrarProgresoMigrar(estado);
    estado.partidaTerminada = checkearSiTerminaPartida(estado);
    estado.partidaTerminada = false; // Reset para el ejemplo
  } while (estado.partidaTerminada == false);

  mostrarResultadoFinal(estado);*/
//}

export function ingresarUsuario(estado, username) {
  if (typeof username !== "string" && username !== "")
    return {
      ...estado,
      username: "Usuario",
    };
  return {
    ...estado,
    username,
  };
}

export function mostrarProgresoMigrar() {}
export function checkearSiTerminaPartida() {}
export function mostrarResultadoFinal() {}

//iniciarPartida();

export function adivinarLetra(letra, estado) {
  const letraMayus = letra.toUpperCase();

  // Ya fue adivinada
  if (estado.letrasYaAdivinadas.includes(letraMayus))
    return { ...estado, ultimoIntentoCorrecto: false };

  // Verificar si está en la palabra
  return {
    ...estado,
    ultimoIntentoCorrecto: PALABRA_A_ADIVINAR.includes(letraMayus),
  };
}

export function mostrarProgreso(estado) {
  const letras = estado.palabraAAdivinar.split("");

  return letras
    .map((letra) =>
      estado.letrasYaAdivinadas
        .map((l) => l.toUpperCase())
        .includes(letra.toUpperCase())
        ? letra.toUpperCase()
        : "_"
    )
    .join(" ");
}

export function setearPalabraAAdivinar(estado, palabra = "ESCALERA") {
  return {
    ...estado,
    palabraAAdivinar: palabra,
  };
}
