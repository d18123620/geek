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
  courseItems:'',
  tutorName:''
}

interface TutorDescription {
  name: string
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
  studentMyCourse: any;
  isLoaded = false;
  tutorName='....';
  authorName="";

  constructor(private router: Router,
  	private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient) { }

  ngOnInit() {

      this.studentMyCourseAjax();
	    this.idToken = this.cookieService.get('__session');
	  console.log(this.idToken);
	  let idTokenBearer =  'Bearer '+this.idToken;

	      const requestOptions = {                                                                                                                                                                                 
	        headers: new HttpHeaders({'Authorization': idTokenBearer})
	      };
	      
	 
	  this.http.get<TutorDescription>('https://geekcharge.firebaseapp.com/api/v1/profile/', requestOptions )
	  .subscribe 
	    (data => {
	      console.log(data.name);
	      this.tutorName= data.name;
	    },
	     (error: any) => {
	       console.log(error.error);
	     }
	  
	    )
    
  }

  showPreviewPage() {
    
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
        this.isLoaded = true;
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
        this.authorName = data.tutorName;
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

  studentEnroll(event: Event) {
    let courseData = {"courseId": this.CourseId };
        this.idToken = this.cookieService.get('__session');
        console.log(this.idToken);
        let idTokenBearer =  'Bearer '+this.idToken;
        const requestOptions = {                                                                                                                                                                                 
          headers: new HttpHeaders({'Authorization': idTokenBearer})
        };
      
    
        this.http.post('https://geekcharge.firebaseapp.com/api/v1/student/enroll',courseData, requestOptions)
        .subscribe 
        (data => {
          console.log(data);    
        },
        (error: any) => {
          console.log(error);
        }
    
        )
  }

  studentMyCourseAjax() {
    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': idTokenBearer})
      };

      this.http.get<any>('https://geekcharge.firebaseapp.com/api/v1/student/myCourse', requestOptions )
      .subscribe 
        (data => {
          this.studentMyCourse = data.enrollCourse;
          console.log(this.studentMyCourse);

          this.CourseId = this.cookieService.get('__CourseId');

          for (let i = 0; i < this.studentMyCourse.length; i++) {
            if (this.studentMyCourse[i] === this.CourseId) {
                this.router.navigateByUrl('/studentplaylist');

                return;
            }
          }

          this.showPreviewPage();

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

  studentSearch(event: Event) {
    this.router.navigateByUrl('/studentsearch');
  }
  
  studentHome(event: Event) {
    this.router.navigateByUrl('/studentdashboard');
  }

  studentCourse(event: Event) {
    this.router.navigateByUrl('/studentmycourse');
  }

  studentProfile(event: Event) {
    this.router.navigateByUrl('/studentprofile');
  } 

  enrollCourse(event: Event) {
    this.router.navigateByUrl('/studentplaylist');
  }
  
}
