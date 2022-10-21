import { ComplexityLevel } from "./complexityLevel";

export class UsedWord {
  _id?: string;
  word: string | undefined;
  complexity: ComplexityLevel | undefined;
  dateUsed: Date | undefined;
}
