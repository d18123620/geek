import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { TutordashboardComponent } from './tutordashboard/tutordashboard.component';
import { TutorprofileComponent } from './tutorprofile/tutorprofile.component';
import { componentFactoryName } from '@angular/compiler';
import { CorsedescriptionComponent } from './corsedescription/corsedescription.component';
import { CorsefeedComponent } from './corsefeed/corsefeed.component';
import { PlaylistmenuComponent } from './playlistmenu/playlistmenu.component';
import { VideoplaylistComponent } from './videoplaylist/videoplaylist.component';
import { QuizdesignComponent } from './quizdesign/quizdesign.component';
import { ArticledesignComponent } from './articledesign/articledesign.component';
import { CookieService } from 'ngx-cookie-service';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import {DataService} from './services/dataService';
import { HttpClientModule } from '@angular/common/http';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentCoursePlaylistComponent } from './student-course-playlist/student-course-playlist.component';
import { StudentCoursePreviewComponent } from './student-course-preview/student-course-preview.component';
import { TutorCourseInfoEditComponent } from './tutor-course-info-edit/tutor-course-info-edit.component';
import { TutorPlaylistVideoEditComponent } from './tutor-playlist-video-edit/tutor-playlist-video-edit.component';
import { TutorPlaylistQuizEditComponent } from './tutor-playlist-quiz-edit/tutor-playlist-quiz-edit.component';
import { TutorPlaylistNoteEditComponent } from './tutor-playlist-note-edit/tutor-playlist-note-edit.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentMycourseComponent } from './student-mycourse/student-mycourse.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tutordashboard', component: TutordashboardComponent },
  { path: 'tutorprofile', component: TutorprofileComponent },
  { path: 'coursedescription', component: CorsedescriptionComponent },
  { path: 'corsefeed', component: CorsefeedComponent },
  { path: 'playlistmenu', component: PlaylistmenuComponent },
  { path: 'videoplaylist', component: VideoplaylistComponent },
  { path: 'quizdesign', component: QuizdesignComponent },
  { path: 'articledesign', component: ArticledesignComponent },
  { path: 'loadingScreen', component: LoadingScreenComponent },
  { path: 'studentdashboard', component: StudentDashboardComponent },
  { path: 'studentprofile', component: StudentProfileComponent },
  { path: 'studentplaylist', component: StudentCoursePlaylistComponent },
  { path: 'studentcoursepreview', component: StudentCoursePreviewComponent },
  { path: 'studentsearch', component: StudentSearchComponent }, 
  { path: 'courseinfoedit', component: TutorCourseInfoEditComponent },
  { path: 'tutorvideoedit', component: TutorPlaylistVideoEditComponent },
  { path: 'tutorquizedit', component: TutorPlaylistQuizEditComponent },
  { path: 'tutornoteedit', component: TutorPlaylistNoteEditComponent },  
  { path: 'studentmycourse', component: StudentMycourseComponent },
  { path: '', redirectTo: '/loadingScreen', pathMatch: 'full' } 
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TutordashboardComponent,
    TutorprofileComponent,
    CorsedescriptionComponent,
    CorsefeedComponent,
    PlaylistmenuComponent,
    VideoplaylistComponent,
    QuizdesignComponent,
    ArticledesignComponent,
    LoadingScreenComponent,
    ToggleButtonComponent,
    SuperSecretComponent,
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentCoursePlaylistComponent,
    StudentCoursePreviewComponent,
    TutorCourseInfoEditComponent,
    TutorPlaylistVideoEditComponent,
    TutorPlaylistQuizEditComponent,
    TutorPlaylistNoteEditComponent,
    StudentSearchComponent,
    StudentMycourseComponent        
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [CookieService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
