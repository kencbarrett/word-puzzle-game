import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { GameTile } from './gameTile';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'GameTile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.css']
})

export class GameTileComponent implements OnInit {

  gameTile: GameTile;

  constructor() { 
    this.gameTile = new GameTile();
  }

  ngOnInit(): void {
  }
}
