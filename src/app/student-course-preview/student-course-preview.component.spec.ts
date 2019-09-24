import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursePreviewComponent } from './student-course-preview.component';

describe('StudentCoursePreviewComponent', () => {
  let component: StudentCoursePreviewComponent;
  let fixture: ComponentFixture<StudentCoursePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCoursePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCoursePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
