import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videoplaylist',
  templateUrl: './videoplaylist.component.html',
  styleUrls: ['./videoplaylist.component.css']
})
export class VideoplaylistComponent implements OnInit {

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
