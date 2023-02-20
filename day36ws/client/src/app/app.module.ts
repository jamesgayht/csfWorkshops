import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { WeatherComponent } from './components/weather.component';
import { WeatherService } from './services/weather.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'weather/:cityName', component: WeatherComponent},
  {path: '**', redirectTo: '/', pathMatch:'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
