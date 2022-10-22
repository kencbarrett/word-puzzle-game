import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';
import { PlayerStatistics } from '../models/playerStatistics';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  private statsServiceUri: string;

  constructor(private http: HttpClient) {
    this.statsServiceUri = '/statsService/playerStats'; 
  }

  retrievePlayerStatistics(playerIdentifier: string) : Observable<PlayerStatistics> {
    return this.http.get<PlayerStatistics>(this.statsServiceUri + '?playerIdentifier=' + playerIdentifier);
  }

  updatePlayerStatistics(playerStats: PlayerStatistics): void {
    this.http.post(this.statsServiceUri, playerStats);
  }
}
