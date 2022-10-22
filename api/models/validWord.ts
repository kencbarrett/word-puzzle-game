import * as mongodb from "mongodb";
import { ComplexityLevel } from "./complexityLevel";
 
export class ValidWord {
   word: string;
   complexity: ComplexityLevel;
   _id?: mongodb.ObjectId;

   constructor() {
      this.word = "";
      this.complexity = ComplexityLevel.Easy;
   }
}