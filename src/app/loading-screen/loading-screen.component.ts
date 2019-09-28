import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// import { Http } from '@angular/common/http';
import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';
import {Observable} from 'rxjs/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})

export class LoadingScreenComponent implements OnInit {
  private usercheck: Observable<any[]> ; 
  idToken = '';
  
  usercheckObservable: Observable<Object>;
  constructor(private cookieService: CookieService,private router: Router, private http: HttpClient, private zone: NgZone, ) { }

  checkUser(){
    let zone = this.zone;
    // console.log('__session')
    this.idToken = this.cookieService.get('__session');
    
    console.log(this.idToken);
    if (!this.idToken)
    {
      this.router.navigateByUrl('/login');
    }
    else
    {
      let idTokenBearer =  'Bearer '+this.idToken;

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders({'Authorization': idTokenBearer})
      };
      
      this.http.get('https://geekcharge.firebaseapp.com/api/v1/userCheck/', requestOptions)
      .subscribe( 
        (res: Response)=> {
          const sachin = res;
          this.router.navigateByUrl('/studentdashboard');
          console.log(sachin);
        },
        (error: any) => {
          // console.log(error.error);
          this.router.navigateByUrl('/login');
        },
      )
    }
  }

  ngOnInit() {
   this.checkUser();
  }

}
