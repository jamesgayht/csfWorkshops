import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post.component';
import { DisplayComponent } from './components/display.component';
import { PostService } from './services/post.service';

const appRoutes: Routes = [
  { path: '', component: PostComponent},
  { path: 'display', component: DisplayComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ PostService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
