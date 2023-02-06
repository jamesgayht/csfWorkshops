import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToDoComponent } from './components/to-do.component';
import { TasksComponent } from './components/tasks.component';
import { DatePipe } from '@angular/common';
import { DateValidatorComponent } from './components/date-validator.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    TasksComponent,
    DateValidatorComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
