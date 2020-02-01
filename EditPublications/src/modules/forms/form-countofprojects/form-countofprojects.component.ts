import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GantScheme } from '../form/form.component';
import { Project } from '../../../entities/project';
import { FormGroup, FormControlName, FormControl, FormBuilder } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-form-countofprojects',
  templateUrl: './form-countofprojects.component.html',
  styleUrls: ['./form-countofprojects.component.css']
})
export class FormCountofprojectsComponent implements OnInit {

  @Output() eventPipe = new EventEmitter<Project>();
  gantScheme: GantScheme;
  project = new Project();
  dataarray = [];
  addProject: FormGroup;
  

  constructor(private _fb: FormBuilder) {
    
   }

  ngOnInit() {
    this.dataarray.push(this.project);
    this.addProject = this._fb.group({
      // name: new FormControl(''),
      // numberP: new FormControl(''),
      // scheme: new FormControl(''),
      // agency: new FormControl('')
      nameP: [],
      numberP: [],
      scheme: [],
      agency: []
    })
  }

  gantSchemes: GantScheme[] = [
    {value: "neurcena", viewValue: 'Vyberte grantovú schému'},
    {value: "apvv", viewValue: 'APVV'},
    {value: "vega", viewValue: 'VEGA'},
    {value: "kega", viewValue: 'KEGA'},
    {value: "vvgs_upjs", viewValue: 'VVGS UPJŠ'},
    {value: "vvgs_pf_upjs", viewValue: 'VVGS PF UPJŠ'},
    {value: "vvgs_lf_upjs", viewValue: 'VVGS LF UPJŠ'},
    {value: "vvgs_ff_upjs", viewValue: 'VVGS FF UPJŠ'},
    {value: "vvgs_pravf_upjs", viewValue: 'VVGS PrávF UPJŠ'},
    {value: "vvgs_fvs_upjs", viewValue: 'VVGS FVS UPJŠ'},
    {value: "cern", viewValue: 'CERN'},
    {value: "cost", viewValue: 'COST<'},
    {value: "visegrad", viewValue: 'Visegrad fund'},
    {value: "opvai", viewValue: 'OP VaI'},
    {value: "interreg", viewValue: 'INTERREG'},
    {value: "horizont", viewValue: 'Horizont 2020'},
    {value: "msvvas", viewValue: 'MŠVVaŠ SR'},
    {value: "ina", viewValue: 'Iná - upresniť'}
  ]

 

  // get nameP(){
  //   return this.addProject.get('nameP');
  // }

  // get numberP(){
  //   return this.addProject.get('numberP');
  // }

  // get scheme(){
  //   return this.addProject.get('grantScheme.value');
  // }

  // get agency(){
  //   return this.addProject.get('agency');
  // }

  addP(){
    this.project = new Project();
    this.dataarray.push(this.project);
  }

  removeP(){
    // console.log(this.nameP.value + " form.ts");
    
    // const project = new Project(this.nameP.value, this.numberP.value, this.scheme.value, this.agency.value);
    // this.eventPipe.emit(project);
  }


  onsubmit() {
    console.log(this.dataarray);
    
  }

  
}
