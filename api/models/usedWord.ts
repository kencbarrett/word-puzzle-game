import * as mongodb from "mongodb";
import { UUID } from "bson";
import { ComplexityLevel } from "./complexity.enum";
 
export class UsedWord {
  playerIdentifier: UUID | undefined;
   word: string | undefined;
   copmplexity: ComplexityLevel | undefined;
   dateUsed: Date | undefined;
   _id?: mongodb.ObjectId;
}