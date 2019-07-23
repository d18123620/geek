import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
// import {  } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private cookieService: CookieService
  ) { 
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if(user) {
    //       return this.afs.doc<User>('users/${user.uid}').valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
    this.user$=afAuth.authState;
  }

  

  // async signIn() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const googleAuthResponse: any = await this.afAuth.auth.signInWithRedirect(provider);
  //   // return this.updateUserData(credential.user);
  //   this.cookieService.set('__session', googleAuthResponse.credential.idToken);
  //   this.router.navigateByUrl('/home');
  // }

  async signIn() {
    /*
      const provider = new auth.GoogleAuthProvider();
      const googleAuthResponse: any = await this.afAuth.auth.signInWithPopup(provider);
      // return this.updateUserData(credential.user);
      this.cookieService.set('__session', googleAuthResponse.credential.idToken);
      this.router.navigateByUrl('/home');
    */

   const provider = new auth.GoogleAuthProvider();
   let firebase = this.afAuth;

   //firebase.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

   firebase.auth.signInWithRedirect(provider);
   this.cookieService.set('fromLogin','true');
  //  firebase.auth.signInWithRedirect(provider).then(function() {
  //   return firebase.auth.getRedirectResult();
  //   }).then(function(result: any) {
  //     // This gives you a Google Access Token.
  //     // You can use it to access the Google API.

  //     alert('login success');
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     // ...
  //   }).catch(function(error) {
  //     alert('login failed');
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //   });
  } 



  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}'); 

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    // this.router.navigateByUrl('/home');
    };

    return userRef.set(data, { merge: true });
  }
}
