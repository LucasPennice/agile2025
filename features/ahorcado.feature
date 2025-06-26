Feature: Juego del Ahorcado

  Scenario: Iniciar partida con nombre y palabra
    Given el jugador ingresa el nombre "Franco"
    And la palabra secreta es "ESCALERA"
    Then debe mostrarse el progreso como "_ _ _ _ _ _ _ _"

 