import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/entities/publication';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-adduser',
  templateUrl: './form-adduser.component.html',
  styleUrls: ['./form-adduser.component.css']
})
export class FormAdduserComponent implements OnInit {
  publication: Publication;
  addUserFormGroup = new FormGroup({
    name: new FormControl('',  [Validators.required, Validators.minLength(3)],),
    surname:  new FormControl('',  [Validators.required, Validators.minLength(3)],),
    titul:new FormControl('', [Validators.required]),
    percentage:new FormControl('', [Validators.required]),
    department:  new FormControl('', [Validators.required]),
    contact:new FormControl('', [Validators.required]),
  });
  // countAuthors = 2;
  // showAddUser: boolean;

  constructor() { }

  ngOnInit() {
    console.log("nakresim sa");
    // this.showAddUser =false;
  }

  get name() {
    return this.addUserFormGroup.get('name');
  }
  get surname() {
    return this.addUserFormGroup.get('surname');
  }
  get titul() {
    return this.addUserFormGroup.get('titul');
  }
  get percentage() {
    return this.addUserFormGroup.get('percentage');
  }
  get department() {
    return this.addUserFormGroup.get('department');
  }
  get contact() {
    return this.addUserFormGroup.get('contact');
  }

  // addingAnotherAuthor2(){
  //   console.log(this.countAuthors);
  //   this.showAddUser = !this.showAddUser;
  //   return this.countAuthors++;
  // }


}
