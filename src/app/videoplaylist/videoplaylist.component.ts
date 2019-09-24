import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-videoplaylist',
  templateUrl: './videoplaylist.component.html',
  styleUrls: ['./videoplaylist.component.css']
})
export class VideoplaylistComponent implements OnInit {

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
    private http: HttpClient) { }

  tutorProfile(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  tutorDash(event: Event) {
    this.router.navigateByUrl('/tutordashboard');
  }
  Playlistmenu(event: Event) {
    this.router.navigateByUrl('/playlistmenu');
  }
  // Coursefeed(event: Event) {
  //   this.router.navigateByUrl('/corsefeed');
  // }
  coursedesign1(event: Event) {
    this.router.navigateByUrl('/playlistmenu');
  }


  uploadVideo(event) {

    console.log('upload files');
    const file = event.target.files[0];
    const filePath = '/video/'+Math.floor(Date.now())+'_'+file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() =>{

          // when this function is executed
          var getDownloadURL1 = fileRef.getDownloadURL();
          getDownloadURL1.subscribe(url => {
            console.log(url);
            this.downloadURL1 = url;   
            this.disableFields = false;     
          });
        })
        )
    .subscribe()
  }

  SaveData(event: Event){
    let  CourseId = this.cookieService.get('__CourseId');
    let videoData = {"videoTitle": this.videoTitle,  "videoLink": this.downloadURL1};
    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': idTokenBearer})
    };
    this.http.post('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+CourseId+'/addVideo',videoData, requestOptions)
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

  ngOnInit() {
  }

}
