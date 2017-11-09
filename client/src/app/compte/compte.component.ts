import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compte, Mouvement } from '../models/compte';
import { CompteService } from '../compte.service';

@Component({
  selector: 'compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  
  comptes:Array<any>;
  mouvements:Array<Mouvement>=[];

  constructor(private compteService: CompteService) {
  }

  ngOnInit() {
    this.compteService.getCompte().subscribe((data:Array<Compte>) => {
      this.comptes = data;
      this.mouvements.push(data[0].mouvements);
      console.log(this.mouvements);
    },
    error => {
      console.log('error')
    })
  }

  addMouvement(data){
    data.date = new Date();
    this.comptes[0].mouvements.push(data);
    console.log(data)
    this.compteService.createMouvement(data, '5a0216451a799200419c4643').subscribe((data)=>console.log(data))
  }


}