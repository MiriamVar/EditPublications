import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployeesComponent } from './employees/employees.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { FormComponent } from 'src/modules/forms/form/form.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // {path: 'form', component: FormComponent, canActivate: [AuthGuard]},
  {path:'form', loadChildren: () => import('./../modules/forms/forms.module').then(mod => mod.FormsModule), canActivate:[AuthGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
