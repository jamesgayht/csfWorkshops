import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactRepository } from './contact.repository';
import { HttpClientModule } from '@angular/common/http'
import { UploadService } from './upload.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ContactRepository, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
