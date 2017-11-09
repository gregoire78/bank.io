import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentification.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any = {email: 'gregoire.joncour@gmail.com', password:'azerty1'}; //pour test
  returnUrl:string;
  loading = false;
  responseMessage;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
  }

  login(data){
    this.loading = true;
    this.authenticationService.login(this.user.email, this.user.password).subscribe(
      data => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.responseMessage=error.error.message;
        this.loading = false;
      });
  }
}
