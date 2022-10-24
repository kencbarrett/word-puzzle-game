import { GameButton } from "../game-button/gameButton";

export class GameKeyboard {
  currentGuess: string[] = [];
  firstRowButtons: GameButton[] = [];
  secondRowButtons: GameButton[] = [];
  thirdRowButtons: GameButton[] = [];

  constructor() {
    this.firstRowButtons = [
      new GameButton("Q"),
      new GameButton("W"),
      new GameButton("E"),
      new GameButton("R"),
      new GameButton("T"),
      new GameButton("Y"),
      new GameButton("U"),
      new GameButton("I"),
      new GameButton("O"),
      new GameButton("P")
    ];

    this.secondRowButtons = [
      new GameButton("A"),
      new GameButton("S"),
      new GameButton("D"),
      new GameButton("F"),
      new GameButton("G"),
      new GameButton("H"),
      new GameButton("J"),
      new GameButton("K"),
      new GameButton("L")
    ];

    this.thirdRowButtons = [
      new GameButton("Z"),
      new GameButton("X"),
      new GameButton("C"),
      new GameButton("V"),
      new GameButton("B"),
      new GameButton("N"),
      new GameButton("M")
    ]
  }

  reset() {
    this.currentGuess.fill("");
    this.firstRowButtons.forEach(b => b.reset());
    this.secondRowButtons.forEach(b => b.reset());
    this.thirdRowButtons.forEach(b => b.reset());
  }
}