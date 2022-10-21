import * as uuid from 'uuid';

export class PlayerStatistics {
  _id?: string | undefined;
  playerIdentifier:  uuid.V4Options | undefined;
  lastDatePlayed: Date | undefined;
  totalGamesPlayed: number | undefined;
  totalGamesWon: number | undefined;
  currentWinStreak: number | undefined;
  longestWinStreak: number | undefined;
  frequencyDistributionEasy: number[] = [6];
  frequencyDistributionMedium: number[] = [6];
  frequencyDistributionHard: number[] = [6];
}

