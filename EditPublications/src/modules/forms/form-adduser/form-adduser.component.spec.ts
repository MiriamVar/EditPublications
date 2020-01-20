import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdduserComponent } from './form-adduser.component';

describe('FormAdduserComponent', () => {
  let component: FormAdduserComponent;
  let fixture: ComponentFixture<FormAdduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAdduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
