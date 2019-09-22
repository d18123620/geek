import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-articledesign',
  templateUrl: './articledesign.component.html',
  styleUrls: ['./articledesign.component.css']
})
export class ArticledesignComponent implements OnInit {

  articleTitle:any = '';
  articleBody:any = '';
  idToken:any = '';

  constructor(private router: Router,private storage: AngularFireStorage,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { 
    
  }

  tutorProfile(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  tutorDash(event: Event) {
    this.router.navigateByUrl('/tutordashboard');
  }
  Playlistmenu(event: Event) {
    this.router.navigateByUrl('/playlistmenu');
  }
  Coursefeed(event: Event) {
      console.log(this.articleTitle);   
      console.log(this.articleBody); 

       let  CourseId = this.cookieService.get('__CourseId');

       let noteData = {
          "noteHead": this.articleTitle,
          "noteBody": this.articleBody,
        };

        this.idToken = this.cookieService.get('__session');
        console.log(this.idToken);
        let idTokenBearer =  'Bearer '+this.idToken;
        const requestOptions = {                                                                                        
          headers: new HttpHeaders({'Authorization': idTokenBearer})
         };

         this.http.post('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+CourseId+'/addNote',noteData, requestOptions)
         .subscribe 
         (data => {
           console.log(data);
           this.router.navigateByUrl('/corsefeed');
         },
         (error: any) => {
           console.log(error);
         }
    
         )


  }
  coursedesign1(event: Event) {
    this.router.navigateByUrl('/playlistmenu');
  }

  ngOnInit() {
  }

}
