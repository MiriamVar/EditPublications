import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './form/form.component';
import { EmployeesComponent } from './employees/employees.component';
import { AuthGuard } from 'src/guards/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'form', component: FormComponent, canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
