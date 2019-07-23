import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articledesign',
  templateUrl: './articledesign.component.html',
  styleUrls: ['./articledesign.component.css']
})
export class ArticledesignComponent implements OnInit {

  // constructor() { }
  constructor(private router: Router) { }

  tutorProfile(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  tutorDash(event: Event) {
    this.router.navigateByUrl('/tutordashboard');
  }
  Playlistmenu(event: Event) {
    this.router.navigateByUrl('/playlistmenu');
  }
  Coursefeed(event: Event) {
    this.router.navigateByUrl('/corsefeed');
  }
  coursedesign1(event: Event) {
    this.router.navigateByUrl('/playlistmenu');
  }

  ngOnInit() {
  }

}
