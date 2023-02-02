import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameResult } from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpService: HttpClient) { }

  BACKEND_API_URL = "http://localhost:8080/games/rank"
  
  gameResult!: GameResult

  getGameResults(limit: number, skip: number): Observable<GameResult> {
    const params = new HttpParams()
                        .set("limit", limit)
                        .set("skip", skip)

    const headers = new HttpHeaders()
                        .set('content-type', 'application/json')
                        .set('Access-Control-Allow-Origin', '*')

    return this.httpService.get<GameResult>(this.BACKEND_API_URL, {params: params, headers: headers})

  }

}
