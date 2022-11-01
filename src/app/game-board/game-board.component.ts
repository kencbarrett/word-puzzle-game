import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComplexityLevel } from '../models/complexityLevel';
import { GameEngineService } from '../services/game-engine.service';
import { GameStateService } from '../services/game-state.service';
import { ToastrService } from 'ngx-toastr';
import { GameRowComponent } from '../game-row/game-row.component';
import { GameKeyboardComponent } from '../game-keyboard/game-keyboard.component';

@Component({
  selector: 'GameBoard',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @ViewChildren(GameRowComponent) gameRows: QueryList<any> | undefined;
  @ViewChild(GameKeyboardComponent) keyboard: any | undefined;

  isVisible: boolean;
  isDisabled: boolean;
  complexityLevels: string[] = ComplexityLevel.keys();

  constructor(private gameEngineService: GameEngineService,
              private stateService: GameStateService,
              private toastr: ToastrService) { 
    this.isVisible = false;
    this.isDisabled = false;
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
    return ComplexityLevel.keys().at(this.stateService.complexity.valueOf());
  }

  setVisibility() {
    console.log("isVisible = " + this.isVisible);
    this.isVisible = !this.isVisible;
    console.log("isVisible = " + this.isVisible);
  }

  startGame() {
    // reset the game
    this.resetGame();

    // prevent user from changing difficulty after starting the game.
    this.isDisabled = !this.isDisabled;

    this.gameEngineService.startGame(this.stateService.complexity);

    if (this.gameEngineService.playerStatistics.totalGamesPlayed == 0)
    {
        //ShowHowToPlayModal();
    }
  }

  resetGame() {
    if (this.stateService.currentGuess > 0)
    {
      this.stateService.resetCurrentColumn();
      this.stateService.resetCurrentGuess();
      this.stateService.resetGuessCount();
      this.stateService.resetComplexityLevel();

      // reset the keyboard
      this.keyboard.reset();

      this.gameRows?.forEach(gr => { gr.reset() });
    }
  }

  nextLetter(eventData: string ) {
    if (this.gameEngineService.gameInProgress)
    {
        if (this.stateService.currentColumn < 5)
        {
          var gameRow = this.gameRows?.get(this.stateService.currentGuess);
          var gameTile = gameRow.gameTiles.get(this.stateService.currentColumn);
          gameTile.updateTileValue(eventData);
          this.stateService.incrementCurrentColumn();
        }
    }
    else
    {
      this.toastr.error("You need to start a game first.");
    }
  }

  undoLetter(eventData: {}) {
    if (this.gameEngineService.gameInProgress)
    {
        if (this.stateService.currentColumn >= 0)
        {
            if (this.stateService.currentColumn > 0)
            {
              this.stateService.decrementCurrentColumn();
            }

            var gameRow = this.gameRows?.get(this.stateService.currentGuess);
            gameRow.gameTiles.get(this.stateService.currentColumn).updateTileValue("");
        }
    }
    else
    {
      this.toastr.error("You need to start a game first.");
    }
  }

  checkWord(eventData: {}) {
    if (this.gameEngineService.gameInProgress)
    {
        let tileValues: string[] = [];
        let gameRow = this.gameRows?.get(this.stateService.currentGuess);
        let gameTiles = this.gameRows?.get(this.stateService.currentGuess).gameTiles;

        gameTiles.forEach((tile: { value: string; }) => {
          tileValues.push(tile.value);
        });

        let word = tileValues.join("").toLowerCase();
        let isValidWord = this.gameEngineService.isValidWord(word);

        if (isValidWord)
        {
          this.stateService.decrementGuessCount();
          
          let isCorrectWord = this.gameEngineService.isCorrectWord(word);

          if (isCorrectWord) {
            this.gameRows?.get(this.stateService.currentGuess).winner();
            this.gameEngineService.endGame();
            this.gameEngineService.updatePlayerStatistics(true, new Date(), 
                  this.stateService.currentGuess, this.stateService.complexity);
            
            this.toastr.success("You guessed the word!");

            // ShowGameStatsModal();
            this.isDisabled = !this.isDisabled;
          }
          else {
            var evaluatedWord = this.gameEngineService.evaluateCurrentGuess(word);
            gameRow.updateTiles(evaluatedWord);
            this.keyboard.updateKeyboard(evaluatedWord);

            if (this.stateService.currentGuess < 5) {
              this.stateService.incrementCurrentGuess();
            }

            this.stateService.resetCurrentColumn();
          }
        }
        else {
          gameRow.invalidWord();
          this.toastr.error("Not a valid word");          
        }

        if (this.stateService.guessCount == 0 && this.gameEngineService.gameInProgress) {
            var theWord = this.gameEngineService.currentWord;
            this.gameEngineService.endGame();
            this.gameEngineService.updatePlayerStatistics(false, new Date(), 
                this.stateService.currentGuess, this.stateService.complexity);
            this.toastr.info("Sorry!  You did not guess the word - " + theWord.word);
            // ShowGameStatsModal();
            this.isDisabled = !this.isDisabled;
        }
    }
    else {
      this.toastr.error("You need to start a game first.");
    }
  }
}
