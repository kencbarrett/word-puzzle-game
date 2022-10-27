import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GameTileComponent } from '../game-tile/game-tile.component';

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
}
