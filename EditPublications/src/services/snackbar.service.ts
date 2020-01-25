import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  successMessage(message: string){
    this.snackbar.open(message, 'SUCCESS', {panelClass:'greenSnackBarAction',duration: 3000});
  }

  errorMessage(message: string){
    this.snackbar.open(message, 'ERROR', { panelClass:'redSnackBarAction',duration: 3000});
  }
}
