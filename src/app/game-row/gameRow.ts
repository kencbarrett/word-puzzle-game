import { GameTile } from "../game-tile/gameTile";
import { EvaluatedWord } from "../models/evaluatedWord";

export class GameRow {
  gameTiles: GameTile[];

  constructor() {
    this.gameTiles = [
      new GameTile(),
      new GameTile(),
      new GameTile(),
      new GameTile(),
      new GameTile()
    ]
  }

  winner() {
    this.gameTiles.forEach(tile => {
      tile.setGameTileState("correct", "win");
    })
  }

  invalidWord() {
    this.gameTiles.forEach(tile => {
      tile.setGameTileState("invalid", "invalid");
    })
  }

  updateGameTiles(evaluatedWord: EvaluatedWord) {
    var correctLetters = evaluatedWord.correctLetters;
    var presentLetters = evaluatedWord.presentLetters;

    this.gameTiles.forEach(gt => {
      gt.setGameTileState("absent", "flip-out");
    });

    evaluatedWord.correctLetters.forEach(cl => {
      this.gameTiles[cl.position].setGameTileState("correct", "flip-out");
    });

    evaluatedWord.presentLetters.forEach(pl => {
      this.gameTiles[pl.position].setGameTileState("present", "flip-out");
    });
  }

  reset() {
    this.gameTiles.forEach(tile => {
      tile.reset();
    })
  }
}
