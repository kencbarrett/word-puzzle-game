import * as uuid from 'uuid';

export class PlayerStatistics {
  _id?: string;
  playerIdentifier: uuid.V4Options;
  lastDatePlayed: Date;
  totalGamesPlayed: number;
  totalGamesWon: number;
  currentWinStreak: number;
  longestWinStreak: number;
  easyFrequencyDistribution: number[];
  mediumFrequencyDistribution: number[];
  hardFrequencyDistribution: number[];

  constructor() {
    this.playerIdentifier = uuid.v4() as uuid.V4Options;
    this.lastDatePlayed = new Date();
    this.totalGamesPlayed = 0;
    this.totalGamesWon = 0;
    this.currentWinStreak = 0;
    this.longestWinStreak = 0;
    this.easyFrequencyDistribution = new Array<number>(6);
    this.mediumFrequencyDistribution = new Array<number>(6);
    this.hardFrequencyDistribution = new Array<number>(6);
  }
}

