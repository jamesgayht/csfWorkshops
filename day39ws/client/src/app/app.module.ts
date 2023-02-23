import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search.component';
import { CharactersComponent } from './components/characters.component';
import { CharacterDetailsComponent } from './components/character-details.component';
import { CommentsComponent } from './components/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CharactersComponent,
    CharacterDetailsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
