import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormAdduserComponent } from './form-adduser/form-adduser.component';


const routes: Routes = [{
  path: '', component: FormComponent,
  children:[
    {path: 'edit', component: FormEditComponent},
    {path: 'add', component: FormAdduserComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
