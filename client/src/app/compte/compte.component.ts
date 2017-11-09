import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compte } from '../models/compte';

@Component({
  selector: 'compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  
  @Input()
  compte:Array<Compte>;


  constructor() {
  }

  ngOnInit() {
  }


}