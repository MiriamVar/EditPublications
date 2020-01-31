import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddresearchComponent } from './form-addresearch.component';

describe('FormAddresearchComponent', () => {
  let component: FormAddresearchComponent;
  let fixture: ComponentFixture<FormAddresearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddresearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddresearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
