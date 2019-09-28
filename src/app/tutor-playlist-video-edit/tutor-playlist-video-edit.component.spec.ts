import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPlaylistVideoEditComponent } from './tutor-playlist-video-edit.component';

describe('TutorPlaylistVideoEditComponent', () => {
  let component: TutorPlaylistVideoEditComponent;
  let fixture: ComponentFixture<TutorPlaylistVideoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPlaylistVideoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPlaylistVideoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
