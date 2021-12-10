import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingServiceService } from 'src/app/loading-service.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService, private loader: LoadingServiceService,
    private router:Router){
  }

  public isLoggedIn=false;
  loading$ = this.loader.loading$;
  model = {
    email: '',
    password: ''
  };

  err: boolean = false;
  errorMsg: any;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ngOnInit(): void {
    this.checkLogin();
  }

  getStorageItem() {
    return localStorage.getItem('email');
  }

  checkLogin(){
    var email = this.getStorageItem()?.toString();
    if(email != null){
      this.router.navigate(["admin/dashboard"]);
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    this.authService.singIn(email, password).subscribe(
      res => {
        console.log(res);
        this.isLoggedIn = true;
        localStorage.setItem('email', JSON.stringify(res.email));
        this.router.navigate(['admin/dashboard']);
      },
      err => {
        console.log(err);
        if (err.error.error.message == 'EMAIL_NOT_FOUND') {
          this.errorMsg = "There is no user record found corresponding to this Email. The user may have been deleted."
        }
        else if (err.error.error.message == 'INVALID_PASSWORD') {
          this.errorMsg = "The Password is invalid."
        }
        this.err = true;
      }
    )
  }


  
 
}
