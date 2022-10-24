import { Component, OnInit } from '@angular/core';
import { GameButton } from './gameButton';

@Component({
  selector: 'GameButton',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {
  gameButton: GameButton;

  constructor() { 
    this.gameButton = new GameButton("");
  }

  ngOnInit(): void {
  }
}
