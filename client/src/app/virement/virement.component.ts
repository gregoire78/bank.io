import { Component, OnInit } from '@angular/core';
import { Virement } from '../models/virement';

@Component({
  selector: 'virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  virement:Virement;
  constructor() {
    this.virement = new Virement("",0,"");
   }

  ngOnInit() {
  }

virer(){  
console.log(`${this.virement.destinataire} ${this.virement.montant} ${this.virement.banque}`);
}

}