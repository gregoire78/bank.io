import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compte, Mouvement } from '../models/compte';
import { CompteService } from '../compte.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  comptes: Array<any>;
  mouvements: Array<Mouvement> = [];
  responseMessage: string;
  closeResult: string;


  constructor(private compteService: CompteService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.compteService.getCompte().subscribe(
      (data: Array<Compte>) => {
        if (data.length) {
          this.comptes = data;
          console.log(this.comptes);
        }
      },
      error => {
        console.log('error')
      })
  }

  addMouvement(data) {
    if (data.title && data.price) {
      data.date = new Date();
      this.responseMessage = '';
      console.log(data)
      this.compteService.createMouvement(data, this.comptes[0]._id).subscribe(
        (success) => {
          console.log(success);
          this.comptes[0].mouvements.push(data);
        },
        (error) => this.responseMessage = error.error.message
      )
    }
  }

  modal(chaine){
    alert(chaine)
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}