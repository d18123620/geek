import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutordashboard',
  templateUrl: './tutordashboard.component.html',
  styleUrls: ['./tutordashboard.component.css']
})
export class TutordashboardComponent implements OnInit {
    // constructor() { }
    constructor(private router: Router) { }
  
    tutorProfile(event: Event) {
        this.router.navigateByUrl('/tutorprofile');
      }
      tutorDash(event: Event) {
        this.router.navigateByUrl('/tutordashboard');
      }
    coursedesign1(event: Event) {
        this.router.navigateByUrl('/coursedescription');
      }
  ngOnInit() {
  }

}
