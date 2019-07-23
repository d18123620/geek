import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corsefeed',
  templateUrl: './corsefeed.component.html',
  styleUrls: ['./corsefeed.component.css']
})
export class CorsefeedComponent implements OnInit {

  // constructor() { }
  constructor(private router: Router) { }
  
  tutorProfile(event: Event) {
      this.router.navigateByUrl('/tutorprofile');
    }
    tutorDash(event: Event) {
      this.router.navigateByUrl('/tutordashboard');
    }
    tutorFeed(event: Event) {
      this.router.navigateByUrl('/corsefeed');
    }
    tutorDesc(event: Event) {
      this.router.navigateByUrl('/coursedescription');
    }
    playlisyMenu(event: Event) {
      this.router.navigateByUrl('/playlistmenu');
    }
    coursedesign1(event: Event) {
      this.router.navigateByUrl('/coursedescription');
    }
  ngOnInit() {
  }

}
