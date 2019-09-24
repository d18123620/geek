import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursePlaylistComponent } from './student-course-playlist.component';

describe('StudentCoursePlaylistComponent', () => {
  let component: StudentCoursePlaylistComponent;
  let fixture: ComponentFixture<StudentCoursePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCoursePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCoursePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
