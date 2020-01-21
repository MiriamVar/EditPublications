import { Component, OnInit } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { Router } from '@angular/router';
import { logout } from 'src/shared/auth.actions';
import { AuthState } from 'src/shared/auth.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedUser = null;

  constructor(private store:Store, private router: Router, private actions$: Actions) { 
    this.actions$.pipe(ofActionSuccessful(logout))
    .subscribe(()=> this.router.navigateByUrl('/login'));
  }

  ngOnInit() {
    this.store.select(AuthState.username2).subscribe(u => (this.loggedUser = u));
  }
  
  logout(){
    this.store.dispatch(new logout())
    .subscribe();
  }

}
