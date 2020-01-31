import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/entities/publication';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-monograph',
  templateUrl: './form-monograph.component.html',
  styleUrls: ['./form-monograph.component.css']
})
export class FormMonographComponent implements OnInit {

  publication: Publication;
  monographFormGroup = new FormGroup({
    editionPlace: new FormControl('',  [Validators.required, Validators.minLength(3)],),
    editorship:  new FormControl('',  [Validators.required, Validators.minLength(3)],),
    year:new FormControl('', [Validators.required]),
    isbn:new FormControl('', [Validators.required]),
    pagesCount:  new FormControl('', [Validators.required]),
    authorsCount:new FormControl('', [Validators.required]),
    name:new FormControl('', [Validators.required]),
    number:new FormControl('', [Validators.required]),
    place:new FormControl('', [Validators.required]),
    date:new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
  }

  get editionPlace() {
    return this.monographFormGroup.get('editionPlace');
  }
  get editorship() {
    return this.monographFormGroup.get('editorship');
  }
  get year() {
    return this.monographFormGroup.get('year');
  }
  get isbn() {
    return this.monographFormGroup.get('isbn');
  }
  get pagesCount() {
    return this.monographFormGroup.get('pagesCount');
  }
  get authorsCount() {
    return this.monographFormGroup.get('authorsCount');
  }
  get name() {
    return this.monographFormGroup.get('name');
  }
  get number() {
    return this.monographFormGroup.get('number');
  }
  get place() {
    return this.monographFormGroup.get('place');
  }
  get date() {
    return this.monographFormGroup.get('date');
  }


}
