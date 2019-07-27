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



@Component({
  selector: 'app-tutorprofile',
  templateUrl: './tutorprofile.component.html',
  styleUrls: ['./tutorprofile.component.css']
})
export class TutorprofileComponent implements OnInit {
  private profile: Observable<any[]> ; 
  idToken = '';
  profilepic = '';
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
        this.router.navigateByUrl('/home');
      }
      signOut(event: Event) {
        let cookieService = this.cookieService;
        let router = this.router;
        this.afAuth.auth.signOut().then(function() {
          // this.cookieService.delete('__session');
          cookieService.delete('__session');
          cookieService.delete('__profilepic');
          // Cookie.delete('__session', '/path');
          // this.cookieService.set('__session', '');

          router.navigateByUrl('/login');

        }, function(error) {
          console.error('Sign Out Error', error);
        });
      }
      tutorDesc(event: Event) {
        this.router.navigateByUrl('/tutordescription');
      }

  ngOnInit() {
    this.profilepic = this.cookieService.get('__profilepic');
    console.log(this.profilepic);
  }

}
