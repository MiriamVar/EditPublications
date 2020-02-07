import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { SnackbarService } from './snackbar.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoiService {
  url = 'https://api.crossref.org/v1/works/';
  constructor(private http: HttpClient, private store: Store, private snackbarSevice: SnackbarService) {}

  sendDOI(doi: string): Observable<any> {
    return this.http.get<any>(this.url + doi)
    .pipe(map(result => {
      console.log("result je: "+JSON.stringify(result));
      return result;
    }, catchError(error => error)))
  }
}
