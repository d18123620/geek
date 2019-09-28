import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

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
  selector: 'app-student-course-preview',
  templateUrl: './student-course-preview.component.html',
  styleUrls: ['./student-course-preview.component.css']
})
export class StudentCoursePreviewComponent implements OnInit {
  checked = '';
  CourseId = '';
  idToken = '';
  name = ' ';
  description = '';
  previewVideo = '';
  courseIcon = '';
  courseItems = '';
  videoImgSrc: string = "assets/img/video_white.png";
  quizImgSrc: string = "assets/img/Quiz_white.png";
  NoteImgSrc: string = "assets/img/notes_white.png";
  coursePublish: any = false;

  constructor(private router: Router,
  	private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { }

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
          this.coursePublish = data.published;
          console.log(data);
          this.courseItems = data.courseItems;
          this.previewVideo = data.previewVideo;
          console.log(this.previewVideo);
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
    this.router.navigateByUrl('/studentdashboard');
  }

  studentProfile(event: Event) {
    this.router.navigateByUrl('/studentprofile');
  } 

  enrollCourse(event: Event) {
    this.router.navigateByUrl('/studentplaylist');
  }
  
}
