export class PlayerStatistics {
  _id?: string;
  playerIdentifier: string;
  lastDatePlayed: Date;
  totalGamesPlayed: number;
  totalGamesWon: number;
  currentWinStreak: number;
  longestWinStreak: number;
  frequencyDistributionEasy: number[];
  frequencyDistributionMedium: number[];
  frequencyDistributionHard: number[];

  constructor() {
    this.playerIdentifier = "";
    this.lastDatePlayed = new Date();
    this.totalGamesPlayed = 0;
    this.totalGamesWon = 0;
    this.currentWinStreak = 0;
    this.longestWinStreak = 0;
    this.frequencyDistributionEasy = new Array<number>(6);
    this.frequencyDistributionMedium = new Array<number>(6);
    this.frequencyDistributionHard = new Array<number>(6);
  }
}

