import { Component, OnInit, Input } from '@angular/core';
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
    return this.monographFormGroup.get('editionPlace').value;
  }
  get editorship() {
    return this.monographFormGroup.get('editorship').value;
  }
  get year() {
    return this.monographFormGroup.get('year').value;
  }
  get isbn() {
    return this.monographFormGroup.get('isbn').value;
  }
  get pagesCount() {
    return this.monographFormGroup.get('pagesCount').value;
  }
  get authorsCount() {
    return this.monographFormGroup.get('authorsCount').value;
  }
  get name() {
    return this.monographFormGroup.get('name').value;
  }
  get number() {
    return this.monographFormGroup.get('number').value;
  }
  get place() {
    return this.monographFormGroup.get('place').value;
  }
  get date() {
    return this.monographFormGroup.get('date').value;
  }


}
