import { Component, OnInit, Input } from '@angular/core';
import { Action } from '../models/action';

@Component({
  selector: 'action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  @Input()
  compte:Array<Action>;

  constructor() {
  }

  ngOnInit() {
  }


  enregistrer(action){
    this.compte.push(new Action(action.title, action.somme, action.desc, new Date()))
  }

}