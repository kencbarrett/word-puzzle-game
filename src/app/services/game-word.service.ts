import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ValidWord } from 'api/models/validWord';
import * as uuid from "uuid";
import { ComplexityLevel } from '../models/complexityLevel';

@Injectable({
  providedIn: 'root'
})
export class GameWordService {
  private wordIsValid: boolean;

  constructor(private http: HttpClient) { 
    this.wordIsValid = false;
  }

  selectNewWord(complexity: ComplexityLevel, playerIdentifier: uuid.V4Options): Observable<ValidWord> {
    const level = complexity.valueOf();
    const url = '/wordService/selectNewWord?complexity=' + level + '&playerIdentifier=' + playerIdentifier;

    return this.http.get<ValidWord>(url);
  }

  isValidWord(word: string): boolean {
    const url = '/wordService?wordToCheck=' + word;
    
    this.http.get<boolean>(url).subscribe(response => {
      this.wordIsValid = response;
    });

    return this.wordIsValid;
  }
}
