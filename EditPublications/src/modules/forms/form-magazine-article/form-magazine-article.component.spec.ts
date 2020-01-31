import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMagazineArticleComponent } from './form-magazine-article.component';

describe('FormMagazineArticleComponent', () => {
  let component: FormMagazineArticleComponent;
  let fixture: ComponentFixture<FormMagazineArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMagazineArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMagazineArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
