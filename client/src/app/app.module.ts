import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompteComponent } from './compte/compte.component';

import {CompteService} from './compte.service'

@NgModule({
  declarations: [
    AppComponent,
    CompteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CompteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
