import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  param$!: Subscription
  OPEN_WEATHER_API_KEY = "e8ad578c13ce9c4ce68afc9a18c74808"
  weather = new Weather('', 0,0,0, '', 0,0)
  cityName!: string

  constructor (private router: Router, private activatedRoute: ActivatedRoute, private weatherService: WeatherService) {}
  
  ngOnInit(): void {
      this.param$ = this.activatedRoute.params.subscribe(
        params => {
          this.cityName = params['cityName']
          console.info("weather city name >>> ", this.cityName)
          this.weatherService.getWeather(this.cityName, this.OPEN_WEATHER_API_KEY).then((result) => {
            console.info("result >>> ", result)
            this.weather = new Weather(this.cityName, result.main.temp, result.main.pressure, result.main.humidity, result.weather[0].description, result.wind.speed, result.wind.deg)
          })
        }
      )
  }
}
