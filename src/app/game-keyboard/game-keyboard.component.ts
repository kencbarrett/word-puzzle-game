import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { GameButtonComponent } from '../game-button/game-button.component';
import { EvaluatedWord } from '../models/evaluatedWord';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'GameKeyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.css']
})

export class GameKeyboardComponent implements OnInit {
  @ViewChildren(GameButtonComponent) keyboardButtons: QueryList<GameButtonComponent> | undefined;
  @Output() checkWord = new EventEmitter(true);
  @Output() nextLetter = new EventEmitter(true);
  @Output() undoLetter = new EventEmitter(true);
  currentGuess: string[];

  constructor(private stateService: GameStateService) { 
    this.currentGuess = new Array<string>(5);
  }

  ngOnInit(): void {
  }

  letterSelected(letter: string) {
    if (this.stateService.currentColumn < 5) {
      this.currentGuess.push(letter);
    }

    this.nextLetter.emit(letter);
  }

  undo() {
    if (this.stateService.currentColumn > 0) {
      this.currentGuess.pop();
    }

    this.undoLetter.emit();
  }

  checkUserGuess() {
    // tell the game board to check the user's guess
    this.checkWord.emit();    
  }

  updateKeyboard(evaluatedWord: EvaluatedWord)
  {
      var correctLetters = evaluatedWord.correctLetters;
      var presentLetters = evaluatedWord.presentLetters;

      this.currentGuess.forEach(cg => {
        if (presentLetters.findIndex(pl => { pl.letter == cg }) != -1) {
          var button = this.keyboardButtons?.find(kb => kb.value == cg) as GameButtonComponent;
          button.setCurrentState("present");
        }
        else {
          if (correctLetters.findIndex(cl => { cl.letter == cg}) != -1) {
            var button = this.keyboardButtons?.find(kb => kb.value == cg) as GameButtonComponent;
            button.setCurrentState("correct");
          }
          else {
            var button = this.keyboardButtons?.find(kb => kb.value == cg) as GameButtonComponent;
            button.setCurrentState("absent");
          }
        }
      });

      this.currentGuess.fill("");
  }

  reset() {
    this.currentGuess.fill("");

    this.keyboardButtons?.forEach(kb => kb.reset());
  }
}
