import * as mongodb from "mongodb";
import { ValidWord } from "./models/validWord";
import { UsedWord } from "./models/usedWord";
import { PlayerStatistics } from "./models/playerStatistics";
 
export const collections: {
   validWords?: mongodb.Collection<ValidWord>;
   usedWords?: mongodb.Collection<UsedWord>;
   playerStats?: mongodb.Collection<PlayerStatistics>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("word_puzzle_dev");
 
   collections.validWords = db.collection<ValidWord>("validWords");
   collections.usedWords = db.collection<UsedWord>("usedWords");
   collections.playerStats = db.collection<PlayerStatistics>("playerStats");
}
