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
  private playerStats: PlayerStatistics;
  
  constructor(private http: HttpClient) {
    this.playerStats = new PlayerStatistics();
    this.localStorageKey = environment.localStorageKey;
    //this.apiUrl = environment.apiUrl + '/playerStats';
    this.apiUrl = "http://localhost:3000/api/playerStats";
  }

  async upsertPlayerStatistics(playerStats: PlayerStatistics) {
    return await firstValueFrom(this.http.post<PlayerStatistics>(this.apiUrl, playerStats));
  }

  async updatePlayerStatistics(playerId: string, winner: boolean, currentDate: Date, guessCount: number, complexity: ComplexityLevel) {
    // retrieve player statistics
    this.retrievePlayerStatisticsByPlayerId(playerId);

    // update the player's statistics
    this.playerStats.lastDatePlayed = currentDate;
    this.playerStats.totalGamesPlayed += 1;

    if (winner) {
      this.playerStats.totalGamesWon += 1;
      this.playerStats.currentWinStreak += 1;

      if (this.playerStats.longestWinStreak < this.playerStats.currentWinStreak) {
        this.playerStats.longestWinStreak = this.playerStats.currentWinStreak;
      }
    }
    else {
      this.playerStats.currentWinStreak = 0;
    }

    switch (complexity) {
      case ComplexityLevel.Medium:
        this.playerStats.frequencyDistributionMedium[guessCount] += 1;
        break;
      case ComplexityLevel.Hard:
        this.playerStats.frequencyDistributionHard[guessCount] += 1;
        break;
      default:
        this.playerStats.frequencyDistributionEasy[guessCount] += 1;
        break;
    }

    await this.upsertPlayerStatistics(this.playerStats).then(player => { this.playerStats = player});

    return this.playerStats;
  }

  async retrievePlayerStatistics() {
    let playerId = localStorage.getItem(this.localStorageKey);

    if (playerId == null) {
      this.playerStats = await this.upsertPlayerStatistics(new PlayerStatistics());
      localStorage.setItem(this.localStorageKey, this.playerStats.playerIdentifier);
      return this.playerStats;
    }
    else {
      return await firstValueFrom(this.http.get<PlayerStatistics>(this.apiUrl + '/' + playerId));    
    }
  }

  async retrievePlayerStatisticsByPlayerId(playerId: string) {
    return await firstValueFrom(this.http.get<PlayerStatistics>(this.apiUrl + '/' + playerId));
  }
}