import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ComplexityLevel } from '../models/complexityLevel';
import { ValidWord } from '../models/validWord';

import { GameWordService } from './game-word.service';

describe('GameWordService', () => {
  let service: GameWordService;
  let isValidWord: boolean;
  let selectedWord: ValidWord;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GameWordService]
    });

    service = TestBed.inject(GameWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return "true" for a valid word', () => {
    service.validateWord('coast')
      .then(result => { 
        expect(result).toBeTrue(); 
    });
  });

  it('Should return "false" for an invalid word', () => {
    service.validateWord('xaxax')
      .then(result => {
        expect(result).toBeFalse();
      });
  });

  it('should return an Easy complexity word', () => {
    service.selectNewWord(ComplexityLevel.Easy, '96976e02-cb62-4b91-ab95-09ad8fc4fcab')
      .then(selectedWord => { 
        expect(selectedWord).toBeTruthy();
        expect(selectedWord.complexity).toBeLessThanOrEqual(7);
    });
  });

  it('should return a Medium complexity word', () => {
    service.selectNewWord(ComplexityLevel.Medium, '96976e02-cb62-4b91-ab95-09ad8fc4fcab')
      .then(selectedWord => { 
        expect(selectedWord).toBeTruthy();
        expect(selectedWord.complexity).toBeGreaterThan(7);
        expect(selectedWord.complexity).toBeLessThan(10);
        });
  })

  it('should return a Hard complexity word', () => {
    service.selectNewWord(ComplexityLevel.Medium, '96976e02-cb62-4b91-ab95-09ad8fc4fcab')
      .then(selectedWord => { 
        expect(selectedWord).toBeTruthy();
        expect(selectedWord.complexity).toBeGreaterThan(10);
      });
  });
});
