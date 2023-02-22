import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  cities: string[] = ["Singapore", "Kuala Lumpur", "Tokyo", "Bangkok"]

  constructor() { }

  getCities(): string[] {
    return this.cities
  }

  addCity(city: string) {
    this.cities.push(city)
  }

}
