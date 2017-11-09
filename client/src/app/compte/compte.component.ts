import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compte } from '../models/compte';
import { CompteService } from '../compte.service';

@Component({
  selector: 'compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  
  comptes:Array<Compte>;

  constructor(private compteService: CompteService) {
  }

  ngOnInit() {
    this.compteService.getCompte().subscribe((data:Array<Compte>) => {
      this.comptes = data;
      console.log(data[0].mouvements);
    },
    error => {
      console.log('error')
    })
  }


}