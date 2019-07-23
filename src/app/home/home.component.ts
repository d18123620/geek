import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // constructor() { }
  constructor(private router: Router) { }

  tutorScope(event: Event) {
      this.router.navigateByUrl('/tutordashboard');
    }

  ngOnInit() {
  }

}
