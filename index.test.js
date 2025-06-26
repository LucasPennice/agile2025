import { describe, expect, it } from "vitest";
import {
  adivinarLetra,
  mostrarProgreso,
  setearPalabraAAdivinar,
  ingresarUsuario,
  mostrarResultadoFinal,
  checkearSiTerminaPartida,
} from ".";

describe("adivinarLetra", () => {
  it("test_adivina_si_tiene_j_no_tiene", () => {
    let estadoInicial = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    estadoInicial = adivinarLetra("J", estadoInicial);

    expect(estadoInicial.ultimoIntentoCorrecto).toBe(false);
  });

  it("test_adivina_si_tiene_e_si_tiene", () => {
    let estadoInicial = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    estadoInicial = adivinarLetra("e", estadoInicial);

    expect(estadoInicial.ultimoIntentoCorrecto).toBe(true);
  });

  it("debe ser insensible a mayúsculas/minúsculas", () => {
    let estadoInicial = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
    };

    estadoInicial = adivinarLetra("e", estadoInicial);
    expect(estadoInicial.ultimoIntentoCorrecto).toBe(true);

    estadoInicial = adivinarLetra("s", estadoInicial);
    expect(estadoInicial.ultimoIntentoCorrecto).toBe(true);

    estadoInicial = adivinarLetra("j", estadoInicial);
    expect(estadoInicial.ultimoIntentoCorrecto).toBe(false);
  });

  it("test_comprobar_que_se_actualiza_letras_ya_adivinadas", () => {
    let estado = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    estado = adivinarLetra("J", estado);

    expect(estado.letrasYaIntentadas.includes("J")).toBe(true);
  });

  it("test_comprobar_que_se_actualiza_vida_si_pierde", () => {
    let estado = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      vidas: 3,
    };

    estado = adivinarLetra("Z", estado);

    expect(estado.vidas).toBe(2);
  });

  it("test_comprobar_que_no_se_repita_letra", () => {
    const estadoInicial = {
      letrasYaIntentadas: ["J"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    const estado = adivinarLetra("J", estadoInicial);

    expect(estado).toStrictEqual(estadoInicial);
  });
});

describe("adivinaPalabra", () => {
  it("test_adivina_si_tiene_j_no_tiene", () => {
    let estadoInicial = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
    };

    estadoInicial = adivinarLetra("J", estadoInicial);

    expect(estadoInicial.ultimoIntentoCorrecto).toBe(false);
  });
});

describe("mostrarProgreso", () => {
  it("test_no_se_adivino_ninguna_letra_muestra_guiones", () => {
    let estadoInicial = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
      vidas: 5,
    };

    expect(mostrarProgreso(estadoInicial)).toBe(
      `VIDAS: ${estadoInicial.vidas} - _ _ _ _ _ _ _ _`
    );
  });

  it("test_se_muestran_letras_adivinadas_y_guiones", () => {
    let estadoInicial = {
      letrasYaIntentadas: ["E", "A"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
      vidas: 5,
    };

    expect(mostrarProgreso(estadoInicial)).toBe(
      `VIDAS: ${estadoInicial.vidas} - E _ _ A _ E _ A`
    );
  });

  it("test_todas_las_letras_adivinadas_muestra_palabra_completa", () => {
    let estadoInicial = {
      letrasYaIntentadas: ["E", "S", "C", "A", "L", "R"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
      vidas: 5,
    };

    expect(mostrarProgreso(estadoInicial)).toBe(
      `VIDAS: ${estadoInicial.vidas} - E S C A L E R A`
    );
  });

  it("test_se_ignoran_mayusculas_minusculas_al_mostrar_progreso", () => {
    let estadoInicial = {
      letrasYaIntentadas: ["e", "a"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
      vidas: 5,
    };
    expect(mostrarProgreso(estadoInicial)).toBe(
      `VIDAS: ${estadoInicial.vidas} - E _ _ A _ E _ A`
    );
  });
});

describe("setearPalabraAAdivinar", () => {
  it("debe guardar la palabra a adivinar en el estado", () => {
    const estadoInicial = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    const estadoActualizado = setearPalabraAAdivinar(estadoInicial, "GATO");

    expect(estadoActualizado.palabraAAdivinar).toBe("GATO");
  });
});

describe("ingresarUsuario", () => {
  it("test_no_debe_estar_vacio", () => {
    const estado = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
    };
    const nuevoEstado = ingresarUsuario(estado, "");
    expect(nuevoEstado.username != undefined).toBe(true);
  });
  it("test_debe_ser_string", () => {
    const estado = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
    };
    const nuevoEstado = ingresarUsuario(estado, 123);
    expect(nuevoEstado.username).toBe("Usuario");
  });
});

describe("mostrarResultadoFinal", () => {
  it("test_debe_mostrar_resultados_correctos_caso_perder", () => {
    const estado = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
      vidas: 0,
    };

    const resultadoFinal = mostrarResultadoFinal(estado);

    expect(resultadoFinal).toBe(
      `¡Partida terminada! - ¡Perdiste!<br>La palabra era: ${estado.palabraAAdivinar}`
    );
  });

  it("test_debe_mostrar_resultados_correctos_caso_ganar", () => {
    const estado = {
      letrasYaIntentadas: ["E", "S", "C", "A", "L", "R"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
      vidas: 1,
    };

    const resultadoFinal = mostrarResultadoFinal(estado);

    expect(resultadoFinal).toBe(
      "¡Partida terminada! - ¡Ganaste!<br>Felicitaciones."
    );
  });

  it("test_debe_mostrar_default_si_estado_vacio", () => {
    const resultadoFinal = mostrarResultadoFinal();

    expect(resultadoFinal).toBe(
      `Error al mostrar resultado final. Estado no definido.`
    );
  });
});

describe("checkearSiTerminaPartida", () => {
  it("test_debe_terminar_la_partida_caso_perder", () => {
    const estado = {
      letrasYaIntentadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
      vidas: 0,
    };

    const estadoNuevo = checkearSiTerminaPartida(estado);

    expect(estadoNuevo.partidaTerminada).toBe(true);
  });

  it("test_debe_terminar_la_partida_caso_ganar", () => {
    const estado = {
      letrasYaIntentadas: ["E", "S", "C", "A", "L", "R"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
      vidas: 1,
    };

    const estadoNuevo = checkearSiTerminaPartida(estado);

    expect(estadoNuevo.partidaTerminada).toBe(true);
  });

  it("test_debe_terminar_la_partida_caso_estado_undefined", () => {
    const estadoNuevo = checkearSiTerminaPartida();

    expect(estadoNuevo.partidaTerminada).toBe(true);
  });
});
