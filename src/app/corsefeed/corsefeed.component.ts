import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

interface CourseFeed {
  description: string,
  name: string,
  previewVideo: '',
  courseIcon: '',
  published: '',
  tutorId: '',
  courseItems:''
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-corsefeed',
  templateUrl: './corsefeed.component.html',
  styleUrls: ['./corsefeed.component.css']
})
export class CorsefeedComponent implements OnInit {
  checked = '';
  CourseId = '';
  idToken = '';
  name = '';
  description = '';
  previewVideo = '';
  courseIcon = '';
  courseItems = '';

  // constructor() { }
  constructor(private router: Router, private cookieService: CookieService,public auth: AuthService,
    private afAuth: AngularFireAuth,
    // private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { }
  
  tutorProfile(event: Event) {
      this.router.navigateByUrl('/tutorprofile');
    }
    tutorDash(event: Event) {
      this.router.navigateByUrl('/tutordashboard');
    }
    tutorFeed(event: Event) {
      this.router.navigateByUrl('/corsefeed');
    }
    tutorDesc(event: Event) {
      this.router.navigateByUrl('/coursedescription');
    }
    playlisyMenu(event: Event) {
      this.router.navigateByUrl('/playlistmenu');
    }
    back(event: Event) {
      this.router.navigateByUrl('/tutordashboard');
    }
  ngOnInit() {
    this.CourseId = this.cookieService.get('__CourseId');
    // console.log(this.CourseId);
    this.idToken = this.cookieService.get('__session');
  console.log(this.idToken);
  let idTokenBearer =  'Bearer '+this.idToken;

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': idTokenBearer}),
      };

      

    this.http.get<CourseFeed>('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+this.CourseId,requestOptions)
    .subscribe 
      (data => {
        console.log(data.name);
        console.log(data.description);
        this.name = data.name;
        this.description = data.description;
        this.courseIcon = data.courseIcon;
        console.log(data);
        this.courseItems = data.courseItems;
        this.previewVideo = data.previewVideo;
        console.log(this.previewVideo);
      },
     (error: any) => {
       console.log(error.error);
     }
  
    )

  }


}
