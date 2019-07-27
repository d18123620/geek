import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AngularFireModule} from '@angular/fire';
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
import { TutorDescriptionComponent } from './tutor-description/tutor-description.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tutordashboard', component: TutordashboardComponent},
  { path: 'tutorprofile', component: TutorprofileComponent},
  { path: 'coursedescription', component: CorsedescriptionComponent },
  { path: 'corsefeed', component: CorsefeedComponent },
  { path: 'playlistmenu', component: PlaylistmenuComponent},
  { path: 'videoplaylist', component: VideoplaylistComponent},
  { path: 'quizdesign', component: QuizdesignComponent},
  {path:'articledesign', component: ArticledesignComponent},
  {path: 'loadingScreen', component: LoadingScreenComponent},
  {path: 'tutordescription', component: TutorDescriptionComponent},
  {path: '', redirectTo: '/loadingScreen', pathMatch: 'full'} 
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,    
    TutordashboardComponent,
    TutorprofileComponent,
    CorsedescriptionComponent,
    CorsefeedComponent,
    PlaylistmenuComponent,
    VideoplaylistComponent,
    QuizdesignComponent,
    ArticledesignComponent,
    LoadingScreenComponent,
    TutorDescriptionComponent,
    ToggleButtonComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [CookieService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
