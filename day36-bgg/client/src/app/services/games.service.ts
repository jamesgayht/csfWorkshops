import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Game, GameDetails } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private httpClient: HttpClient) { }

  getGames(): Promise<Game[]> {
    return firstValueFrom(this.httpClient.get<Game[]>('/api/games'))
  } 

  getGameById(id: string): Promise<GameDetails> {
    return firstValueFrom(
      this.httpClient.get<GameDetails>(`/api/game/${id}`)
    )
  }

}
