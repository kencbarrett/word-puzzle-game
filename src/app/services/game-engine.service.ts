import { Injectable } from '@angular/core';
import { ComplexityLevel } from 'api/models/complexity.enum';
import { map } from 'rxjs';
import { EvaluatedWord } from '../models/evaluatedWord';
import { PlayerStatistics } from '../models/playerStatistics';
import { ValidWord } from '../models/validWord';
import { GameWordService } from './game-word.service';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  gameInProgress: boolean;
  gameOver: boolean;
  playerStatistics: PlayerStatistics | undefined;
  currentWord: ValidWord | undefined;

  constructor(private wordService: GameWordService) { 
    this.gameInProgress = false;
    this.gameOver = false;
  }

  startGame(complexity: ComplexityLevel) {

  }

  endGame() {

  }

  evaluateCurrentGuess(currentGuess: string): EvaluatedWord {
    return new EvaluatedWord();
  }

  isValidWord(word: string): boolean {
    return this.wordService.isValidWord(word);
  }

  isCorrectWord(word: string): boolean {
    return false;
  }

  updatePlayerStatistics(wonGame: boolean, currentDate: Date, guessCount: number, complexity: ComplexityLevel): void {

  }
}
