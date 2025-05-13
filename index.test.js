import { afterAll, afterEach, describe, expect, it, vi, vitest } from "vitest";
import { beforeEach } from "vitest";
import { adivinarLetra } from ".";

describe("adivinarLetra", () => {
  it("test_adivina_si_tiene_j_no_tiene", () => {
    expect(adivinarLetra("J")).toBe(false);
  });

  it("test_adivina_si_tiene_e_si_tiene", () => {
    expect(adivinarLetra("E")).toBe(true);
  });

  it("test_no_se_puede_repetir_la_misma_letra", () => {
    const letrasYaAdivinadas = ["E", "D"];

    expect(adivinarLetra("E", letrasYaAdivinadas)).toBe(true);
  });
});

describe("adivinaPalabra", () => {
  it("test_adivina_si_tiene_j_no_tiene", () => {
    expect(adivinarLetra("J")).toBe(false);
  });
});
