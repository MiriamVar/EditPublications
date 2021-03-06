import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialogModule } from '@angular/material';



@NgModule({
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatTableModule, 
    MatStepperModule, MatSelectModule, MatGridListModule, MatChipsModule, MatDialogModule
  ],
  exports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatTableModule, 
    MatStepperModule, MatSelectModule, MatGridListModule, MatChipsModule,MatDialogModule
  ]
})
export class MaterialModule { }
