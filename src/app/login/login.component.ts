import { Component, OnInit, NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  //implements OnInit
  // constructor() { }
  // constructor(private router: Router) { }
  constructor(public auth: AuthService,
              private afAuth: AngularFireAuth,
              private cookieService: CookieService,
              private router: Router,
              private zone: NgZone,
              private afs: AngularFirestore){


                if(this.cookieService.get('fromLogin') === 'true'){
                  this.googleAuthRedirectCheck();
                  this.cookieService.delete('fromLogin');
                }

              }
              
  googleAuthRedirectCheck() {
    let cookieService = this.cookieService;
    let router = this.router;
    let zone = this.zone;
    cookieService.delete('__session');
    this.afAuth.auth.getRedirectResult().then(function(result: any) {
      console.log(result);
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        
        var token = result.credential.idToken;
        //this.cookie.set('__session', token);
        console.log(token);
        
        cookieService.set('__session', token);
        zone.run(() => router.navigate(['/home'])).then();
        // router.navigateByUrl('/home');
        // ...
      }
      console.log(result);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(error);
    });
  }

  // handleClick(event: Event) {
  //   this.router.navigateByUrl('/home');
  // }
}
