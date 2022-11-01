import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GameWordService } from './game-word.service';
import { PlayerStatsService } from './player-stats.service';
import { GameEngineService } from './game-engine.service';

describe('GameEngineService', () => {
  let service: GameEngineService;
  let wordService: GameWordService;
  let statsService: PlayerStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GameEngineService, GameWordService, PlayerStatsService]
    });

    wordService = TestBed.inject(GameWordService);
    statsService = TestBed.inject(PlayerStatsService);
    service = TestBed.inject(GameEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
