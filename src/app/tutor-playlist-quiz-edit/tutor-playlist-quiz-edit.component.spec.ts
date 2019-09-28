import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPlaylistQuizEditComponent } from './tutor-playlist-quiz-edit.component';

describe('TutorPlaylistQuizEditComponent', () => {
  let component: TutorPlaylistQuizEditComponent;
  let fixture: ComponentFixture<TutorPlaylistQuizEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPlaylistQuizEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPlaylistQuizEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
