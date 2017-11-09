import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compte } from '../models/compte';
import { CompteService } from '../compte.service';

@Component({
  selector: 'compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  
  @Input()
  compte:Array<Compte>;


  constructor(private compteService: CompteService) {
  }

  ngOnInit() {
    this.compteService.getCompte().subscribe(data => {
      console.log(data);
    },
    error => {
      console.log('error')
    })
  }


}