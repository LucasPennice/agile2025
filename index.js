import readline from "readline";

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

async function leerCaracter() {
  const rl = readline.createInterface({
    // eslint-disable-next-line no-undef
    input: process.stdin,
    // eslint-disable-next-line no-undef
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Ingresa un carácter: ", (input) => {
      rl.close();
      if (input.length === 1) {
        resolve(input);
      } else {
        console.log("Por favor, ingresa solo un carácter.");
        resolve(null); // Retornar null si no es válido
      }
    });
  });
}

async function leerPalabra(prompt = "Ingresa una palabra: ") {
  const rl = readline.createInterface({
    // eslint-disable-next-line no-undef
    input: process.stdin,
    // eslint-disable-next-line no-undef
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${prompt}`, (input) => {
      rl.close();
      if (/^\w+$/.test(input)) {
        // Validar que sea una palabra (sin espacios)
        resolve(input);
      } else {
        console.log("Por favor, ingresa una palabra válida (sin espacios).");
        resolve(null); // Retornar null si no es válida
      }
    });
  });
}

async function iniciarPartida() {
  let estado = {
    letrasYaIntentadas: [],
    palabraAAdivinar: "",
    partidaTerminada: false,
    ultimoIntentoCorrecto: true,
    vidas: 6,
  };

  const username = await leerPalabra("Ingresa tu nombre de usuario: ");
  estado = ingresarUsuario(estado, username);

  const palabraAAdivinar = await leerPalabra("Ingresa la palabra a adivinar: ");
  estado = setearPalabraAAdivinar(estado, palabraAAdivinar);

  do {
    const input = await leerCaracter(); // Esperar hasta que el usuario ingrese un carácter
    estado = adivinarLetra(input, estado);

    console.log(mostrarProgreso(estado));

    estado = checkearSiTerminaPartida(estado);
  } while (estado.partidaTerminada == false);

  console.log(mostrarResultadoFinal(estado));
  console.log(`Gracias por jugar, ${estado.username}!`);
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
    return `¡Partida terminada! - Ganaste! - Palabra: ${
      estado.palabraAAdivinar
    }. Letras adivinadas: ${estado.letrasYaIntentadas.join(", ")}.`;

  return `¡Partida terminada! - Perdiste! - Palabra: ${
    estado.palabraAAdivinar
  }. Letras adivinadas: ${estado.letrasYaIntentadas.join(", ")}.`;
}

export function adivinarLetra(letra, estado) {
  const letraMayus = letra.toUpperCase();

  if (estado.letrasYaIntentadas.includes(letraMayus)) return { ...estado };

  // Verificar si está en la palabra
  const intentoCorrecto = estado.palabraAAdivinar.includes(letraMayus);

  return {
    ...estado,
    ultimoIntentoCorrecto: estado.palabraAAdivinar.includes(letraMayus),
    letrasYaIntentadas: [...estado.letrasYaIntentadas, letraMayus],
    vidas: intentoCorrecto ? estado.vidas : estado.vidas - 1,
  };
}

export function mostrarProgreso(estado) {
  const letras = estado.palabraAAdivinar.split("");

  return `VIDAS: ${estado.vidas} - ${letras
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

iniciarPartida();
