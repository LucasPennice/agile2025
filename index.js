const PALABRA_A_ADIVINAR = "ESCALERA";

export function adivinarLetra(letra, letrasYaAdivinadas = []) {
  // if (letra  === "j"  letra === "J") return false

  // if (letra  === "e"  letra === "E") return false

  const primeraAdivinanza = letrasYaAdivinadas.length === 0;

  if (!primeraAdivinanza)
    return letrasYaAdivinadas.find((x) => x === letra) !== undefined;

  return PALABRA_A_ADIVINAR.split("").find((x) => x === letra) !== undefined;
}
