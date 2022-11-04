import { TestBed } from '@angular/core/testing';
import { ComplexityLevel } from '../models/complexityLevel';
import { GameStateService } from './game-state.service';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should contain default values', () => {
    expect(service.complexity).toBe(ComplexityLevel.Easy);
    expect(service.currentColumn).toBe(0);
    expect(service.currentGuess).toBe(0);
    expect(service.guessCount).toBe(6);
  })

 // current column unit tests
  it ('should increment current column', () => {
    service.incrementCurrentColumn();
    expect(service.currentColumn).toBe(1);
  });

  it ('should decrement current column', () => {
    service.decrementCurrentColumn();
    expect(service.currentColumn).toBe(-1);
  });

  it('should reset current column', () => {
    service.incrementCurrentColumn();
    expect(service.currentColumn).toBe(1);
    service.resetCurrentColumn();
    expect(service.currentColumn).toBe(0);
  });

  // current guess unit tests
  it ('should increment current guess', () => {
    service.incrementCurrentGuess();
    expect(service.currentGuess).toBe(1);
  });

  it ('should decrement current guess', () => {
    service.decrementCurrentGuess();
    expect(service.currentGuess).toBe(-1);
  });

  it('should reset current guess', () => {
    service.incrementCurrentGuess();
    expect(service.currentGuess).toBe(1);
    service.resetCurrentGuess();
    expect(service.currentGuess).toBe(0);
  });

  // guess count unit tests
  it ('should decrement guess count', () => {
    service.decrementGuessCount();
    expect(service.guessCount).toBe(5);
  });

  it('should reset guess count', () => {
    service.decrementGuessCount();
    expect(service.guessCount).toBe(5);
    service.resetGuessCount();
    expect(service.guessCount).toBe(6);
  });

  // complexity level unit tests
  it('should set complexity level to hard', () => {
    service.setComplexityLevel(ComplexityLevel.Hard);
    expect(service.complexity).toBe(ComplexityLevel.Hard);
  });

  it('should reset complexity to easy', () => {
    service.setComplexityLevel(ComplexityLevel.Medium);
    expect(service.complexity).toBe(ComplexityLevel.Medium);
    service.resetComplexityLevel();
    expect(service.complexity).toBe(ComplexityLevel.Easy);
  });  
});
