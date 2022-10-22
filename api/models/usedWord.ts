import * as mongodb from "mongodb";
import { UUID } from "bson";
import { ComplexityLevel } from "./complexityLevel";
 
export class UsedWord {
  playerIdentifier: UUID | undefined;
   word: string;
   complexity: ComplexityLevel;
   dateUsed: Date;
   _id?: mongodb.ObjectId;

   constructor() {
    this.word = "";
    this.complexity = ComplexityLevel.Easy;
    this.dateUsed = new Date();
   }
}