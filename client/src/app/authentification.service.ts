import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthentificationService {
    constructor(private httpUser: HttpClient) { }

    login(username: string, password: string) {
      return this.httpUser.post('http://localhost:3000/users/authenticate', {email: username, password: password}).map(
        (data:any) => {
          console.log(data.token)
          sessionStorage.setItem('token', data.token)
        });
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('token');
    }
}
