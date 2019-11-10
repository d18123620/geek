import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  selector: 'app-tutor-playlist-note-edit',
  templateUrl: './tutor-playlist-note-edit.component.html',
  styleUrls: ['./tutor-playlist-note-edit.component.css']
})
export class TutorPlaylistNoteEditComponent implements OnInit {
  playlistId:any;
  CourseId:any;
  idToken:any;

  articleTitle:any = '';
  articleBody:any = '';
  
  constructor(private router: Router, private storage: AngularFireStorage,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

   tutorProfile(event: Event) {
      this.router.navigateByUrl('/tutorprofile');
    }
    tutorDash(event: Event) {
      this.router.navigateByUrl('/tutordashboard');
    }

  cancelEdit (event){
    this.router.navigateByUrl('/corsefeed');
  }
  deletePlaylist(event: Event) {
    let idTokenBearer =  'Bearer '+this.idToken;

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': idTokenBearer}),
    };
     
    this.http.delete<any>('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+this.CourseId + '/' + this.playlistId,requestOptions)
    .subscribe 
      ((data => {
        console.log(data.name);
        this.router.navigateByUrl('/corsefeed');
      }),
     (error: any) => {
       console.log(error.error);
       if (error.error === 'unauthorized'){
        this.cookieService.delete('__session');
        this.cookieService.delete('__profilepic');
        this.router.navigateByUrl('/login');
       } else {
        this.router.navigateByUrl('/corsefeed');
       }
     }).add(() => {
        this.router.navigateByUrl('/corsefeed');
     });
  }

  updateCourse(event: Event){

		let noteData = {
		  "playlistType":'note', 
          "noteHead": this.articleTitle,
          "noteBody": this.articleBody,
        };				       

        this.idToken = this.cookieService.get('__session');
        console.log(this.idToken);
        let idTokenBearer =  'Bearer '+this.idToken;
        const requestOptions = {                                                                                                                                                                                 
          headers: new HttpHeaders({'Authorization': idTokenBearer})
        };
      
    
        this.http.patch('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+this.CourseId+'/'+this.playlistId,noteData, requestOptions)
        .subscribe 
        (data => {
          console.log(data);
          this.router.navigateByUrl('/corsefeed');  
        },
        (error: any) => {
          console.log(error);
          
          if (error.error === 'unauthorized'){
            this.cookieService.delete('__session');
            this.cookieService.delete('__profilepic');
            this.router.navigateByUrl('/login');
          } else {
            this.router.navigateByUrl('/corsefeed');
          }

        }
        )
    }

  ngOnInit() {

    this.playlistId = this.activatedRoute.snapshot.queryParams["playlistId"];
    this.CourseId = this.cookieService.get('__CourseId');
    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': idTokenBearer})
    };

    this.http.get<any>('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+this.CourseId+'/'+this.playlistId,requestOptions)
    .subscribe 
      (data => {
        console.log(data);
        this.articleTitle = data.noteHead;
        this.articleBody = data.noteBody;
      }),
     (error: any) => {
       console.log(error.error);
       if (error.error === 'unauthorized'){
        this.cookieService.delete('__session');
        this.cookieService.delete('__profilepic');

        this.router.navigateByUrl('/login');
       }
     }    

  }

}
