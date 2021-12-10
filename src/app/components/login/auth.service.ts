import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config } from 'src/app/config';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as  firebase from "firebase/app";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth, private router: Router) {
  }

  public isLoggedInn(): boolean {
    return !!this.firebaseAuth.currentUser;
  }

  singIn(email: string, password: string) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true,

    })
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.API_KEY}`, {
      requestType: "PASSWORD_RESET",
      email: email
    })
  }



  logout() {
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('email');
      this.router.navigate(['signin']);
    });
  }
}
