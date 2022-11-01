import { TestBed } from '@angular/core/testing';

import { PlayerStatsService } from './player-stats.service';
import { HttpClientModule } from '@angular/common/http';
import { PlayerStatistics } from '../models/playerStatistics';
import { ValidWord } from '../models/validWord';

describe('PlayerStatsService', () => {
  let service: PlayerStatsService;
  let playerStats: PlayerStatistics;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PlayerStatsService]
    });

    service = TestBed.inject(PlayerStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should retrieve PlayerStatistics object', () => {
    let player = service.retrievePlayerStatisticsByPlayerId('96976e02-cb62-4b91-ab95-09ad8fc4fcab')
      .then((result) => { return result})
      .catch((error) => { console.log(error) });
   
    expect(player).toBeTruthy();
  })
});
