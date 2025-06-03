const PALABRA_A_ADIVINAR = "ESCALERA";

export function adivinarLetra(letra, letrasYaAdivinadas = []) {
  const letraMayus = letra.toUpperCase();

  // Ya fue adivinada
  if (letrasYaAdivinadas.includes(letraMayus)) return false;

  // Verificar si está en la palabra
  return PALABRA_A_ADIVINAR.includes(letraMayus);
}

export function mostrarProgreso(palabra, letrasAdivinadas) {
  const letras = palabra.split("");

  return letras
    .map((letra) =>
      letrasAdivinadas.map(l => l.toUpperCase()).includes(letra.toUpperCase())
        ? letra.toUpperCase()
        : "_"
    )
    .join(" ");
}