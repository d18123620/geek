import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  openModel() {
    //this.myModal.nativeElement.className = 'modal fade show';
    $(this.myModal.nativeElement).modal('show');
  }

  closeModel() {
     $(this.myModal.nativeElement).modal('hide');
  }

  @ViewChild('myModel', {static: false}) myModal;

  // constructor() { }
  constructor(private router: Router,private cookieService: CookieService) { }

  tutorScope(event: Event) {
      let emailHD = this.cookieService.get('__emailHD');
      // if (emailHD === 'mydit.ie') {
      //     this.router.navigateByUrl('/tutordashboard');
      // } else {
      //     this.openModel();
      // }
      
      this.router.navigateByUrl('/tutordashboard');
    }

  studentScope(event: Event) {
      this.router.navigateByUrl('/studentdashboard');
    }
    
  ngOnInit() {
  }

}
