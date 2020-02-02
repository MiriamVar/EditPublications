import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCountofprojectsComponent } from './form-countofprojects.component';

describe('FormCountofprojectsComponent', () => {
  let component: FormCountofprojectsComponent;
  let fixture: ComponentFixture<FormCountofprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCountofprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCountofprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
