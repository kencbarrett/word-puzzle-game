import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComplexityLevel } from '../models/complexityLevel';
import { ValidWord } from '../models/validWord';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameWordService {
  private apiUrl: string;
  private selectWordPath: string;
  private validateWordPath: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.baseApiUrl;
    this.selectWordPath = environment.selectWordPath;
    this.validateWordPath = environment.validateWordPath;
  }

  async selectNewWord(complexity: ComplexityLevel, playerId: string) {
    let level: string;
    
    switch (complexity) {
      case ComplexityLevel.Medium:
        level = "Medium";
        break;
    
      case ComplexityLevel.Hard:
        level = "Hard";
        break;

      default:
        level = "Easy";
        break;
    }

    return await firstValueFrom(this.http.get<ValidWord>(this.apiUrl + this.selectWordPath + level + '/' + playerId));
  }

  async validateWord(wordToCheck: string) {
    return await firstValueFrom(this.http.get<boolean>(this.apiUrl + this.validateWordPath + wordToCheck));
  }
}
