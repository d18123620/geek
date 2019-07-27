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
// import { Profile } from 'selenium-webdriver/firefox';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
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
    let firebase = this.afAuth;
    firebase.auth.getRedirectResult().then(function(result: any) {
      console.log(result);
      // console.log(result.additionalUserInfo.profile.picture);
      let Profilepic = result.additionalUserInfo.profile.picture;
      cookieService.set('__profilepic', Profilepic);
      
      if (result.credential) {
        
        firebase.auth.currentUser.getIdToken(true).then(function(idToken) {          
          console.log(idToken);
          cookieService.set('__session', idToken);
          zone.run(() => router.navigate(['/home'])).then();          
        }).catch(function(error) {
          // Handle error
        });

      }
      console.log(result);
    }).catch(function(error) {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential; 
      console.log(error);
    });
  }
}
