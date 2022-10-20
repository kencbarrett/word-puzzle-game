import * as mongodb from "mongodb";
import { ComplexityLevel } from "./complexity.enum";
 
export class ValidWord {
   word: string | undefined;
   copmplexity: ComplexityLevel | undefined;
   _id?: mongodb.ObjectId;
}