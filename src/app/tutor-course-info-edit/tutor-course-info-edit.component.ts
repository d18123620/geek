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
  selector: 'app-tutor-course-info-edit',
  templateUrl: './tutor-course-info-edit.component.html',
  styleUrls: ['./tutor-course-info-edit.component.css']
})
export class TutorCourseInfoEditComponent implements OnInit {
	uploadPercent: Observable<number>;
	// downloadURL: Observable<string>;
	// downloadURL1: Observable<string>;
	idToken = '';
	courseName='';
	courseDesc='';
	coursePreview='';
	courseIcon='';
	disableFields = false;
	disableFieldsImg = false;
	disableFieldsVideo = false;	
	checked = '';
	CourseId = '';
	name = ' ';
	description = '';
	previewVideo = '';
	courseItems = '';
	videoImgSrc: string = "assets/img/video_white.png";
	quizImgSrc: string = "assets/img/Quiz_white.png";
	NoteImgSrc: string = "assets/img/notes_white.png";
	coursePublish:any;

    constructor(private router: Router,private storage: AngularFireStorage,private cookieService: CookieService, 
			    public auth: AuthService,
			    private afAuth: AngularFireAuth,
			    private zone: NgZone,
			    private afs: AngularFirestore,
			    private http: HttpClient){

			    }

	imgsrc="assets/img/back_btn.png";
	tutorProfile(event: Event) {
		this.router.navigateByUrl('/tutorprofile');
	}
	tutorDash(event: Event) {
		this.router.navigateByUrl('/tutordashboard');
	}
	coursedesign1(event: Event) {
		this.router.navigateByUrl('/corsefeed?courseInfo=true');
	}
	updateCourse(event: Event){

        let courseData = {"name": this.courseName,  "description": this.courseDesc, "previewVideo": this.coursePreview, "courseIcon": this.courseIcon, "published": this.coursePublish};

        this.idToken = this.cookieService.get('__session');
        console.log(this.idToken);
        let idTokenBearer =  'Bearer '+this.idToken;
        const requestOptions = {                                                                                                                                                                                 
          headers: new HttpHeaders({'Authorization': idTokenBearer})
        };
      
    
        this.http.patch('https://geekcharge.firebaseapp.com/api/v1/tutor/course/'+this.CourseId,courseData, requestOptions)
        .subscribe 
        (data => {
          console.log(data);
          this.router.navigateByUrl('/corsefeed?courseInfo=true');  
        },
        (error: any) => {
          console.log(error);
          this.router.navigateByUrl('/corsefeed?courseInfo=true');
        }
        )
    }

	publishChange(event: Event, publish) {
		this.coursePublish = publish;
	}

	uploadVideo(event) {

		console.log('upload files');

		this.disableFieldsVideo = true;
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
		        this.coursePreview = url;
		        this.disableFieldsVideo = false;
		      });
		    })
		    )
		.subscribe()
	}

  	uploadFile(event) {

	    console.log('upload files');	    
	    this.disableFieldsImg = true;

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
	            this.courseIcon = url;
	            this.disableFieldsImg = false;
	          });
	        })
	        )
	    .subscribe()
  	}

  ngOnInit() {
  	// pre-fetch
  	// edit

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
          this.courseName = data.name;
          this.courseDesc = data.description;
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

}
