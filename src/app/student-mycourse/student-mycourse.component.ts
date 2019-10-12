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
  enrollCourse: [],
  
}
@Component({
  selector: 'app-student-mycourse',
  templateUrl: './student-mycourse.component.html',
  styleUrls: ['./student-mycourse.component.css']
})
export class StudentMycourseComponent implements OnInit {
  idToken = '';
  course : any;
  profileObservable: Observable<Object>;
  courseIcon: any;
  myCourseArray: any = [];

  constructor(private router: Router,private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { }

    studentSearch(event: Event) {
      this.router.navigateByUrl('/studentsearch'); 
    }
  
    studentCourse(event: Event) {
      this.router.navigateByUrl('/studentmycourse');  	
    }
  
    studentHome(event: Event) {
      this.router.navigateByUrl('/studentdashboard');
    }
  
    studentProfile(event: Event) {
      this.router.navigateByUrl('/studentprofile');
    }


  navigateToCourse(event: any) {
    let courseNumber = event.currentTarget.getAttribute('course_id');
    this.cookieService.set('__CourseId', courseNumber);
    this.router.navigateByUrl('/studentplaylist');
  }    

  getCourseInfo(CourseId) {

    if(!CourseId){
      return;
    }

    // console.log(this.CourseId);
    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': idTokenBearer}),
    };
     
    this.http.get<any>('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+CourseId,requestOptions)
    .subscribe 
      (data => {
        console.log(data.name);
        console.log(data.description);

        let name = data.name;
        let courseIcon = data.courseIcon;

        this.myCourseArray.push({
          name: name,
          courseIcon: courseIcon,
          courseId: CourseId
        });

        console.log(this.myCourseArray);

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

  ngOnInit() {
    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': idTokenBearer})
      };

      this.http.get<TutorDescription>('https://geekcharge.firebaseapp.com/api/v1/student/myCourse', requestOptions )
      .subscribe 
        (data => {
          this.course = data.enrollCourse;
          console.log(this.course)  
          for (let i = 0; i < this.course.length; i++) {
            this.getCourseInfo(this.course[i]);
          }
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

}
