import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCourseInfoEditComponent } from './tutor-course-info-edit.component';

describe('TutorCourseInfoEditComponent', () => {
  let component: TutorCourseInfoEditComponent;
  let fixture: ComponentFixture<TutorCourseInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorCourseInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCourseInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
