import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticledesignComponent } from './articledesign.component';

describe('ArticledesignComponent', () => {
  let component: ArticledesignComponent;
  let fixture: ComponentFixture<ArticledesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticledesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticledesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
