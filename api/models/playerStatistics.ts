import * as mongodb from "mongodb";
import { UUID } from "bson";
import { lastValueFrom } from "rxjs";

export class PlayerStatistics {
  _id?: mongodb.ObjectId;
  playerIdentifier: UUID;
  lastDatePlayed: Date;
  totalGamesPlayed: number;
  totalGamesWon: number;
  currentWinStreak: number;
  longestWinStreak: number;
  easyFrequencyDistribution: number[];
  mediumFrequencyDistribution: number[];
  hardFrequencyDistribution: number[];

  constructor() {
    this.lastDatePlayed = new Date();
    this.totalGamesPlayed = 0;
    this.totalGamesWon = 0;
    this.currentWinStreak = 0;
    this.longestWinStreak = 0;
    this.easyFrequencyDistribution = [6];
    this.mediumFrequencyDistribution = [6];
    this.hardFrequencyDistribution = [6];
  }
}