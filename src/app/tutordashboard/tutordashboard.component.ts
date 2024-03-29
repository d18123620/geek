import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AppComponent } from '../app.component';


interface TutorDescription {
  type: string,
  course: [],
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-tutordashboard',
  templateUrl: './tutordashboard.component.html',
  styleUrls: ['./tutordashboard.component.css']
})
export class TutordashboardComponent implements OnInit {
  idToken = '';
  type='';
  course= [];
  courseItem = '';
  courseId = '';
  description = '';
  name = '';
  previewVideo = '';
  published = '';
  tutorId = '';
  profileObservable: Observable<Object>;
  courseIcon: any;
  publishedCourses: any = [];
  unpublishedCourses: any = [];
  isLoaded:any = false;

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
      coursedesign1(event: Event) {
        this.router.navigateByUrl('/coursedescription');
      }

      navigateToCourse(event: any) {
        let courseNumber = event.currentTarget.getAttribute('course_id');
        this.cookieService.set('__CourseId', courseNumber);
        this.router.navigateByUrl('/corsefeed');
      }

  ngOnInit() {

    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': idTokenBearer})
      };
      
 
  this.http.get<TutorDescription>('https://geekcharge.firebaseapp.com/api/v1/tutor/myCourses', requestOptions )
  .subscribe 
    (data => {
      this.isLoaded = true;
      this.type = data.type;
      this.course = data.course;
      console.log(this.type);
      console.log(this.course);
      this.courseIcon = data.course;

      if (this.course.length) {
        for (let i  = 0; i < this.course.length; i++) {
          if (this.course[i].published) {
            this.publishedCourses.push(this.course[i]);
          } else {
            this.unpublishedCourses.push(this.course[i]);
          }
        }
      }
      
    },
     (error: any) => {
         console.log(error.error);
         if (error.error === 'unauthorized'){
          this.cookieService.delete('__session');
          this.cookieService.delete('__profilepic');

          this.router.navigateByUrl('/login');
         }
     },
     
    )


  }

}
