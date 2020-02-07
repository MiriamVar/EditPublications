import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/entities/publication';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-magazine-article',
  templateUrl: './form-magazine-article.component.html',
  styleUrls: ['./form-magazine-article.component.css']
})
export class FormMagazineArticleComponent implements OnInit {

  publication: Publication;
  magazineArticleFormGroup = new FormGroup({
    sourceDoc: new FormControl('',  [Validators.required, Validators.minLength(3)],),
    year:new FormControl('', [Validators.required]),
    grade:new FormControl('', [Validators.required]),
    number:new FormControl('', [Validators.required]),
    editionCountry: new FormControl('',  [Validators.required, Validators.minLength(3)],),
    issn:new FormControl('', [Validators.required]),
    from:  new FormControl('', [Validators.required]),
    to:new FormControl('', [Validators.required]),
  
  });

  constructor() { }

  ngOnInit() {
  }

  get sourceDoc() {
    return this.magazineArticleFormGroup.get('sourceDoc').value;
  }
  get year() {
    return this.magazineArticleFormGroup.get('year').value;
  }
  get grade() {
    return this.magazineArticleFormGroup.get('grade').value;
  }
  get number() {
    return this.magazineArticleFormGroup.get('number').value;
  }
  get editionCountry() {
    return this.magazineArticleFormGroup.get('editionCountry').value;
  }
  get issn() {
    return this.magazineArticleFormGroup.get('issn').value;
  }
  get from() {
    return this.magazineArticleFormGroup.get('from').value;
  }
  get to() {
    return this.magazineArticleFormGroup.get('to').value;
  }
 
}
