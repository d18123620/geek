import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDescriptionComponent } from './tutor-description.component';

describe('TutorDescriptionComponent', () => {
  let component: TutorDescriptionComponent;
  let fixture: ComponentFixture<TutorDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
