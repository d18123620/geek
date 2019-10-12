import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMycourseComponent } from './student-mycourse.component';

describe('StudentMycourseComponent', () => {
  let component: StudentMycourseComponent;
  let fixture: ComponentFixture<StudentMycourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMycourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMycourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
