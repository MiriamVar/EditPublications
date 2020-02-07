import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/entities/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServerService } from 'src/services/user-server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private userServerService: UserServerService, public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  user:User;

  ngOnInit() {
    console.log("vykresluje sa edit user");
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.name.setValue(data.name);
      this.surname.setValue(data.surname);
      this.email.setValue(data.email);
    });
  }

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')]),
  });

  
  get name(){
    return this.editForm.get('name');
  }
  get surname(){
    return this.editForm.get('surname');
  }
  get email(){
    return this.editForm.get('email');
  }
  cancelEdit(){
    this.dialogRef.close();
  }


  formSubmit() {
    // const user = new User(this.name.value, this.surname.value,this.email.value);
    // console.log("user z edit componentu "+ user);
    // this.userServerService.updateUser(user).subscribe(
    //   ok =>{
    //     this.router.navigateByUrl('/profile');
    //   }
    // );
    // console.log("odoslane sa server");
  }


}
