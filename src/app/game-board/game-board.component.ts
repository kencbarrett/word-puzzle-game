import { Component, OnInit } from '@angular/core';
import { GameRow } from '../game-row/gameRow';
import { ComplexityLevel } from '../models/complexityLevel';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'GameBoard',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  isVisible: boolean;
  isDisabled: boolean;
  complexityLevels: string[] = ComplexityLevel.keys();
  gameRows: GameRow[];

  constructor(private stateService: GameStateService) { 
    this.isVisible = false;
    this.isDisabled = false;
    this.gameRows = [
      new GameRow(),
      new GameRow(),
      new GameRow(),
      new GameRow(),
      new GameRow(),
      new GameRow()
    ];
  }

  ngOnInit(): void {
  }

  toggleDifficulty() {
    if (this.isVisible)
      return "collapse show";
    else
      return "collapse";
  }
  
  updateDifficulty(newDifficulty: string) {
    console.log("newDifficulty is " + newDifficulty);

    switch (newDifficulty) {
      case "Medium":
        this.stateService.setComplexityLevel(ComplexityLevel.Medium);
        break;
    
        case "Hard":
          this.stateService.setComplexityLevel(ComplexityLevel.Hard);
          break;
  
        default:
          this.stateService.setComplexityLevel(ComplexityLevel.Easy);
          break;
    }

   this.setVisibility();
  }

  currentDifficulty() {
    if (this.stateService.complexity == ComplexityLevel.Easy)
      return "Easy";
    
    if (this.stateService.complexity == ComplexityLevel.Medium)
      return "Medium";
    else  
      return "Hard";
  }

  setVisibility() {
    console.log("isVisible = " + this.isVisible);
    this.isVisible = !this.isVisible;
    console.log("isVisible = " + this.isVisible);
  }

  startGame() {

  }
}
