import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Observable} from 'rxjs/';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService ) { }
  tutorProfile(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  tutorDash(event: Event) {
    this.router.navigateByUrl('/tutordashboard');
  }
  back(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  ngOnInit() {
  this.idToken = this.cookieService.get('__session');
  console.log(this.idToken);
  let idTokenBearer =  'Bearer '+this.idToken;
  // let headers = new HttpHeaders();
  // headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', idTokenBearer);
  const requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders({'Authorization': idTokenBearer})
  };
  this.http.get('https://geekcharge.firebaseapp.com/api/v1/profile/', requestOptions )
  .subscribe( 
    (res: Response)=> {
      console.log(res);
    },
    (error: any) => {
      console.log(error.error);
    },
  )
  }

}
