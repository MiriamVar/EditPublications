import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServerService } from 'src/services/user-server.service';
import { Store } from '@ngxs/store';
import { tap, mapTo } from 'rxjs/operators';
import { urlAfterLogin } from 'src/shared/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private userServerService: UserServerService, private store: Store){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("AuthGuard sa spustil- canActivate");
      return this.canAnything(state.url);
  }
  
  canLoad(
    route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
      return this.canAnything(route.path);
  }

  canAnything(url: string): boolean | Observable<boolean>{
    console.log("AuthGuard sa spustil - canAnything");
      if(this.store.selectSnapshot(state => state.auth.token)){
        return true;
      }
       else{
        this.store
        .dispatch(new urlAfterLogin(url))
        .pipe(tap(() => this.router.navigateByUrl('/login')),
        mapTo(false)
        );
      }
    return false;
  }
}
