import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
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
  selector: 'app-student-course-playlist',
  templateUrl: './student-course-playlist.component.html',
  styleUrls: ['./student-course-playlist.component.css']
})

export class StudentCoursePlaylistComponent implements OnInit {
  checked = '';
  CourseId = '';
  idToken = '';
  name = ' ';
  description = '';
  previewVideo = '';
  courseIcon = '';
  courseItems:any = '';
  videoImgSrc: string = "assets/img/video_white.png";
  quizImgSrc: string = "assets/img/Quiz_white.png";
  NoteImgSrc: string = "assets/img/notes_white.png";
  coursePublish: any = false;
  sidenavVisible:any = false;
  activePlaylistItem:any = '';
  isLoaded = false;

  constructor(private router: Router,
    private cookieService: CookieService, 
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore,
    private http: HttpClient,
    private elem: ElementRef) { }


    resetButtons() {
      let quizBtns = this.elem.nativeElement.querySelectorAll('.quizbtn');
      
      for(let i = 0; i<quizBtns.length; i++){
        quizBtns[i].classList.remove('correctAnswer');
        quizBtns[i].classList.remove('wrongAnswer');
        
        if(!quizBtns[i].classList.contains('notAnswered')) {
          quizBtns[i].classList.add('notAnswered');
        }
        

      }
    
    }

    selectPlaylist(event: Event, index) {
      this.activePlaylistItem = index;
      this.closeNav(event);
      this.resetButtons();
    }

    previousPlaylistItem(event: Event){
      if(this.activePlaylistItem != 0) {
         
         this.activePlaylistItem--;
         this.resetButtons();
      }
    }

    nextPlaylistItem(event: Event){
      if(this.activePlaylistItem != (this.courseItems.length - 1) ) {
        
         this.activePlaylistItem++;
         this.resetButtons();
      }
    }

    openSideNav(event: Event) {
        this.sidenavVisible = true;
    }

    /* Set the width of the side navigation to 0 */
    closeNav(event: Event) {
        this.sidenavVisible = false;
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

            let courseItemArray = []

            if (data.courseItems.length > 0){
              //this.activePlaylistItem = this.courseItems[0].playlistID;
              this.activePlaylistItem = 0;
            
              for(let j = 0; j< data.courseItems.length; j++ ) {
                if (data.courseItems[j]['playlistType']) {                
                  courseItemArray.push(data.courseItems[j]);
                }
              }
            
            }

            this.courseItems = courseItemArray;

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

    checkAnswer(event: any){
      let isCorrect = event.currentTarget.getAttribute('isCorrectAnswer');
      if (isCorrect === 'true') {
        event.currentTarget.classList.add('correctAnswer');
        event.currentTarget.classList.remove('notAnswered');
      } else {
        event.currentTarget.classList.add('wrongAnswer');
        event.currentTarget.classList.remove('notAnswered');
      }
    }

    clearAnswers(){

    }
}
