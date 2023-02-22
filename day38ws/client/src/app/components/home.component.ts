import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City, Weather } from '../models/models';
import { WeatherRepository } from '../repositories/weather.repository';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  form!: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private citiesService: CitiesService, private weatherRepo: WeatherRepository) {}
  
  // using service
  // cities: string[] = this.citiesService.getCities()

  // using repo
  cities: City[] = []

  async ngOnInit() {
      this.form = this.createForm()
      // this.weatherRepo.canLogin = !!this.form
      // console.info("can login >> ", this.weatherRepo.canLogin)
      this.cities = await this.weatherRepo.getAllCities(); 
      console.info("cities >>> ", this.cities)
  }

  createForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control('', [ Validators.required ])
    })
  }

  // city = new City(0, 'Hello')
  async addCityToRepo() { 
    console.info("adding cityName >>> ", this.form.get('city')?.value)
    // const city = this.form.get('city')?.value
    const city = this.form.value as City
    console.info("adding city >>> ", city)
    try {
      const k = await this.weatherRepo.addCity(city)
      console.info("k >>> ", k)
      this.cities = await this.weatherRepo.getAllCities()

      // clear the form 
      this.ngOnInit()

    } catch (error) {
      console.error("error >>> ", error)
    }
  }

  // addCity() {
  //   const city = this.form.get('city')?.value
  //   console.info("adding city >>> ", city)
  //   this.citiesService.addCity(city)
  //   this.cities = this.citiesService.getCities()
  //   this.form = this.createForm()
  // }

  formInvalid() {
    const city = this.form.get('city')?.value
    return this.form.invalid || this.cities.find(c => c.city === city)
  }



}
