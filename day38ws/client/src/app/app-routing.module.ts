import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { WeatherComponent } from './components/weather.component';
import { WeatherRepository } from './repositories/weather.repository';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather/:city', component: WeatherComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
