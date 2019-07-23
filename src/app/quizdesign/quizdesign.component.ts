import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quizdesign',
  templateUrl: './quizdesign.component.html',
  styleUrls: ['./quizdesign.component.css']
})
export class QuizdesignComponent implements OnInit {

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
