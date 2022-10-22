import * as express from "express";
import { collections } from "../database";
import { PlayerStatistics } from "../models/playerStatistics";
import { UUID } from "bson";
import { Collection } from "mongodb";

var _complexityFilter = {} ;
var _usedWordComplexityFilter = {};

export const statsServiceRouter = express.Router();
statsServiceRouter.use(express.json());
 
statsServiceRouter.get("/playerStats", async (req, res) => {
  try {
    const playerId = new UUID(req.query['playerIdentifier']?.toString());
    const playerStatsCollection = collections.playerStats as Collection<PlayerStatistics>;
    
    const filter = { playerIdentifier: playerId };
    const playerStats = await playerStatsCollection.findOne<PlayerStatistics>(filter);

    if (playerStats) {
        res.status(200).send(playerStats);
    } else {
        res.status(404).send(`Failed to find player statistics for player id: ${playerId}`);
    }
  } catch (error) {
      res.status(404).send(`Failed to find player statistics for player id: ${req.query['playerIdentifier']}`);
  }
});

statsServiceRouter.post("/playerStats", async (req, res) => {
  try {
    const playerStats = req.body as PlayerStatistics;
    const playerStatsCollection = collections.playerStats as Collection<PlayerStatistics>;

    const filter = { playerIdentifier: playerStats.playerIdentifier };
    const result = await playerStatsCollection.updateOne(
      {
        playerIdentifier: new UUID(playerStats.playerIdentifier)
      },
      {
        $set: {
          lastDatePlayed: playerStats.lastDatePlayed,
          totalGamesPlayed: playerStats.totalGamesPlayed,
          totalGamesWon: playerStats.totalGamesWon,
          currentWinStreak: playerStats.currentWinStreak,
          longestWinStreak: playerStats.longestWinStreak,
          frequencyDistributionEasy: playerStats.easyFrequencyDistribution,
          frequencyDistributionMedium: playerStats.mediumFrequencyDistribution,
          freaquencyDistributionHard: playerStats.hardFrequencyDistribution
        }
      },
      {
        upsert: true
      }
    );

    res.status(200).send(result);
  } catch (error) {
      res.status(500).send(`An error occurred updating player statistics.`);
  }
});