import { Schema, model, Types } from "mongoose";
import * as MUUID from "uuid-mongodb";

// create document interface
interface IValidWord {
  word: string,
  complexity: number
}

interface IUsedWord {
  playerIdentifier: Types.Buffer,
  word: string,
  complexity: number,
  dateUsed: Date
}

interface IPlayerStats {
  playerIdentifier: Types.Buffer;
  lastDatePlayed: Date;
  totalGamesPlayed: number;
  totalGamesWon: number;
  currentWinStreak: number;
  longestWinStreak: number;
  frequencyDistributionEasy: Types.Array<number>;
  frequencyDistributionMedium: Types.Array<number>;
  frequencyDistributionHard: Types.Array<number>;
}

// create a Schema corresponding to the document interface.
const validWordSchema = new Schema<IValidWord>({
  word: { type: String, required: true },
  complexity: { type: Number , required: true },
});

const usedWordSchema = new Schema<IUsedWord>({
  playerIdentifier: { type: 'object', required: true, value: { type: Types.Buffer }, default: () => MUUID.v4()  },
  word: { type: String, required: true },
  complexity: { type: Number, required: true },
  dateUsed: { type: Date, required: true}
});

const playerStatsSchema = new Schema<IPlayerStats>({
  playerIdentifier: { type: 'object', required: true, value: { type: Types.Buffer }, default: () => MUUID.v4()  },
  lastDatePlayed: { type: Date, required: true },
  totalGamesPlayed: { type: Number, required: true },
  totalGamesWon: { type: Number, required: true },
  currentWinStreak: { type: Number, required: true },
  longestWinStreak: { type: Number, required: true },
  frequencyDistributionEasy: { type: [Number], required: true },
  frequencyDistributionMedium: { type: [Number], required: true},
  frequencyDistributionHard: { type: [Number], required: true} 
});

// 3. Create a Model.
export const ValidWord = model<IValidWord>('ValidWord', validWordSchema, 'validWords');
export const UsedWord = model<IUsedWord>('UsedWord', usedWordSchema, 'usedWords');
export const PlayerStats = model<IPlayerStats>('PlayerStats', playerStatsSchema, 'playerStats');
