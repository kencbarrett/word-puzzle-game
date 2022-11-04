import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { find } from 'rxjs';
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
  currentGuess: string[] = [];
  userGuessKeys: GameButtonComponent[] = [] 

  constructor(private stateService: GameStateService) { 
  }

  ngOnInit(): void {
  }

  letterSelected(letter: string) {
    if (this.stateService.currentColumn < 5) {
      this.currentGuess.push(letter);
      var button = <GameButtonComponent>this.keyboardButtons?.find(button => button.value == letter);
      this.userGuessKeys.push(button)
    }

    this.nextLetter.emit(letter);
  }

  undo() {
    if (this.stateService.currentColumn > 0) {
      this.currentGuess.pop();
      this.userGuessKeys.pop();
    }

    this.undoLetter.emit();
  }

  checkUserGuess() {
    // tell the game board to check the user's guess
    this.checkWord.emit();    
  }

  updateKeyboardButtons(evaluatedWord: EvaluatedWord) {
    this.userGuessKeys.forEach(button => {
      if (evaluatedWord.presentLetters.findIndex(pl => { pl.letter === button.value}) > -1) {
        button.currentState = "present";
      }
      else {
        if (evaluatedWord.correctLetters.findIndex(cl => { cl.letter === button.value }) > -1) {
          button.currentState = "correct";
        }
        else {
          button.currentState = "absent";
        }
      }
    });

    this.userGuessKeys = [];
  }

  updateKeyboard(evaluatedWord: EvaluatedWord)
  {
      var correctLetters = evaluatedWord.correctLetters;
      var presentLetters = evaluatedWord.presentLetters;

      this.currentGuess.forEach(letter => {
        if (presentLetters.findIndex(pl => { pl.letter == letter }) > -1) {
          var button = this.keyboardButtons?.find(kb => kb.value == letter ) as GameButtonComponent;
          button.currentState = 'present';
        }
        else {
          if (correctLetters.findIndex(cl => { cl.letter == letter}) > -1) {
            var button = this.keyboardButtons?.find(kb => kb.value == letter) as GameButtonComponent;
            button.currentState = 'correct';
          }
          else {
            var button = this.keyboardButtons?.find(kb => kb.value == letter) as GameButtonComponent;
            button.currentState = 'absent';
          }
        }
      });

      this.currentGuess = [];
  }

  reset() {
    this.currentGuess = [];

    this.keyboardButtons?.forEach(kb => kb.reset());
  }
}
