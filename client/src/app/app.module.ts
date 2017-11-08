import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CompteComponent } from './compte/compte.component';
import {CompteService} from './compte.service';
import { ActionComponent } from './action/action.component';
import { ActionService} from './action.service';

@NgModule({
  declarations: [
    AppComponent,
    CompteComponent,
    ActionComponent
  ],
  imports: [
    BrowserModule, FormsModule, NgbModule.forRoot()
  ],
  providers: [CompteService, ActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
