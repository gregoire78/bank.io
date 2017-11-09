import { Injectable } from '@angular/core';
import { Compte } from './models/compte';
@Injectable()
export class CompteService {

  constructor() { }
  getMouvements():Array<Compte>{
    return [
      
    ];
  }
}
