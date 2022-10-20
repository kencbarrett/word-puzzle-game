import * as mongodb from "mongodb";
import { ValidWord } from "./models/validWord";
import { UsedWord } from "./models/usedWord";
 
export const collections: {
   validWords?: mongodb.Collection<ValidWord>;
   usedWords?: mongodb.Collection<UsedWord>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("word_puzzle_dev");
 
   const validWordsCollection = db.collection<ValidWord>("validWords");
   collections.validWords = validWordsCollection;
   const usedWordsCollection = db.collection<UsedWord>("usedWords");
   collections.usedWords = usedWordsCollection;
}
