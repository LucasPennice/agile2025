import { describe, expect, it } from "vitest";
import { adivinarLetra, mostrarProgreso, setearPalabraAAdivinar } from ".";

describe("adivinarLetra", () => {
  it("test_adivina_si_tiene_j_no_tiene", () => {
    expect(adivinarLetra("J")).toBe(false);
  });

  it("test_adivina_si_tiene_e_si_tiene", () => {
    expect(adivinarLetra("E")).toBe(true);
  });

  it("test_no_se_puede_repetir_la_misma_letra", () => {
    const letrasYaAdivinadas = ["E", "D"];

    expect(adivinarLetra("E", letrasYaAdivinadas)).toBe(false);
  });

  it("debe ser insensible a mayúsculas/minúsculas", () => {
    expect(adivinarLetra("e")).toBe(true);
    expect(adivinarLetra("s")).toBe(true);
    expect(adivinarLetra("j")).toBe(false);
  });
});

describe("adivinaPalabra", () => {
  it("test_adivina_si_tiene_j_no_tiene", () => {
    expect(adivinarLetra("J")).toBe(false);
  });
});

describe("mostrarProgreso", () => {
  it("test_no_se_adivino_ninguna_letra_muestra_guiones", () => {
    const resultado = mostrarProgreso("ESCALERA", []);
    expect(resultado).toBe("_ _ _ _ _ _ _ _");
  });
  it("test_se_muestran_letras_adivinadas_y_guiones", () => {
    const resultado = mostrarProgreso("ESCALERA", ["E", "A"]);
    expect(resultado).toBe("E _ _ A _ E _ A");
  });

  it("test_todas_las_letras_adivinadas_muestra_palabra_completa", () => {
    const letras = Array.from(new Set("ESCALERA".split("")));
    const resultado = mostrarProgreso("ESCALERA", letras);
    expect(resultado).toBe("E S C A L E R A");
  });

  it("test_se_ignoran_mayusculas_minusculas_al_mostrar_progreso", () => {
    const resultado = mostrarProgreso("ESCALERA", ["e", "a"]);
    expect(resultado).toBe("E _ _ A _ E _ A");
  });
});
describe("setearPalabraAAdivinar", () => {
    it("debe guardar la palabra a adivinar en el estado", () => {
      const estadoInicial = {
        letrasAdivinadas: [],
        palabraAAdivinar: "",
        partidaTerminada: false,
      };

      const estadoActualizado = setearPalabraAAdivinar(estadoInicial, "GATO");

      expect(estadoActualizado.palabraAAdivinar).toBe("GATO");
    });
  });

