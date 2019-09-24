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

interface TutorDescription {
  type: string,
  course: [],
  
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
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

  constructor(private router: Router,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { }

    navigateToCourse(event: any) {
      let courseNumber = event.currentTarget.getAttribute('course_id');
      this.cookieService.set('__CourseId', courseNumber);
      this.router.navigateByUrl('/studentcoursepreview');
    }

  ngOnInit() {
    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': idTokenBearer})
      };

      this.http.get<TutorDescription>('https://geekcharge.firebaseapp.com/api/v1/allCourses', requestOptions )
      .subscribe 
        (data => {
          this.type = data.type;
          this.course = data.course;
          console.log(this.type);
          console.log(this.course)      
        },
         (error: any) => {
             console.log(error.error);
             if (error.error === 'unauthorized'){
              this.cookieService.delete('__session');
              this.cookieService.delete('__profilepic');

              this.router.navigateByUrl('/login');
             }
         }
      
        )
  }

  studentHome(event: Event) {
    
  }

  studentProfile(event: Event) {
    this.router.navigateByUrl('/studentprofile');
  }
  
}
