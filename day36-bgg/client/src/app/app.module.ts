import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { GamesComponent } from './components/games.component';
import { GameDetailsComponent } from './components/game-details.component';

const appRoutes: Routes = [
  { path: '', component: GamesComponent }, 
  { path: 'game/:id', component: GameDetailsComponent }, 
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, 
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
