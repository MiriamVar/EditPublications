import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/entities/publication';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-book-section',
  templateUrl: './form-book-section.component.html',
  styleUrls: ['./form-book-section.component.css']
})
export class FormBookSectionComponent implements OnInit {

  publication: Publication;
  bookSectionFormGroup = new FormGroup({
    sourceDoc: new FormControl('',  [Validators.required, Validators.minLength(3)],),
    year:new FormControl('', [Validators.required]),
    editionPlace: new FormControl('',  [Validators.required, Validators.minLength(3)],),
    isbn:new FormControl('', [Validators.required]),
    editorship:  new FormControl('',  [Validators.required, Validators.minLength(3)],),
    authorsCount:new FormControl('', [Validators.required]),
    from:  new FormControl('', [Validators.required]),
    to:new FormControl('', [Validators.required]),
    name:new FormControl('', [Validators.required]),
    number:new FormControl('', [Validators.required]),
    place:new FormControl('', [Validators.required]),
    date:new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
  }

  get sourceDoc() {
    return this.bookSectionFormGroup.get('sourceDoc').value;
  }
  get year() {
    return this.bookSectionFormGroup.get('year').value;
  }
  get editionPlace() {
    return this.bookSectionFormGroup.get('editionPlace').value;
  }
  get isbn() {
    return this.bookSectionFormGroup.get('isbn').value;
  }
  get editorship() {
    return this.bookSectionFormGroup.get('editorship').value;
  }
  get authorsCount() {
    return this.bookSectionFormGroup.get('authorsCount').value;
  }
  get from() {
    return this.bookSectionFormGroup.get('from').value;
  }
  get to() {
    return this.bookSectionFormGroup.get('to').value;
  }
  get name() {
    return this.bookSectionFormGroup.get('name').value;
  }
  get number() {
    return this.bookSectionFormGroup.get('number').value;
  }
  get place() {
    return this.bookSectionFormGroup.get('place').value;
  }
  get date() {
    return this.bookSectionFormGroup.get('date').value;
  }

}
