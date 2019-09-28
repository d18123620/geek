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

interface CourseDescription {
  name: string,
  description: string,
  previewVideo: string,
  courseIcon: ''
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// import {DataService} from '../services/dataService';

@Component({
  selector: 'app-corsedescription',
  templateUrl: './corsedescription.component.html',
  styleUrls: ['./corsedescription.component.css']
})
export class CorsedescriptionComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadURL1: Observable<string>;
  idToken = '';
  courseName='';
  courseDesc='';
  coursePreview='';
  courseIcon='';
  disableFields = true;

  constructor(private router: Router,private storage: AngularFireStorage,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { 
    
  }

      imgsrc="assets/img/back_btn.png";
      tutorProfile(event: Event) {
        this.router.navigateByUrl('/tutorprofile');
      }
      tutorDash(event: Event) {
        this.router.navigateByUrl('/tutordashboard');
      }
      coursedesign1(event: Event) {
        this.router.navigateByUrl('/tutordashboard');
      }

      uploadVideo(event) {

        console.log('upload files');
        

        const file = event.target.files[0];
        const filePath = '/course/'+Math.floor(Date.now())+'_'+file.name;
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
              });
            })
            )
        .subscribe()
      }
                 
      uploadFile(event) {

        console.log('upload files');
        

        const file = event.target.files[0];
        const filePath = '/course/'+Math.floor(Date.now())+'_'+file.name;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() =>{

              // when this function is executed
              var getDownloadURL = fileRef.getDownloadURL();
              getDownloadURL.subscribe(url => {
                console.log(url);
                this.downloadURL = url;
                this.disableFields = false;        
              });
            })
            )
        .subscribe()
      }


      SaveData(event: Event){

        let courseData = {"name": this.courseName,  "description": this.courseDesc, "previewVideo": this.downloadURL1, "courseIcon": this.downloadURL};
        this.idToken = this.cookieService.get('__session');
        console.log(this.idToken);
        let idTokenBearer =  'Bearer '+this.idToken;
        const requestOptions = {                                                                                                                                                                                 
          headers: new HttpHeaders({'Authorization': idTokenBearer})
        };
      
    
        this.http.post('https://geekcharge.firebaseapp.com/api/v1/tutor/courseCreate',courseData, requestOptions)
        .subscribe 
        (data => {
          console.log(data);
          this.router.navigateByUrl('/tutordashboard');    
        },
        (error: any) => {
          console.log(error);
        }
    
        )
      }

      ngOnInit() {
        this.disableFields = true;
      }

}