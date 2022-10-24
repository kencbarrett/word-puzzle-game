import { Component, OnInit } from '@angular/core';
import { GameKeyboard } from '../game-keyboard/gameKeyboard';
import { GameRow } from '../game-row/gameRow';
import { ComplexityLevel } from '../models/complexityLevel';
import { GameEngineService } from '../services/game-engine.service';
import { GameStateService } from '../services/game-state.service';
import { ToastrService } from 'ngx-toastr';

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
  gameKeyboard: GameKeyboard;

  constructor(private gameEngineService: GameEngineService,
              private stateService: GameStateService,
              private toastr: ToastrService) { 
    this.isVisible = false;
    this.isDisabled = false;
    this.gameKeyboard = new GameKeyboard();
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
      this.gameKeyboard.reset();

      // reset the game board
      this.gameRows.forEach(gr => {
        gr.reset();
      });
    }
  }

  nextLetter(eventData: string ) {
    if (this.gameEngineService.gameInProgress)
    {
        if (this.stateService.currentColumn < 5)
        {
            this.gameRows[this.stateService.currentGuess]
              .gameTiles[this.stateService.currentColumn].setValue(eventData);
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

            this.gameRows[this.stateService.currentGuess]
              .gameTiles[this.stateService.currentColumn].value = "";
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
        var gameRow = this.gameRows[this.stateService.currentGuess];
        var tileValues = Array<string>(5);

        for (let index = 0; index < 5; index++)
        {
          tileValues.push(gameRow.gameTiles[index].value);
        }

        var word = tileValues.join();

        var isValidWord = this.gameEngineService.isValidWord(word);

        if (isValidWord)
        {
          this.stateService.decrementGuessCount();
          
          var isCorrectWord = this.gameEngineService.isCorrectWord(word);

          if (isCorrectWord) {
            // gameRow.Winnder();
            this.gameEngineService.endGame();
            this.gameEngineService.updatePlayerStatistics(true, new Date(), 
                  this.stateService.currentGuess, this.stateService.complexity);
            
            this.toastr.success("You guessed the word!");

            // ShowGameStatsModal();
            this.isDisabled = !this.isDisabled;
          }
          else {
            var evaluatedWord = this.gameEngineService.evaluateCurrentGuess(word);
            gameRow.updateGameTiles(evaluatedWord);
            // gameKeyboard.updateKeyboard(evaluatedWord);

            if (this.stateService.currentGuess < 5) {
              this.stateService.incrementCurrentGuess();
            }

            this.stateService.resetCurrentColumn();
          }

          this.gameRows[this.stateService.currentGuess].invalidWord();

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
