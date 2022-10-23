import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlayerStatistics } from '../models/playerStatistics';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  private statsServiceUri: string;

  constructor(private http: HttpClient) {
    this.statsServiceUri = environment.statsServiceUri; 
  }

  retrievePlayerStatistics(playerIdentifier: string) : Observable<PlayerStatistics> {
    return this.http.get<PlayerStatistics>(this.statsServiceUri + '?playerIdentifier=' + playerIdentifier);
  }

  updatePlayerStatistics(playerStats: PlayerStatistics): void {
    this.http.post(this.statsServiceUri, playerStats);
  }
}
