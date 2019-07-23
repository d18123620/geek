import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizdesignComponent } from './quizdesign.component';

describe('QuizdesignComponent', () => {
  let component: QuizdesignComponent;
  let fixture: ComponentFixture<QuizdesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizdesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
