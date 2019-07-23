import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutordashboardComponent } from './tutordashboard.component';

describe('TutordashboardComponent', () => {
  let component: TutordashboardComponent;
  let fixture: ComponentFixture<TutordashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutordashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
