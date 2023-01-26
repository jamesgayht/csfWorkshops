import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Weather } from '../models/Weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  form!: FormGroup
  city!: string
  OPEN_WEATHER_API_KEY = 'e8ad578c13ce9c4ce68afc9a18c74808'
  model = new Weather('', 0,0,0,'',0,0)

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService) {}
  
  ngOnInit(): void {
      this.form = this.createForm();
  }

  public searchWeather() {
    console.info(">>> City: ", this.city)
    // why use square brackets? 
    this.city = this.form.value["city"]
    this.weatherSvc.getWeather(this.city, this.OPEN_WEATHER_API_KEY).then((result) => {
      console.info(">>> Results: ", result)
      this.model = new Weather(
        this.city, result.main.temp, result.main.pressure, result.main.humidity, result.weather[0].description, result.wind.speed, result.wind.deg 
      ) 
    })
  }

  private createForm(): FormGroup {
    return this.fb.group ({
      city: this.fb.control('', [Validators.required])
    })
  }

}
