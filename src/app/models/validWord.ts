import { ComplexityLevel } from "./complexityLevel";

export class ValidWord {
  _id?: string;
  word: string;
  complexity: ComplexityLevel;

  constructor() {
    this.word = "";
    this.complexity = ComplexityLevel.Easy;
  }
}
