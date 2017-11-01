import { Component } from '@angular/core';
import { Compte } from './models/compte';
import { CompteService } from './compte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  compteParent:Array<Compte>;

  constructor(public compteSrv:CompteService){
    this.compteParent = this.compteSrv.getMouvements();
  }

}