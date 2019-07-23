import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsedescriptionComponent } from './corsedescription.component';

describe('CorsedescriptionComponent', () => {
  let component: CorsedescriptionComponent;
  let fixture: ComponentFixture<CorsedescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorsedescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorsedescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
