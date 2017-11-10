import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compte, Mouvement } from '../models/compte';
import { CompteService } from '../compte.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  indexCompte: number;
  modalTitle: string;
  isDesc: boolean = false;
  column: string = '';


  constructor(private compteService: CompteService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.compteService.getCompte().subscribe(
      (data: Array<Compte>) => {
        if (data.length) {
          this.comptes = data;
        }
      },
      error => {
        console.log('error')
      })
  }

  addMouvement(data) {
    if (data.title && data.price) {
      this.responseMessage = '';
      this.compteService.createMouvement(data, this.comptes[this.indexCompte]._id).subscribe(
        (success) => {
          data.date = new Date();
          this.comptes[this.indexCompte].mouvements.push(data);
        },
        (error) => this.responseMessage = error.error.message
      )
    }
  }

  addCompte(data) {
    if(data.name){
      this.compteService.createCompte(data).subscribe(
        success => {
          this.comptes.push(data);
          this.ngOnInit();
        },
        error => this.responseMessage = error.error.message
      )
    }
  }

  openCompte(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**modal bootstrap */
  open(content, index, title) {
    this.indexCompte = index;
    console.log(index)
    this.modalTitle = title.textContent;
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
      return `with: ${reason}`;
    }
  }
  /*** */

  sort(property, i){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.comptes[i].mouvements.sort(function(a, b){
        if(a[property] < b[property]){
            return -1 * direction;
        }
        else if( a[property] > b[property]){
            return 1 * direction;
        }
        else{
            return 0;
        }
    });
};

}