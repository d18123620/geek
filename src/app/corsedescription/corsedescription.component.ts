import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

// import {DataService} from '../services/dataService';

@Component({
  selector: 'app-corsedescription',
  templateUrl: './corsedescription.component.html',
  styleUrls: ['./corsedescription.component.css']
})
export class CorsedescriptionComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private router: Router,private storage: AngularFireStorage) { 
    
  }

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

      uploadFile(event) {

        console.log('upload files');

        const file = event.target.files[0];
        const filePath = '/course/'+Math.floor(Date.now())+'_'+file.name;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => this.downloadURL = fileRef.getDownloadURL() )
         )
        .subscribe()
      }

      ngOnInit() {

      }

}
// , private dataService:DataService