import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import * as zxcvbn from 'zxcvbn';
import { UserServerService } from 'src/services/user-server.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Router, Route } from '@angular/router';
import { User } from 'src/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  hide = true;
  passwordMessage = 'Strong password needed!';
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
    ],
    ),
    password: new FormControl('', this.passwordValidator()),
    password2: new FormControl(''),
    type: new FormControl('', [Validators.required, Validators.maxLength(1)])
  }, this.passwordsMatchValidator);


  get name() {
    return this.registerForm.get('name');
  }
  get surname() {
    return this.registerForm.get('surname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get type() {
    return this.registerForm.get('type');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get password2() {
    return this.registerForm.get('password2');
  }

  constructor(private userServerService: UserServerService, private router: Router) {}

  ngOnInit() {}

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const test = zxcvbn(control.value);
      const message =
        'Password strength: ' +
        test.score +
        ' / 4 – must be 3 or 4, ' +
        test.feedback.warning +
        ', crackable in ' +
        test.crack_times_display.offline_slow_hashing_1e4_per_second;
      this.passwordMessage = message;
      return test.score < 3 ? { weakPassword: message } : null;
    };
  }

  passwordsMatchValidator(control: FormGroup): ValidationErrors {
    const password = control.get('password');
    const password2 = control.get('password2');
      if (password.value === password2.value) {
        password2.setErrors(null);
        return null;
      } else {
        password2.setErrors({ differentPasswords: 'Passwords do not match' });
        return { differentPasswords: 'Passwords do not match' };
      }
    }

    serverCOnflictValidator(conflictFieldName: string): AsyncValidatorFn {
      return (control: AbstractControl) => {
        const name = conflictFieldName === 'name' ? control.value : '';
        const surname = conflictFieldName === 'surname' ? control.value : '';
        const email = conflictFieldName === 'email' ? control.value : '';
        const type = conflictFieldName === 'type' ? control.value : '';
        const password = conflictFieldName === 'password' ? control.value : '';
        const user = new User(name, surname, email,password,type);
        return this.userServerService.userConflicts(user)
        .pipe(
          map(conflictsArray => {
            return conflictsArray.includes(conflictFieldName)? {
              conflictField: conflictFieldName + ' already taken'
            }: null;
          })
        );
      };
    }

    formSubmit(){
      const user = new User(this.name.value, this.surname.value, this.email.value, this.password.value, this.type.value, undefined, undefined);
      this.userServerService.registerUser(user).subscribe(
        ok =>{
          this.router.navigateByUrl('/login');
        }
      );
      console.log("klick");
    }
}
