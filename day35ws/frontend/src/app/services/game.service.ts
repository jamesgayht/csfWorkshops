import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameResult } from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpService: HttpClient) { }

  BACKEND_API_URL = "http://localhost8080/games/rank"
  
  gameResult!: GameResult

  getGameResults(limit: number, skip: number): Observable<GameResult> {
    const params = new HttpParams()
                        .set("limit", limit)
                        .set("skip", skip)

    const headers = new HttpHeaders()
                        .set('content-type', 'application/json')
                        .set('Access-Control-Allow-Origin', '*')
                        // .set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
                        // .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent')

    return this.httpService.get<GameResult>(this.BACKEND_API_URL, {params: params, headers: headers})

  }

}
