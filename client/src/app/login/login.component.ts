import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any = {email: 'gregoire.joncour@gmail.com', password:'azerty1'}; //pour test
  returnUrl:string;

  constructor(private route: ActivatedRoute, private router: Router,public httpUser: HttpClient) {}

  ngOnInit() {
    this.returnUrl = '/login'; //route
  }

  login(data){
    this.httpUser.post('http://localhost:3000/users/authenticate', data).subscribe((data:any)=>{
      console.log(data.token)
      sessionStorage.setItem('token', data.token)
      this.router.navigateByUrl(this.returnUrl); //redirection vers login
    });
  }
}
