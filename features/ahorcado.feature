Feature: Juego del Ahorcado

  Scenario: Iniciar partida con nombre y palabra
    Given el jugador ingresa el nombre "Franco"
    And la palabra secreta es "ESCALERA"
    Then debe mostrarse el progreso como "_ _ _ _ _ _ _ _"

  Scenario: Adivinar una letra correctamente
    Given el jugador ingresa el nombre "Franco"
    And la palabra secreta es "ESCALERA"
    And el jugador adivina la letra "E"
    Then debe mostrarse el progreso como "E _ _ _ _ E _ _"
    And debe mostrarse la cantidad de vidas como 6