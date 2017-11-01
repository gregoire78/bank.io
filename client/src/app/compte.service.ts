import { Injectable } from '@angular/core';
import { Compte } from './models/compte';
@Injectable()
export class CompteService {

  constructor() { }
  getMouvements():Array<Compte>{
    return [
      new Compte('Chèque', 34.45, new Date()),
      new Compte('Abonnement Muscu', -34.45, new Date()),
      new Compte('Concert', -55, new Date()),
      new Compte('Apple', -700, new Date()),
      new Compte('Salaire', 1000, new Date())
    ];
  }
}