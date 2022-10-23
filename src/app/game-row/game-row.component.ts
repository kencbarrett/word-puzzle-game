import { Component, OnInit } from '@angular/core';
import { GameRow } from './gameRow';

@Component({
  selector: 'GameRow',
  templateUrl: './game-row.component.html',
  styleUrls: ['./game-row.component.css']
})
export class GameRowComponent implements OnInit {

  gameRow: GameRow;

  constructor() { 
    this.gameRow = new GameRow();
  }

  ngOnInit(): void {
  }

}
