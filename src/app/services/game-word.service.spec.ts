import { TestBed } from '@angular/core/testing';

import { GameWordService } from './game-word.service';

describe('GameWordService', () => {
  let service: GameWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
