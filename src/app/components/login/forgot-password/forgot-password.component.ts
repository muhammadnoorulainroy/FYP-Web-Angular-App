import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingServiceService } from 'src/app/loading-service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authSerive: AuthService, private loader:LoadingServiceService,
    private router: Router) { }

  loading$ = this.loader.loading$;
  model ={
    email :'',
    password:''
  };

  err:boolean = false;
  errorMsg:any;
  linksent:boolean = false;

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
   
  onSubmit(form: NgForm){
    this.authSerive.forgotPassword(form.value.email).subscribe(
      res=>{
        console.log(res);
        this.linksent = true;
      },
      err=>{
        console.log(err);
        if(err.error.error.message=='EMAIL_NOT_FOUND'){
          this.errorMsg = "There is no user record found corresponding to this Email. The user may have been deleted."
        }
        this.err= true;
      }
    )
  }

}
