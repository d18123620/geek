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

interface VideoContent {
  videoTitle: string,
  videoLink: ''
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-tutor-playlist-video-edit',
  templateUrl: './tutor-playlist-video-edit.component.html',
  styleUrls: ['./tutor-playlist-video-edit.component.css']
})
export class TutorPlaylistVideoEditComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadURL1: Observable<string>;
  idToken = '';
  videoTitle='';
  videoLink='';
  disableFields = true;

  // constructor() { }
  constructor(private router: Router, private storage: AngularFireStorage,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      // this.http.get<any>('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+this.CourseId,requestOptions)
      // .subscribe 
      //   (data => {
      //   },
      //  (error: any) => {
      //    console.log(error.error);
      //    if (error.error === 'unauthorized'){
      //     this.cookieService.delete('__session');
      //     this.cookieService.delete('__profilepic');

      //     this.router.navigateByUrl('/login');
      //    }
      //  }    
  }

}
