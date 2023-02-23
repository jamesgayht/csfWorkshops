import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './components/character-details.component';
import { CharactersComponent } from './components/characters.component';
import { CommentsComponent } from './components/comments.component';
import { SearchComponent } from './components/search.component';

const routes: Routes = [
  { path: '', component: SearchComponent},
  { path: 'characters/:character', component: CharactersComponent},
  { path: 'character/:id', component: CharacterDetailsComponent},
  { path: 'character/:id/comments', component: CommentsComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
