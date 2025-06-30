export function estadoInicial() {
  return {
    letrasYaIntentadas: [],
    palabraAAdivinar: "",
    partidaTerminada: false,
    ultimoIntentoCorrecto: true,
    vidas: 6,
    username: "Usuario",
  };
}

export function ingresarUsuario(estado, username) {
  if (typeof username !== "string" || username.trim() === "")
    return {
      ...estado,
      username: "Usuario",
    };

  return {
    ...estado,
    username,
  };
}

export function checkearSiTerminaPartida(estado) {
  if (estado === undefined) return { ...estado, partidaTerminada: true };

  if (estado.vidas <= 0) return { ...estado, partidaTerminada: true };

  for (const letra of estado.palabraAAdivinar) {
    if (!estado.letrasYaIntentadas.includes(letra.toUpperCase()))
      return { ...estado, partidaTerminada: false };
  }

  return { ...estado, partidaTerminada: true };
}

export function mostrarResultadoFinal(estado) {
  if (estado === undefined)
    return "Error al mostrar resultado final. Estado no definido.";

  if (estado.vidas > 0)
    return "¡Partida terminada! - ¡Ganaste!<br>Felicitaciones.";

  return `¡Partida terminada! - ¡Perdiste!<br>La palabra era: ${estado.palabraAAdivinar}`;
}

export function adivinarLetra(letra, estado) {
  if (estado.partidaTerminada) return estado;

  const letraMayus = letra.toUpperCase();

  if (estado.letrasYaIntentadas.includes(letraMayus)) return { ...estado };

  const intentoCorrecto = estado.palabraAAdivinar.includes(letraMayus);
  const nuevasVidas = intentoCorrecto ? estado.vidas : estado.vidas - 1;

  const nuevoEstado = {
    ...estado,
    ultimoIntentoCorrecto: intentoCorrecto,
    letrasYaIntentadas: [...estado.letrasYaIntentadas, letraMayus],
    vidas: nuevasVidas,
  };

  return checkearSiTerminaPartida(nuevoEstado);
}

export function mostrarProgreso(estado) {
  return `${mostrarVidas(estado)} - ${mostrarLetrasYaIntentadas(estado)}`;
}

export function mostrarVidas(estado) {
  if (estado === undefined)
    return "Error al mostrar vidas. Estado no definido.";
  return `VIDAS: ${estado.vidas}`;
}

export function mostrarLetrasYaIntentadas(estado) {
  if (estado === undefined)
    return "Error al mostrar letras ya intentadas. Estado no definido.";

  const letras = estado.palabraAAdivinar.split("");

  return `${letras
    .map((letra) =>
      estado.letrasYaIntentadas
        .map((l) => l.toUpperCase())
        .includes(letra.toUpperCase())
        ? letra.toUpperCase()
        : "_"
    )
    .join(" ")}`;
}

export function setearPalabraAAdivinar(estado, palabra = "ESCALERA") {
  return {
    ...estado,
    palabraAAdivinar: palabra.toUpperCase(),
  };
}
