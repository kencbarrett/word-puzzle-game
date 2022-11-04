import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'GameButton',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {
  @Input('value') value: string;
  @Input('currentState') currentState: string;

  constructor() { 
    this.value = "";
    this.currentState = "absent";
  }

  ngOnInit(): void {
  }

  reset() {
    this.currentState = "absent";
  }
}
