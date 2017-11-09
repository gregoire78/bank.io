import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Compte } from './models/compte';
import 'rxjs/add/operator/map'

@Injectable()
export class CompteService {

  constructor(private httpUser: HttpClient) { }
  getCompte(){
    return this.httpUser.get('http://localhost:3000/accounts/user', {headers: new HttpHeaders().set('Authorization', sessionStorage.getItem('token'))})
  }
  getMouvements():Array<Compte>{
    return [
      
    ];
  }
}
