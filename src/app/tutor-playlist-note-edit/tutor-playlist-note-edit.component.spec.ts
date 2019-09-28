import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPlaylistNoteEditComponent } from './tutor-playlist-note-edit.component';

describe('TutorPlaylistNoteEditComponent', () => {
  let component: TutorPlaylistNoteEditComponent;
  let fixture: ComponentFixture<TutorPlaylistNoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPlaylistNoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPlaylistNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
