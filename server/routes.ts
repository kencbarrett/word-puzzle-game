import express, { response } from "express";
import { ValidWord, UsedWord, PlayerStats } from "./models";
import * as MUUID from "uuid-mongodb";
import { request } from "http";

export const gameServiceRouter = express.Router();
gameServiceRouter.use(express.json());

gameServiceRouter.get("/playerStats/:playerId", async (request, response) => {
  try {
    let playerIdString = request.params.playerId;
    let playerId = MUUID.from(playerIdString);
    const playerStats = await PlayerStats.findOne({ playerIdentifier: playerId }).exec();

    if (playerStats) {
        response.status(200).send(playerStats);
    } else {
        response.status(404).send(`Failed to find player statistics for player id: ${playerId}`);
    }
    } catch (error) {
        response.status(500).send(`Unknown error occurred: ${error}`);
    }
});

gameServiceRouter.post('/playerStats/:playerId', async (request, response) => {
    try {
        let playerId = request.params.playerId;
        let requestBody = request.body;

        let playerStats = new PlayerStats({
            playerIdentifier: (playerId != "") ? MUUID.from(playerId) : MUUID.v4(),
            lastDatePlayed: requestBody.lastDatePlayed,
            totalGamesPlayed: requestBody.totalGamesPlayed,
            totalGamesWon: requestBody.totalGamesWon,
            currentWinStreak: requestBody.currentWinStreak,
            longestWinStreak: requestBody.longestWinStreak,
            frequencyDistributionEasy: requestBody.frequencyDistributionEasy,
            frequencyDistributionMedium: requestBody.frequencyDistributionMedium,
            frequencyDistributionHard: requestBody.frequencyDistributionHard
        });

        let filter = { playerIdentifier: playerStats.playerIdentifier };

        let result = await PlayerStats.collection.updateOne(filter, 
        {
            $set: {
                lastDatePlayed: playerStats.lastDatePlayed,
                totalGamesPlayed: playerStats.totalGamesPlayed,
                totalGamesWon: playerStats.totalGamesWon,
                currentWinStreak: playerStats.currentWinStreak,
                longestWinStreak: playerStats.longestWinStreak,
                frequencyDistributionEasy: playerStats.frequencyDistributionEasy,
                frequencyDistributionMedium: playerStats.frequencyDistributionMedium,
                frequencyDistributionHard: playerStats.frequencyDistributionHard
            }
        },
        {
            upsert: true
        });
        
        response.status(200).send(result);
      } catch (error) {
          response.status(500).send(`An error occurred updating player statistics.`);
      }        
});

gameServiceRouter.get('/validateWord/:wordToCheck', async (request, response) => {
    try {
        let wordToCheck = request.params.wordToCheck;
        let wordExists = await ValidWord.findOne({ word: wordToCheck }).exec();

        let result = (wordExists) ? true : false;

        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(`An error occurred validating the word: ${request.query['wordToCheck']}.`);
    }
  });

gameServiceRouter.get('/selectWord/:complexity/:playerId', async (request, response) => {
    try {
        let complexityLevel = request.params.complexity;
        let playerIdString = request.params.playerId;
        let playerId = MUUID.from(playerIdString);
        let complexityFilter: any;
        let usedWordComplexityFilter: any;

        switch (complexityLevel) {
            case "Medium":
                complexityFilter = { complexity: { $gt: 7, $lt: 10 } };
                usedWordComplexityFilter = { complexity: { $gt: 7, $lt: 10 }, playerIdentifier: playerId };
                break;
            
            case "Hard":
                complexityFilter = { complexity: { $gt: 10 } };
                usedWordComplexityFilter = { complexity: { $gt: 10 }, playerIdentifier: playerId };  
                break;
        
            default:
                complexityFilter = { complexity: { $lte: 7 } };
                usedWordComplexityFilter = { complexity: { $lte: 7 }, playerIdentifier: playerId };
                break;
            }
        
        let allValidWords = await ValidWord.find(complexityFilter).exec();
        let usedWords = await UsedWord.find(usedWordComplexityFilter).exec();

        let unusedWords = allValidWords.filter(function(aw){
            return !usedWords.find(function(uw) {
                return uw.word == aw.word;
            })
            });
            
        let index = between(0,unusedWords.length);
        const selectedWord = unusedWords[index];

        if (selectedWord) {
            const usedWord = new UsedWord({ 
                word: selectedWord.word, 
                complexity: selectedWord.complexity, 
                dateUsed: new Date(),
                playerIdentifier: playerId
            });
            
            // update collection
            usedWord.collection.insertOne(usedWord);

            response.status(200).send(selectedWord);
        }
        else {
            response.status(404).send(`Failed to find any valid words for complexity: ${complexityLevel}`);
        }
    } catch (error) {
        response.status(404).send(`Failed to find valid words for complexity: ${request.params.complexity}`);
    }
});

function between(min: number, max: number) {  
    return Math.floor(
        Math.random() * (max - min + 1) + min);
}