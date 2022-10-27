import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'GameButton',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {
  @Input('value') value: string;
  currentState: string;

  constructor() { 
    this.value = "";
    this.currentState = "";
  }

  ngOnInit(): void {
  }

  setCurrentState(currentState: string) {
    this.currentState = currentState;
  }

  reset() {
    this.currentState = "";
  }
}
