import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { GameTile } from './gameTile';

@Component({
  selector: 'GameTile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.css'],
  // animations: [
  //   trigger('tileStateAnimation', [
  //     // ...
  //     state('empty', style({
  //       border: '2px solid var(--color-tone-4)'
  //     })),
  //     state('tbd', style({
  //       border: ''
  //     })),
  //     transition('* => *', [
  //       animate('1s')
  //     ]),
  //   ])
  // ]
})
export class GameTileComponent implements OnInit {
  gameTile: GameTile;

  constructor() { 
    this.gameTile = new GameTile();
  }

  ngOnInit(): void {
  }

  setValue(newValue: string) {
    if (newValue.length == 0) {
      this.gameTile.value = newValue;
      this.gameTile.dataState = "empty";
      this.gameTile.dataAnimation = "idle";
    }
    else {
      this.gameTile.dataState = "tbd";
    }
  }

  setGameTileState(dataState: string, dataAnimation: string) {
    this.gameTile.dataState = dataState;
    this.gameTile.dataAnimation = dataAnimation;
  }

  resetTile() {
    this.gameTile = new GameTile();
  }
}
