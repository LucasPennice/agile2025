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

  Scenario: El jugador falla una letra
    Given el jugador ingresa el nombre "Franco"
    And la palabra secreta es "ESCALERA"
    And el jugador adivina la letra "Z"
    Then debe mostrarse el progreso como "_ _ _ _ _ _ _ _"
    And debe mostrarse la cantidad de vidas como 5

  Scenario: El jugador gana la partida
    Given el jugador ingresa el nombre "Franco"
    And la palabra secreta es "A"
    And el jugador adivina la letra "A"
    Then debe mostrarse el progreso como "A"
    And debe mostrarse el mensaje final como "¡Partida terminada! - ¡Ganaste!Felicitaciones."
    And debe mostrarse la cantidad de vidas como 6
  
  Scenario: El jugador pierde la partida
    Given el jugador ingresa el nombre "Franco"
    And la palabra secreta es "Z"
    And el jugador adivina la letra "A"
    And el jugador adivina la letra "B"
    And el jugador adivina la letra "C"
    And el jugador adivina la letra "D"
    And el jugador adivina la letra "E"
    And el jugador adivina la letra "F"
    Then debe mostrarse el progreso como "_"
    And debe mostrarse el mensaje final como "¡Partida terminada! - ¡Perdiste!La palabra era: Z"
    And debe mostrarse la cantidad de vidas como 0