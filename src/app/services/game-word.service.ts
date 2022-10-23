import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ValidWord } from 'api/models/validWord';
import { ComplexityLevel } from '../models/complexityLevel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameWordService {
  private wordIsValid: boolean;
  private wordServiceUri: string;

  constructor(private http: HttpClient) { 
    this.wordIsValid = false;
    this.wordServiceUri = environment.wordServiceUri;
  }

  selectNewWord(complexity: ComplexityLevel, playerIdentifier: string): Observable<ValidWord> {
    const level = complexity.valueOf();
    const uri = this.wordServiceUri + 'selectNewWord?complexity=' + level + 
      '&playerIdentifier=' + playerIdentifier;

    return this.http.get<ValidWord>(uri);
  }

  isValidWord(word: string): boolean {
    this.http.get<boolean>(this.wordServiceUri + '?wordToCheck=' + word).subscribe(response => {
      this.wordIsValid = response;
    });

    return this.wordIsValid;
  }
}
