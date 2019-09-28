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
  CourseId: any;
  playlistId: any;
  disableFieldsVideo:any;

  // constructor() { }
  constructor(private router: Router, private storage: AngularFireStorage,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  cancelEdit (event){
    this.router.navigateByUrl('/corsefeed');
  }

  uploadVideo(event) {

    console.log('upload files');

    this.disableFieldsVideo = true;
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
            this.videoLink = url;
            this.disableFieldsVideo = false;
          });
        })
        )
    .subscribe()
  }  

  updateCourse(event: Event){

        let videoData = {"playlistType":'video', "videoTitle": this.videoTitle,  "videoLink": this.downloadURL1};

        this.idToken = this.cookieService.get('__session');
        console.log(this.idToken);
        let idTokenBearer =  'Bearer '+this.idToken;
        const requestOptions = {                                                                                                                                                                                 
          headers: new HttpHeaders({'Authorization': idTokenBearer})
        };
      
    
        this.http.patch('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+this.CourseId+'/'+this.playlistId,videoData, requestOptions)
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
        this.videoTitle = data.videoTitle;
        this.videoLink = data.videoLink;        
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
