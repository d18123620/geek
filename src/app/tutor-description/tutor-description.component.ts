import { Component, OnInit, ɵSWITCH_RENDERER2_FACTORY__POST_R3__ } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Observable} from 'rxjs/';
import { CookieService } from 'ngx-cookie-service';

interface TutorDescription {
  description: string,
  name: string
}


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-tutor-description',
  templateUrl: './tutor-description.component.html',
  styleUrls: ['./tutor-description.component.css']
})
 

export class TutorDescriptionComponent implements OnInit {
  private profile: Observable<any[]> ; 
  idToken = '';
  profileObservable: Observable<Object>;
  tutorName='';
  tutorDesc='';

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService ) {}
  
  tutorProfile(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  tutorDash(event: Event) {
    this.router.navigateByUrl('/tutordashboard');
  }
  back(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  SaveData(event: Event){

    let profileData = {"name":this.tutorName,"description":this.tutorDesc}

    let router = this.router;
    this.idToken = this.cookieService.get('__session');
    console.log(this.idToken);
    let idTokenBearer =  'Bearer '+this.idToken;
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'Authorization': idTokenBearer})
    };
  

    this.http.post('https://geekcharge.firebaseapp.com/api/v1/profile/',profileData, requestOptions)
    .subscribe 
    (data => {
      console.log(data);
    },
    (error: any) => {
      console.log(error);
    }

    )
    this.router.navigateByUrl('/tutorprofile');
  }
  ngOnInit() {
 
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
      console.log(data.description);
      this.tutorName= data.name;
      this.tutorDesc= data.description;
    },
     (error: any) => {
       console.log(error.error);
     }
  
    )
  }

} 
