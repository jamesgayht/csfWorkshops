import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { DogComponent } from './components/dog.component';
import { PolarBearComponent } from './components/polar-bear.component';
import { CustomersComponent } from './components/customers.component';
import { ReactiveFormsModule } from '@angular/forms';

// the view / routes
const appRoutes: Routes = [
  // main page is /index.html aka / but since we don't put the '/' its just ''
  { path: '', component: HomeComponent },
  { path: 'dog', component: DogComponent },
  { path: 'polar-bear', component: PolarBearComponent },
  { path: 'customer/:custName', component: CustomersComponent },
  // matches all unknown paths and redirects them to home page
  { path: '**', redirectTo: '', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DogComponent,
    PolarBearComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
