import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-description',
  templateUrl: './tutor-description.component.html',
  styleUrls: ['./tutor-description.component.css']
})
export class TutorDescriptionComponent implements OnInit {

  constructor(private router: Router) { }
  tutorProfile(event: Event) {
    this.router.navigateByUrl('/tutorprofile');
  }
  tutorDash(event: Event) {
    this.router.navigateByUrl('/tutordashboard');
  }
  ngOnInit() {
  }

}
