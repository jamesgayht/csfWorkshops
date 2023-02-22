import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Weather } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather(city: string, apiKey: string): Promise<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appId', apiKey)

      return (firstValueFrom(this.httpClient.get<Weather>('https://api.openweathermap.org/data/2.5/weather', {params: params})))
  }

}
