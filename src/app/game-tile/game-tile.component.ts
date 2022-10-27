import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'GameTile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.css']
})

export class GameTileComponent implements OnInit {
  @Input('value') value: string;
  dataState: string;
  dataAnimation: string;

  constructor() {
    this.value = "";
    this.dataState = "empty";
    this.dataAnimation = "idle"
  }

  ngOnInit(): void {
  }

  updateTileValue(newValue: string) {
    this.value = newValue;
  }

  updateTileState(newDataState: string, newDataAnimation: string) {
    this.dataState = newDataState;
    this.dataAnimation = newDataAnimation;
  }

  reset() {
    this.value = "";
    this.dataState = "empty";
    this.dataAnimation = "idle";
  }
}
