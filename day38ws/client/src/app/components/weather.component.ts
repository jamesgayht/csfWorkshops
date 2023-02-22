import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from '../models/models';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  param$!: Subscription
  OPEN_WEATHER_API_KEY = "e8ad578c13ce9c4ce68afc9a18c74808"
  // weatherResult = new Weather('',0,0,0,'',0,0)
  weatherResult!: Weather
  city!: string

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private weatherService: WeatherService) {}

  ngOnInit(): void {
      this.param$ = this.activatedRoute.params.subscribe(params => {
        this.city = params['city']
        console.info("weather city name >>> ", this.city)
        this.weatherService.getWeather(this.city, this.OPEN_WEATHER_API_KEY).then((result) => {
          console.info("weather result >>> ", result)
          this.weatherResult = new Weather(this.city, result.main.temp, result.main.pressure, result.main.humidity, result.weather[0].description, result.wind.speed, result.wind.deg)
        })
      })
  }
}
