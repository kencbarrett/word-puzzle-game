import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GameTileComponent } from '../game-tile/game-tile.component';
import { EvaluatedWord } from '../models/evaluatedWord';

@Component({
  selector: 'GameRow',
  templateUrl: './game-row.component.html',
  styleUrls: ['./game-row.component.css']
})
export class GameRowComponent implements OnInit {
  @ViewChildren(GameTileComponent) gameTiles: QueryList<any> | undefined;

  ngOnInit(): void {
  }

  reset() {
    this.gameTiles?.forEach(gt => gt.reset());
  }

  winner() {
    this.gameTiles?.forEach(gt => gt.updateTileState("correct", "win"));
  }

  invalidWord() {
    this.gameTiles?.forEach(gt => gt.updateTileState("invalid", "invalid"));
  }

  updateTiles(evaluatedWord: EvaluatedWord) {
    this.gameTiles?.forEach(tile => {
      tile.updateTileState("absent", "flip-out");
    });

    evaluatedWord.correctLetters.forEach(cl => {
      this.gameTiles?.get(cl.position).updateTileState("correct", "flip-out");
    });

    evaluatedWord.presentLetters.forEach(pl => {
      this.gameTiles?.get(pl.position).updateTileState("present", "flip-out");
    });
  }
}
