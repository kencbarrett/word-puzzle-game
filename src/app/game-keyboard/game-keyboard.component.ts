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
  userGuessKeys: GameButtonComponent[] = [] 

  constructor(private stateService: GameStateService) { 
  }

  ngOnInit(): void {
  }

  letterSelected(letter: string) {
    if (this.stateService.currentColumn < 5) {
      var button = <GameButtonComponent>this.keyboardButtons?.find(button => button.value == letter);
      this.userGuessKeys.push(button)
    }

    this.nextLetter.emit(letter);
  }

  undo() {
    if (this.stateService.currentColumn > 0) {
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
      let index = evaluatedWord.presentLetters.findIndex(pl => pl.letter == button.value);

      if (index >= 0) {
        button.currentState = "present";
      }
      else {
        index = evaluatedWord.correctLetters.findIndex(cl => cl.letter == button.value);
        if (index >= 0) {
          button.currentState = "correct";
        }
        else {
          button.currentState = "absent";
        }
      }
    });

    this.userGuessKeys = [];
  }

  reset() {
    this.userGuessKeys = [];

    this.keyboardButtons?.forEach(kb => kb.reset());
  }
}
