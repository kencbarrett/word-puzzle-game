import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
  private localStorageKey: string;
  private userGuesses: EvaluatedWord[] = [];

  constructor(private wordService: GameWordService, private statsService: PlayerStatsService) { 
    this.gameInProgress = false;
    this.gameOver = false;
    this.localStorageKey = environment.localStorageKey;
    this.playerStatistics = new PlayerStatistics();
    this.currentWord = new ValidWord();
  }

  startGame(complexity: ComplexityLevel) {
    this.playerStatistics = this.retrievePlayerStatistics();
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

  isValidWord(word: string): boolean {
    return this.wordService.isValidWord(word);
  }

  isCorrectWord(word: string): boolean {
    return this.currentWord.word == word;
  }

  updatePlayerStatistics(wonGame: boolean, currentDate: Date, guessCount: number, complexity: ComplexityLevel): void {
    this.playerStatistics?.totalGamesPlayed
    this.playerStatistics.lastDatePlayed = new Date();

    if (wonGame) {
      this.playerStatistics.totalGamesWon += 1;
      this.playerStatistics.currentWinStreak += 1;   
      
      if (this.playerStatistics.longestWinStreak < this.playerStatistics.currentWinStreak) {
        this.playerStatistics.longestWinStreak = this.playerStatistics.currentWinStreak;
      }
    } else {
      this.playerStatistics.currentWinStreak = 0;
    }

    switch(complexity) {
      case ComplexityLevel.Easy:
        this.playerStatistics.easyFrequencyDistribution[guessCount] += 1;
        break;
      case ComplexityLevel.Medium:
        this.playerStatistics.mediumFrequencyDistribution[guessCount] += 1;
        break;
      case ComplexityLevel.Hard:
        this.playerStatistics.hardFrequencyDistribution[guessCount] += 1;
        break;
    }

    this.statsService.updatePlayerStatistics(this.playerStatistics);
  }

  private retrievePlayerStatistics(): PlayerStatistics {
    const playerIdFromStorage = localStorage.getItem(this.localStorageKey);
    var playerStats = this.playerStatistics;

    if (playerIdFromStorage == null) {
      // create a new player statistics document
      this.statsService.updatePlayerStatistics(playerStats);
      localStorage.setItem(this.localStorageKey, playerStats.playerIdentifier.toString());
    } else {
      // retrieve existing player statistics document
      this.statsService.retrievePlayerStatistics(playerIdFromStorage).subscribe(response => {
        playerStats = response;
      })
    }

    return playerStats;
  }

  private selectNewWord(complexity: ComplexityLevel) {
    this.wordService.selectNewWord(complexity, this.playerStatistics.playerIdentifier as string).subscribe(response => {
      this.currentWord._id = response._id?.toString(),
      this.currentWord.word = response.word,
      this.currentWord.complexity = response.complexity;
    });
  }
}
