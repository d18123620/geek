import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsefeedComponent } from './corsefeed.component';

describe('CorsefeedComponent', () => {
  let component: CorsefeedComponent;
  let fixture: ComponentFixture<CorsefeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorsefeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorsefeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
