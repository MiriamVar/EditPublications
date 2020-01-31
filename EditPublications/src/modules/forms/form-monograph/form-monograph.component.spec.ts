import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMonographComponent } from './form-monograph.component';

describe('FormMonographComponent', () => {
  let component: FormMonographComponent;
  let fixture: ComponentFixture<FormMonographComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMonographComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMonographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
