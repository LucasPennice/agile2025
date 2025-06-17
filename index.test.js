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
      letrasYaAdivinadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    estadoInicial = adivinarLetra("J", estadoInicial);

    expect(estadoInicial.ultimoIntentoCorrecto).toBe(false);
  });

  it("test_adivina_si_tiene_e_si_tiene", () => {
    let estadoInicial = {
      letrasYaAdivinadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    estadoInicial = adivinarLetra("e", estadoInicial);

    expect(estadoInicial.ultimoIntentoCorrecto).toBe(true);
  });

  it("test_no_se_puede_repetir_la_misma_letra", () => {
    let estadoInicial = {
      letrasYaAdivinadas: ["E", "D"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
    };

    estadoInicial = adivinarLetra("E", estadoInicial);
    expect(estadoInicial.ultimoIntentoCorrecto).toBe(false);
  });

  it("debe ser insensible a mayúsculas/minúsculas", () => {
    let estadoInicial = {
      letrasYaAdivinadas: [],
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
});

describe("adivinaPalabra", () => {
  it("test_adivina_si_tiene_j_no_tiene", () => {
    let estadoInicial = {
      letrasYaAdivinadas: [],
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
      letrasYaAdivinadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
    };

    expect(mostrarProgreso(estadoInicial)).toBe("_ _ _ _ _ _ _ _");
  });

  it("test_se_muestran_letras_adivinadas_y_guiones", () => {
    let estadoInicial = {
      letrasYaAdivinadas: ["E", "A"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
    };

    expect(mostrarProgreso(estadoInicial)).toBe("E _ _ A _ E _ A");
  });

  it("test_todas_las_letras_adivinadas_muestra_palabra_completa", () => {
    let estadoInicial = {
      letrasYaAdivinadas: ["E", "S", "C", "A", "L", "R"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
    };

    expect(mostrarProgreso(estadoInicial)).toBe("E S C A L E R A");
  });

  it("test_se_ignoran_mayusculas_minusculas_al_mostrar_progreso", () => {
    let estadoInicial = {
      letrasYaAdivinadas: ["e", "a"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      ultimoIntentoCorrecto: true,
    };
    expect(mostrarProgreso(estadoInicial)).toBe("E _ _ A _ E _ A");
  });
});

describe("setearPalabraAAdivinar", () => {
  it("debe guardar la palabra a adivinar en el estado", () => {
    const estadoInicial = {
      letrasYaAdivinadas: [],
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
      letrasYaAdivinadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
    };
    const nuevoEstado = ingresarUsuario(estado, "");
    expect(nuevoEstado.username != undefined).toBe(true);
  });
  it("test_debe_ser_string", () => {
    const estado = {
      letrasYaAdivinadas: [],
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
      letrasYaAdivinadas: [],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
      vidas: 0,
    };

    const resultadoFinal = mostrarResultadoFinal(estado);

    expect(resultadoFinal).toBe(
      `¡Partida terminada! - Perdiste! - Palabra: ${
        estado.palabraAAdivinar
      }. Letras adivinadas: ${estado.letrasYaAdivinadas.join(", ")}.`
    );
  });

  it("test_debe_mostrar_resultados_correctos_caso_ganar", () => {
    const estado = {
      letrasYaAdivinadas: ["E", "S", "C", "A", "L", "R"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
      vidas: 1,
    };

    const resultadoFinal = mostrarResultadoFinal(estado);

    expect(resultadoFinal).toBe(
      `¡Partida terminada! - Ganaste! - Palabra: ${
        estado.palabraAAdivinar
      }. Letras adivinadas: ${estado.letrasYaAdivinadas.join(", ")}.`
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
      letrasYaAdivinadas: [],
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
      letrasYaAdivinadas: ["E", "S", "C", "A", "L", "R"],
      palabraAAdivinar: "ESCALERA",
      partidaTerminada: false,
      username: undefined,
      vidas: 1,
    };

    const estadoNuevo = checkearSiTerminaPartida(estado);

    expect(estadoNuevo.partidaTerminada).toBe(false);
  });
});
