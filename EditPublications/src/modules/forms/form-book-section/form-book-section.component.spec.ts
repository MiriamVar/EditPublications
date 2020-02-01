import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBookSectionComponent } from './form-book-section.component';

describe('FormBookSectionComponent', () => {
  let component: FormBookSectionComponent;
  let fixture: ComponentFixture<FormBookSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBookSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBookSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
