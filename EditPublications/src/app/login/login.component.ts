import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { login } from 'src/shared/auth.actions';
import { AuthState } from 'src/shared/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  auth = new Auth();

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    if (this.store.selectSnapshot(AuthState.username)){
      this.router.navigateByUrl(this.store.selectSnapshot(AuthState.redirectUrl))
    }
  }

  formSubmit(){
    this.store.dispatch(new login(this.auth)).subscribe(() => {
      if(this.store.selectSnapshot(AuthState.username)){
        this.router.navigateByUrl(this.store.selectSnapshot(AuthState.redirectUrl));
      }
    });
    console.log("klick");
  }
}
