import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {DataService} from '../services/dataService';

@Component({
  selector: 'app-corsedescription',
  templateUrl: './corsedescription.component.html',
  styleUrls: ['./corsedescription.component.css']
})
export class CorsedescriptionComponent implements OnInit {

  // constructor() { }
  constructor(private router: Router) { }
  imgsrc="assets/img/back_btn.png";
    tutorProfile(event: Event) {
        this.router.navigateByUrl('/tutorprofile');
      }
      tutorDash(event: Event) {
        this.router.navigateByUrl('/tutordashboard');
      }
      tutorFeed(event: Event) {
        this.router.navigateByUrl('/corsefeed');
      }
      coursedesign1(event: Event) {
        this.router.navigateByUrl('/tutordashboard');
      }
// abc(){
//   this.dataService.Dummy();
// }
  
  ngOnInit() {
    
  }

}
// , private dataService:DataService