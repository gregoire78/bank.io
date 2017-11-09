import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { Compte, Mouvement } from './models/compte';
import 'rxjs/add/operator/map'

@Injectable()
export class CompteService {

  constructor(private httpCompte: HttpClient) { }
  getCompte(){
    return this.httpCompte.get('http://localhost:3000/accounts/user', {headers: new HttpHeaders().set('Authorization', sessionStorage.getItem('token'))})
  }
  
  createMouvement(mouvement: Mouvement, id) {
    return this.httpCompte.put(`http://localhost:3000/accounts/add_mouvement?id=${id}`, mouvement, {headers: new HttpHeaders().set('Authorization', sessionStorage.getItem('token'))});
  }
}
