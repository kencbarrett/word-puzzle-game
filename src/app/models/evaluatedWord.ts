import { EvaluatedLetter } from "./evaluatedLetter";

export class EvaluatedWord {
  correctLetters: EvaluatedLetter[] = [];
  presentLetters: EvaluatedLetter[] = [];

  letterIsAccountedFor(letter: string): boolean {
    return Boolean(this.correctLetters.find(x => x.letter == letter));
  }
}
