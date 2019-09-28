import { CookieService } from 'ngx-cookie-service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Component, OnInit, NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

// import { Component, OnInit, ɵSWITCH_RENDERER2_FACTORY__POST_R3__ } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders  } from '@angular/common/http';
// import {Observable} from 'rxjs/';
// import { CookieService } from 'ngx-cookie-service';


interface TutorDescription {
  description: string,
  name: string
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-tutorprofile',
  templateUrl: './tutorprofile.component.html',
  styleUrls: ['./tutorprofile.component.css']
})
export class TutorprofileComponent implements OnInit {
  private profile: Observable<any[]> ; 
  idToken = '';
  profilepic = '';
  tutorName='';
  tutorDesc='';
  profileObservable: Observable<Object>;

  // constructor() { }
  constructor(private router: Router,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { }

  
  
    tutorProfile(event: Event) {
        this.router.navigateByUrl('/tutorprofile');
      }
      tutorDash(event: Event) {
        this.router.navigateByUrl('/tutordashboard');
      }
      Selection(event: Event) {
        this.router.navigateByUrl('/studentdashboard');
      }
      signOut(event: Event) {
        let cookieService = this.cookieService;
        let router = this.router;
        this.afAuth.auth.signOut().then(function() {
          // this.cookieService.delete('__session');
          cookieService.delete('__session');
          cookieService.delete('__profilepic');
          cookieService.delete('__emailHD');
          // Cookie.delete('__session', '/path');
          // this.cookieService.set('__session', '');

          router.navigateByUrl('/login');

        }, function(error) {
          console.error('Sign Out Error', error);
        });
      }
      tutorDesc1(event: Event) {
        this.router.navigateByUrl('/tutordescription');
      }
      SaveData(event: Event){

        let profileData = {"name":this.tutorName,"description":this.tutorDesc}
    
        let router = this.router;
        this.idToken = this.cookieService.get('__session');
        console.log(this.idToken);
        let idTokenBearer =  'Bearer '+this.idToken;
        const requestOptions = {                                                                                                                                                                                 
          headers: new HttpHeaders({'Authorization': idTokenBearer})
        };
      
    
        this.http.post('https://geekcharge.firebaseapp.com/api/v1/profile/',profileData, requestOptions)
        .subscribe 
        (data => {
          console.log(data);
    
    
        },
        (error: any) => {
          console.log(error);
        }
    
        )
      }

  ngOnInit() {
    this.profilepic = this.cookieService.get('__profilepic');
    console.log(this.profilepic);
    this.idToken = this.cookieService.get('__session');
  console.log(this.idToken);
  let idTokenBearer =  'Bearer '+this.idToken;

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': idTokenBearer})
      };
      
 
  this.http.get<TutorDescription>('https://geekcharge.firebaseapp.com/api/v1/profile/', requestOptions )
  .subscribe 
    (data => {
      console.log(data.name);
      console.log(data.description);
      this.tutorName= data.name;
      this.tutorDesc= data.description;
    },
     (error: any) => {
       console.log(error.error);
     }
  
    )
  }

}
