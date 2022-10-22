import { ComplexityLevel } from "./complexityLevel";

export class UsedWord {
  _id?: string;
  word: string;
  complexity: ComplexityLevel;
  dateUsed: Date;

  constructor() {
    this.word = "";
    this.complexity = ComplexityLevel.Easy;
    this.dateUsed = new Date();
  }
}
