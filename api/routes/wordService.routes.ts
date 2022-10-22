import * as express from "express";
import { ComplexityLevel } from "../models/complexityLevel";
import { collections } from "../database";
import { ValidWord } from "../models/validWord";
import { UsedWord } from "../models/usedWord";
import { UUID } from "bson";
import { Collection } from "mongodb";

var _complexityFilter = {} ;
var _usedWordComplexityFilter = {};

function updateUsedWords(playerIdentifier: UUID, wordToUpdate: ValidWord): boolean {
  const wordToSave = new UsedWord();
  wordToSave.word = wordToUpdate.word;
  wordToSave.complexity = wordToUpdate.complexity;
  wordToSave.dateUsed = new Date();
  wordToSave.playerIdentifier = playerIdentifier;

  try {
    var usedWords = collections.usedWords as Collection<UsedWord>;
    usedWords.insertOne(wordToSave);
  }
  catch (error) {
    return false;
  }

  return true;
}

function setComplexityFilter(complexity: ComplexityLevel, player: UUID) {
  switch (complexity.toString()) {
    case "Medium":
      _complexityFilter = { complexity: { $gt: 7, $lt: 10 } };
      _usedWordComplexityFilter = { complexity: { $gt: 7, $lt: 10 }, playerIdentifier: player };
      break;
  
    case "Hard":
      _complexityFilter = { complexity: { $gt: 10 } };
      _usedWordComplexityFilter = { complexity: { $gt: 10 }, playerIdentifier: player };  
      break;

    default:
      _complexityFilter = { complexity: { $lte: 7 } };
      _usedWordComplexityFilter = { complexity: { $lte: 7 }, playerIdentifier: player };
      break;
  }
}

function between(min: number, max: number) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

export const wordServiceRouter = express.Router();
wordServiceRouter.use(express.json());
 
wordServiceRouter.get("/selectNewWord", async (req, res) => {
  try {
    const complexity = req.query['complexity']?.toString() as string;
    const playerIdentifier = new UUID(req.query['playerIdentifier']?.toString());
 
    setComplexityFilter((<any>ComplexityLevel)[complexity], playerIdentifier);

    const validWordsCollection = collections.validWords as Collection<ValidWord>;;
    const usedWordsCollection = collections.usedWords as Collection<UsedWord>;;
    const allWords = await validWordsCollection.find<ValidWord>(_complexityFilter).toArray();
    const pastWords = await usedWordsCollection.find<ValidWord>(_usedWordComplexityFilter).toArray();
    const unusedWords = allWords.filter(function(aw){
      return !pastWords.find(function(uw) {
        return uw.word == aw.word;
      })
    });
    
    const index = between(0,unusedWords.length);
    const selectedWord = unusedWords[index];

    // update used words for player
    updateUsedWords(playerIdentifier, selectedWord);

    if (selectedWord) {
        res.status(200).send(selectedWord);
    } else {
        res.status(404).send(`Failed to find any valid words for complexity: ${complexity}`);
    }
  } catch (error) {
      res.status(404).send(`Failed to find valid words for complexity: ${req.query['complexity']}`);
  }
});

wordServiceRouter.get("/isValidWord", async (req, res) => {
  try {
    const wordtoCheck = req.query['wordToCheck']?.toString();

    const validWordsCollection = collections.validWords as Collection<ValidWord>;
    const query = { word: { $eq: wordtoCheck }}
    var isValidWord = await validWordsCollection.findOne<ValidWord>(query);

    const result = (isValidWord) ? true : false;
    
    res.status(200).send(result);
  } catch (error) {
      res.status(500).send(`An error occurred validating the word: ${req.query['wordToCheck']}.`);
  }
});