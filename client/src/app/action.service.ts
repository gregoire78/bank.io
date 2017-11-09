import { Injectable } from '@angular/core';
import { Action } from './models/action';

@Injectable()
export class ActionService {

  constructor() { }

  getMouvements():Array<Action>{
    return [
      new Action('abonnement yo', -300, 'description', new Date()),
      new Action('abonnement yo', 500, 'description', new Date()),
      new Action('abonnement yo', 800, 'description', new Date()),
    ]
  }

}
