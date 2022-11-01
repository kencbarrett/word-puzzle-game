import { Injectable, resolveForwardRef } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { ComplexityLevel } from '../models/complexityLevel';
import { EvaluatedLetter } from '../models/evaluatedLetter';
import { EvaluatedWord } from '../models/evaluatedWord';
import { PlayerStatistics } from '../models/playerStatistics';
import { ValidWord } from '../models/validWord';
import { GameWordService } from './game-word.service';
import { PlayerStatsService } from './player-stats.service';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  gameInProgress: boolean;
  gameOver: boolean;
  playerStatistics: PlayerStatistics;
  currentWord: ValidWord;
  private userGuesses: EvaluatedWord[] = [];
  private wordIsValid: boolean;

  constructor(private wordService: GameWordService, private statsService: PlayerStatsService) { 
    this.gameInProgress = false;
    this.gameOver = false;
    this.wordIsValid = false;
    this.playerStatistics = new PlayerStatistics();
    this.currentWord = new ValidWord();
  }

  startGame(complexity: ComplexityLevel) {
    this.statsService.retrievePlayerStatistics().then(result => {
      //console.log(result);
      this.setPlayerStatistics(result);
      this.wordService.selectNewWord(complexity, result.playerIdentifier).then(result => {
        //console.log(result);
        this.setCurrentWord(result);
      })
    });

    this.gameInProgress = true;
  }

  endGame() {
    this.gameOver = true;
    this.gameInProgress = false;
  }

  evaluateCurrentGuess(currentGuess: string): EvaluatedWord {
    var evaluatedWord = new EvaluatedWord();
    var matchedLetters = new Array<string>(5);
    var currentWord = this.currentWord.word;

    // Pass 1 - look for letters in their correct place
    for (var i = 0; i < 5; i++) {
      if (currentWord[i] == currentGuess[i]) {
        evaluatedWord.correctLetters.push(new EvaluatedLetter(currentGuess[i], i));
        matchedLetters[i] = currentWord[i];
      }
    }

    // Pass 2 - look for letters that are present but in wrong position
    for (let index = 0; index < 5; index++) {
      // if a letter has been matched, skip it
      if (!matchedLetters.includes(currentGuess[index])) {
        if (currentWord.includes(currentGuess[index])) {
          evaluatedWord.presentLetters.push(new EvaluatedLetter(currentGuess[index], index));
        }
      }      
    }

    this.userGuesses.push(evaluatedWord);

    return evaluatedWord;
  }

  isValidWord(word: string) {
    this.wordService.validateWord(word).then(result => {
      this.setWordIsValid(result);
    });

    return this.wordIsValid;
  }

  isCorrectWord(word: string): boolean {
    return this.currentWord.word == word;
  }

  updatePlayerStatistics(wonGame: boolean, currentDate: Date, guessCount: number, complexity: ComplexityLevel) {
    this.statsService.updatePlayerStatistics(this.playerStatistics.playerIdentifier, 
        wonGame, currentDate, guessCount, complexity).then(result => {
          this.playerStatistics = result;
        });
  }

  private setPlayerStatistics(player: PlayerStatistics) {
    this.playerStatistics._id = player._id;
    this.playerStatistics.playerIdentifier = player.playerIdentifier;
    this.playerStatistics.lastDatePlayed = player.lastDatePlayed;
    this.playerStatistics.currentWinStreak = player.currentWinStreak;
    this.playerStatistics.longestWinStreak = player.longestWinStreak;
    this.playerStatistics.totalGamesPlayed = player.totalGamesPlayed;
    this.playerStatistics.totalGamesWon = player.totalGamesWon;
    this.playerStatistics.frequencyDistributionEasy = player.frequencyDistributionEasy;
    this.playerStatistics.frequencyDistributionMedium = player.frequencyDistributionMedium;
    this.playerStatistics.frequencyDistributionHard = player.frequencyDistributionHard;
  }

  private setCurrentWord(currentWord: ValidWord) {
    this.currentWord._id = currentWord._id;
    this.currentWord.word = currentWord.word;
    this.currentWord.complexity = currentWord.complexity;
  }

  private setWordIsValid(isValid: boolean) {
    this.wordIsValid = isValid;
  }
}
