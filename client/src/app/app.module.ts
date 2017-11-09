import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { CompteComponent } from './compte/compte.component';
import {CompteService} from './compte.service';
import { NumborPipe } from './numbor.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    AuthentificationService,
    AuthGuard,
    CompteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
