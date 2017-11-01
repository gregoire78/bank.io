import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;

  constructor() {
    this.user = new User
   }

  ngOnInit() {
  }
enregistrer(){
  console.log(`${this.user.username} ${this.user.password}`)
}
}
