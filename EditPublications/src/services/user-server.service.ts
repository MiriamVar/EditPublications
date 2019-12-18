import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/entities/auth';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { tokenExpiredLogout } from 'src/shared/auth.actions';
import { SnackbarService } from './snackbar.service';
// import { User } from 'src/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {
  url = 'http://localhost:5000/';

  constructor(private http: HttpClient, private store: Store, private snackbarSevice: SnackbarService) {}

  get token() {
    return this.store.selectSnapshot(state => state.auth.token)
  }


  checkToken(){
    if(this.token==null){
      return of(undefined)
    }
    return this.http
    .get(this.url + 'check-token/' + this.token,{responseType: 'text'})
    .pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status === 401){
          this.store.dispatch(new tokenExpiredLogout);
          return of (undefined);
      }
      throwError(error);
    }),
    catchError(error => this.httpErrorProcess(error))
    );
  }

  // registerUser(user: User): Observable<User>{
  //   return this.http
  //   .post<User>(this.url + 'register', user)
  //   .pipe(
  //     tap(user => this.snackbarSevice.successMessage('register successful')),
  //     catchError(error => this.httpErrorProcess(error))
  //   );
  // }

  login(auth: Auth): Observable<string>{
   return this.http
    .post(this.url + 'login', auth, {responseType: "text"})
    .pipe(
      tap(() => this.snackbarSevice.successMessage('Login successful')),
      catchError(error => this.httpErrorProcess(error))
    );
  }

  // userConflicts(user: User): Observable<string[]>{
  //   return this.http.post<Array<string>>(this.url + 'user-conflicts', user)
  //   .pipe( catchError(error => this.httpErrorProcess(error))
  //   );
  // }

  logout(token: string): Observable<void>{
    return this.http.get(this.url + 'logout/' + token)
    .pipe(mapTo(undefined),
        catchError(error => this.httpErrorProcess(error)))
  }


  httpErrorProcess(error){
    if(error instanceof HttpErrorResponse ){
        this.httpErrorToMessage(error);
        return EMPTY;
      }else{ 
        throwError(error); // nejaká iná chyba
      }

    
  }

  httpErrorToMessage(error: HttpErrorResponse){
    if (error.status === 0) {
      this.snackbarSevice.errorMessage('Server is not in use.');
      return;
    }
    if(error.status >= 400 && error.status <500){
      if(error.status == 401 && error.error.errorMessage === 'unkown token'){
        this.store.dispatch(new tokenExpiredLogout);
        this.snackbarSevice.errorMessage('Token expired.');
        return;
      }
      else{
        this.snackbarSevice.errorMessage('Wrong name or password.')
      }
      return;
    }
    this.snackbarSevice.errorMessage(error.message);
  }
}
