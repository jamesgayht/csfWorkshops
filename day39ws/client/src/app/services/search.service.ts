import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Character } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  getCharacters(character: string): Promise<Character[]> {
    const params = new HttpParams().set('character', character);
    return lastValueFrom(
      this.httpClient.get<Character[]>('/api/characters', { params: params })
    );
  }

  getCharactersLimitOffset(
    character: string,
    limit: number,
    offset: number
  ): Observable<Character[]> {
    const params = new HttpParams()
      .set('character', character)
      .set('limit', limit)
      .set('offset', offset);

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    // .set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    // .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent')

    return this.httpClient.get<Character[]>('/api/characters', {
      params: params,
    });
  }
}
