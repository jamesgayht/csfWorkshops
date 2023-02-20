import { Component, Input, OnInit } from '@angular/core';
import { FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from '../models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm()
    const jsonString = localStorage.getItem('cities')
    if(!!jsonString) {
      this.cities = JSON.parse(jsonString)
    }
  }

  form!: FormGroup
  
  cities: City[] = []

  createForm(): FormGroup {
    return this.fb.group({
      cityName: this.fb.control<string>('', [Validators.required])
    })
  }

  createCity(): FormGroup {
    return this.fb.group({
      cityName: this.fb.control<string>('', [Validators.required])
    })
  }

  addCity() {
    const city = this.form.value as City
    console.info("city >>> ", city.cityName)
    if(this.cities.find(cn => cn.cityName === city.cityName)) {
      console.info(`this ${city.cityName} already exists`)
    }
    else {
      this.cities.push(city)
      console.info("cities >>>", this.cities)
      const jsonString = JSON.stringify(this.cities)
      localStorage.setItem("cities", jsonString)
      console.info(">>> saving into local storage <<<")
    }
    this.form = this.createForm()

  }  

  deleteCity(index: number) {
    this.cities.splice(index, 1)
    const jsonString = JSON.stringify(this.cities)
    localStorage.setItem("cities", jsonString)
    console.info(">>> saving into local storage <<<")
  }

}

