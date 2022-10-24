import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { GameKeyboard } from './gameKeyboard';

@Component({
  selector: 'GameKeyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.css']
})
export class GameKeyboardComponent implements OnInit {
  keyboard: GameKeyboard;
  currentGuess: string[] = [];
  @Output() checkWord = new EventEmitter(true);
  @Output() nextLetter = new EventEmitter(true);
  @Output() undoLetter = new EventEmitter(true);

  constructor(private stateService: GameStateService) { 
    this.keyboard = new GameKeyboard();
  }

  ngOnInit(): void {
  }

  letterSelected(letter: string) {
    if (this.stateService.currentColumn < 5) {
      this.keyboard.currentGuess.push(letter);
    }

    this.nextLetter.emit(letter);
  }

  undo() {
    if (this.stateService.currentColumn > 0) {
      this.keyboard.currentGuess.pop();
    }

    this.undoLetter.emit();
  }

  checkUserGuess() {
    // tell the game board to check the user's guess
    this.checkWord.emit();    
  }

  reset() {
    this.keyboard.currentGuess.fill("");
  }
}
