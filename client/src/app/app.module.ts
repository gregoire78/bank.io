import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentification.service';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { CompteComponent } from './compte/compte.component';
import {CompteService} from './compte.service';
import { ActionComponent } from './action/action.component';
import { ActionService} from './action.service';
import { NumborPipe } from './numbor.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActionComponent,
    CompteComponent,
    NumborPipe
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    routing, 
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    ActionService,
    CompteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
