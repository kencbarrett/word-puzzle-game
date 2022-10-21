import { Injectable } from '@angular/core';
import { ComplexityLevel } from '../models/complexityLevel';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  currentColumn: number;
  currentGuess: number;
  guessCount: number;
  complexity: ComplexityLevel;

  constructor() {
    this.currentColumn = 0;
    this.currentGuess = 0;
    this.guessCount = 6;
    this.complexity = ComplexityLevel.Easy;
  }

  incrementCurrentColumn() {
    this.currentColumn++;
  }

  decrementCurrentColumn() {
    this.currentColumn--;
  }

  resetCurrentColumn() {
    this.currentColumn = 0;
  }

  incrementCurrentGuess() {
    this.currentGuess++;
  }

  decrementCurrentGuess() {
    this.currentGuess--;
  }

  resetCurrentGuess() {
    this.currentGuess = 0;
  }

  decrementGuessCount() {
    this.guessCount--;
  }

  resetGuessCount() {
    this.guessCount = 6;
  }

  setComplexityLevel(complexity: ComplexityLevel) {
    this.complexity = complexity;
  }

  resetComplexityLevel() {
    this.complexity = ComplexityLevel.Easy;
  }
}
