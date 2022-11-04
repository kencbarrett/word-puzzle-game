import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlayerStatistics } from '../models/playerStatistics';
import { environment } from 'src/environments/environment';
import { ComplexityLevel } from '../models/complexityLevel';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  private apiUrl: string;
  private localStorageKey: string;
  
  constructor(private http: HttpClient) {
    this.localStorageKey = environment.localStorageKey;
    this.apiUrl = environment.baseApiUrl + environment.playerStatsPath;
  }

  async upsertPlayerStatistics(playerStats: PlayerStatistics) {
    return await firstValueFrom(this.http.post<PlayerStatistics>(this.apiUrl + playerStats.playerIdentifier, playerStats));
  }

  async updatePlayerStatistics(playerId: string, winner: boolean, currentDate: Date, guessCount: number, complexity: ComplexityLevel) {
    // fetch and update player statistics
    this.retrievePlayerStatisticsByPlayerId(playerId).then(player => {
      player.lastDatePlayed = currentDate;
      player.totalGamesPlayed += 1;
      
      if (winner) {
        player.totalGamesWon += 1;
        player.currentWinStreak += 1;
        if (player.longestWinStreak < player.currentWinStreak) {
          player.longestWinStreak = player.currentWinStreak;
        }
      }
      else {
        player.currentWinStreak = 0;
      }

      switch (complexity) {
        case ComplexityLevel.Medium:
          player.frequencyDistributionMedium[guessCount] += 1;
          break;
        case ComplexityLevel.Hard:
          player.frequencyDistributionHard[guessCount] += 1;
          break;
        default:
          player.frequencyDistributionEasy[guessCount] += 1;
          break;
      }
      
      this.upsertPlayerStatistics(player);
    });
  }

  async retrievePlayerStatistics() {
    let playerId = localStorage.getItem(this.localStorageKey);

    if (playerId == null) {
      return await this.upsertPlayerStatistics(new PlayerStatistics()).then(player => {
        localStorage.setItem(this.localStorageKey, player.playerIdentifier);
        return player;
      });
    }
    else {
      return await firstValueFrom(this.http.get<PlayerStatistics>(this.apiUrl + playerId));    
    }
  }

  async retrievePlayerStatisticsByPlayerId(playerId: string) {
    return await firstValueFrom(this.http.get<PlayerStatistics>(this.apiUrl + playerId));
  }
}