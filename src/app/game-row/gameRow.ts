import { GameTile } from "../game-tile/gameTile";

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
}
