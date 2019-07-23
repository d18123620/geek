import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlistmenu',
  templateUrl: './playlistmenu.component.html',
  styleUrls: ['./playlistmenu.component.css']
})


export class PlaylistmenuComponent implements OnInit {
  imgSrc: string = "assets/img/video_white.png";
  imgSrc1: string = "assets/img/Quiz_white.png";
  imgSrc2: string = "assets/img/notes_white.png";
  // constructor() { }
  constructor(private router: Router) { }
  
  tutorProfile(event: Event) {
      this.router.navigateByUrl('/tutorprofile');
    }
    tutorDash(event: Event) {
      this.router.navigateByUrl('/tutordashboard');
    }
    video(event: Event) {
      this.router.navigateByUrl('/videoplaylist');
    }
    quiz(event: Event) {
      this.router.navigateByUrl('/quizdesign');
    }
    article(event: Event) {
      this.router.navigateByUrl('/articledesign');
    }

    onMouseOver_video(): void {
      this.imgSrc = "assets/img/video_yellow.png";
    }

    onMouseOut_video(): void {
      this.imgSrc = "assets/img/video_white.png";
    }

    onMouseOver_quiz(): void {
      this.imgSrc1 = "assets/img/Quiz_yellow.png";
    }

    onMouseOut_quiz(): void {
      this.imgSrc1 = "assets/img/Quiz_white.png";
    }

    onMouseOver_article(): void {
      this.imgSrc2 = "assets/img/notes_yellow.png";
    }

    onMouseOut_article(): void {
      this.imgSrc2 = "assets/img/notes_white.png";
    }
    coursedesign1(event: Event) {
      this.router.navigateByUrl('/corsefeed');
    }
    
  ngOnInit() {
  }

}
