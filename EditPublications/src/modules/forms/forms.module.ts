import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormAdduserComponent } from './form-adduser/form-adduser.component';


@NgModule({
  declarations: [FormComponent, FormEditComponent, FormAdduserComponent],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
    FormsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FormsModule { }
