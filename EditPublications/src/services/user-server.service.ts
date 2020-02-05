import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/entities/auth';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError, mapTo, tap, map, switchMapTo } from 'rxjs/operators';
import { Store } from '@ngxs/store';
// import { tokenExpiredLogout } from 'src/shared/auth.actions';
import { SnackbarService } from './snackbar.service';
import { state } from '@angular/animations';
import { User } from 'src/entities/user';
import { Publication } from 'src/entities/publication';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {
  url = 'http://itsovy.sk:5000/';
  us : User;
  constructor(private http: HttpClient, private store: Store, private snackbarSevice: SnackbarService) {}

  get token() {
    return this.store.selectSnapshot(state => state.auth.token)
  }

  get id(){
    return this.store.selectSnapshot(state => state.auth.id)
  }

  get username(){
    return this.store.selectSnapshot(state => state.auth.username)
  }


  // checkToken(){
  //   if(this.token==null){
  //     return of(undefined)
  //   }
  //   return this.http
  //   .get(this.url + 'check-token/' + this.token,{responseType: 'text'})
  //   .pipe(catchError(error => {
  //     if(error instanceof HttpErrorResponse && error.status === 401){
  //         // this.store.dispatch(new tokenExpiredLogout);
  //         return of (undefined);
  //     }
  //     throwError(error);
  //   }),
  //   catchError(error => this.httpErrorProcess(error))
  //   );
  // }

  registerUser(user: User): Observable<User>{
    return this.http
    .post<User>(this.url + 'register', user)
    .pipe(
      tap(user => this.snackbarSevice.successMessage('register successful')),
      catchError(error => this.httpErrorProcess(error))
    );
  }

  login(auth: Auth): Observable<string>{
   return this.http
    .post<any>(this.url + 'login', auth )
    .pipe(
      tap(() => this.snackbarSevice.successMessage('Login successful')),
      map(json => json.token),
      catchError(error => this.httpErrorProcess(error))
    );
  }

  userConflicts(user: User): Observable<string[]>{
    return this.http.post<Array<string>>(this.url + 'user-conflicts', user)
    .pipe( catchError(error => this.httpErrorProcess(error))
    );
  }

  logout(username: string, token: string): Observable<void>{
    return this.http.post(this.url + 'logout',{
      username: username, token:token
    })
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
    if(error.status >= 400 && error.status < 500){
        this.snackbarSevice.errorMessage('Wrong name or password.');
        return;
      }
    this.snackbarSevice.errorMessage(error.message);
  }


  getUser(): Observable<User>{
    let obj = '{"name": "'+this.username+'", "token": "'+this.token + '"}';
    
    return this.http.post<User>(this.url + 'userinfo',JSON.parse(obj))
    .pipe(
      tap(user => {
        console.log(user);
        this.us = user;
        return user;
      }),
      catchError(error => this.httpErrorProcess(error)))
  }

  updateUser(userko: User): Observable<User>{
    let obj = '{"oldName": "'+this.username+'", "token": "'+this.token + '", "name": "'+userko.name + '","surname": "'+userko.surname + '","email": "'+userko.email + '"}';
    console.log("srvisa updateUser");
    console.log(obj);
    return this.http.post<User>(this.url + 'updateUser', JSON.parse(obj))
    .pipe(map(u => User.clone(u),
    catchError(error => this.httpErrorProcess(error)))
    );
  }

  getPublications(fname: string, lname:string ): Observable<Publication[]> { //zmenila som lebo tak mam nakodeny server, ked bude zle zmenim server
    let obj = '{"name": "'+this.username+'", "token": "'+this.token + '", "username": "'+fname+ '","surname": "'+lname+ '" }';
    console.log("ziskanie zo servera");
    return this.http
      .post<Publication[]>(this.url + 'publications',JSON.parse(obj))
      .pipe(map(response => this.fromJsonToListPublications(response)),
      catchError(error => this.httpErrorProcess(error))
      );
    
  }

  private fromJsonToListPublications(jsonPublications): Publication[] {
    console.log("json ktory pride "+jsonPublications); //[object Object]
    let remotePublications: Publication[] = [];
    for(let jsonPub of jsonPublications){
      if(jsonPub.groups){
        remotePublications.push(Publication.clone(jsonPub));
      } else {
        remotePublications.push(new Publication(jsonPub.name, jsonPub.email, jsonPub.id)); //tu dokoncit co vsetko sa mu vrati
      }
    }   
    return remotePublications;
  }

  deletePublication(publication: Publication): Observable<void> {
    let obj = '{"name": "'+this.username+'", "token": "'+this.token + '", "nazov": "'+publication.nazov+ '"}';
    return this.http
    .post<Publication>(this.url + 'deletePub',JSON.parse(obj))
    .pipe(
      switchMapTo(of(undefined)),
      catchError(error => this.httpErrorProcess(error))
    );
  }

  sendForm(pub: Publication): Observable<Publication>{
    console.log("publikation ktora mi prisla "+ JSON.stringify(pub));
    return this.http.post<Publication>(this.url + 'sendForm', pub)
    .pipe(map(p => Publication.clone(p),
    catchError(error => this.httpErrorProcess(error)))
    );
  }
}
