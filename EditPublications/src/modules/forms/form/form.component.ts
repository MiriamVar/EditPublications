import { Component, OnInit, ViewChild } from '@angular/core';
import { Publication } from 'src/entities/publication';
import { FormGroup, FormControl, Validators, FormArray, FormControlName, FormBuilder } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UserServerService } from 'src/services/user-server.service';
import { Router } from '@angular/router';
import { Project } from '../../../entities/project';
import { FormMonographComponent } from '../form-monograph/form-monograph.component';
import { FormBookSectionComponent } from '../form-book-section/form-book-section.component';
import { FormMagazineArticleComponent } from '../form-magazine-article/form-magazine-article.component';

export interface Option {
  value: string;
  viewValue: string;
}

export interface Workspace{
  value: string;
  viewValue: string;
}

export interface Activity{
  value: string;
  viewValue: string;
}

export class ResearchField{
  value: string;
  viewValue: string;
  constructor(){}
}

export interface Type{
  value: string,
  viewValue: string
}

export class GantScheme{
  value:string;
  viewValue:string;
  constructor(){}
}

export interface SlovakWord {
  name: string;
}

export interface EnglishWord {
  name: string;
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild(FormMonographComponent, { static: false })
  private monographForm: FormMonographComponent;

  @ViewChild(FormBookSectionComponent, {static: false})
  private formBook: FormBookSectionComponent;

  @ViewChild(FormMagazineArticleComponent, {static:false})
  private magazineForm: FormMagazineArticleComponent

  
  options: Option[] = [
    {value: 'no-0', viewValue: 'Nie'},
    {value: 'yesI-1', viewValue: 'Ano - interny'},
    {value: 'yesE-2', viewValue: 'Ano - externy'}
  ];

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

  types: Type[]= [
    {value: "neurceny", viewValue: 'Vyberte typ dokumentu'},
      {value: "monografia_zbornik", viewValue: 'Monografia/Zborník'},
      {value: "clanok_kapitola", viewValue: 'Článok v zborníku/kapitola v knihe'},
      {value: "clanok_casopis", viewValue: 'Článok v časopise'},
  ]

  researchFields: ResearchField[]= [
    {value: "neurceny", viewValue: 'Vyberte oblasť výskumu'},
      {value: "010", viewValue: 'Pedagogické vedy'},
      {value: "020", viewValue: 'Humanitné vedy'},
      {value: "030", viewValue: 'Historické vedy a etnológia'},
      {value: "040", viewValue: 'Umenie'},
      {value: "050", viewValue: 'Projektovanie, inžinierstvo, technológie a vodné hospodárstvo'},
      {value: "060", viewValue: 'Spoločenské a behaviorálne vedy'},
      {value: "070", viewValue: 'Právo a medzinárodné vzťahy'},
      {value: "080", viewValue: 'Ekonómia a manažment'},
      {value: "091", viewValue: 'Fyzika'},
      {value: "092", viewValue: 'Vedy o Zemi a vesmíre'},
      {value: "100", viewValue: 'Environmentalistika a ekológia'},
      {value: "110", viewValue: 'Metalurgické a montánne vedy'},
      {value: "120", viewValue: 'Chémia, chemická technológia a biotechnológie'},
      {value: "130", viewValue: 'Vedy o živej prírode'},
      {value: "140", viewValue: 'Strojárstvo'},
      {value: "150", viewValue: 'Elektrotechnika a elektroenergetika'},
      {value: "160", viewValue: 'Informatické vedy, automatizácia a telekomunikácie'},
      {value: "170", viewValue: 'Inžinierstvo a technológie'},
      {value: "180", viewValue: 'Lekárske, farmaceutické a nelekárske zdravotnícke vedy'},
      {value: "190", viewValue: 'Poľnohospodárske a lesnícke vedy'},
      {value: "200", viewValue: 'Veterinárske vedy'},
      {value: "210", viewValue: 'Vedy o športe'},
      {value: "220", viewValue: 'Dopravné služby'},
      {value: "230", viewValue: 'Bezpečnostné služby'},
      {value: "240", viewValue: 'Matematika a štatistika'}
  ]

  workspaces: Workspace[]= [
    {value: '0', viewValue: 'Vyberte pracovisko'},
    {value: '1', viewValue: 'Prirodovedecka fakulta'},
    {value: '2', viewValue: 'Pravinicka fakulta'},
    {value: '3', viewValue: 'Lekarska fakulta'},
    {value: '4', viewValue: 'Filozoficka fakulta'},
    {value: '5', viewValue: 'Fakulta verejnej spravy'},
    {value: '6', viewValue: 'Univerzitne pracovisko'},
    {value: '7', viewValue: 'Ine - nie z UPJS'},
  ];



  activities: Activity[]= [
    {value: "neurceny", viewValue: 'Vyberte kategóriu publikačnej činnosti'},
    {value :"AAA", viewValue: 'Vedecké monografie vydané v zahraničných vydavateľstvách'},
    {value :"AAB", viewValue: 'Vedecké monografie vydané v domácich vydavateľstvách'},
    {value :"ABA", viewValue: 'Štúdie charakteru vedeckej monografie v časopisoch a zborníkoch vydané v zahraničných vydavateľstvách'},
    {value :"ABB", viewValue: 'charakteru vedeckej monografie v časopisoch a zborníkoch vydané v domácich vydavateľstvách'},
    {value :"ABC", viewValue: 'Kapitoly vo vedeckých monografiách vydané v zahraničných vydavateľstvách'},
    {value :"ABD", viewValue: 'Kapitoly vo vedeckých monografiách vydané v domácich vydavateľstvách'},
    {value :"ACA", viewValue: 'Vysokoškolské učebnice vydané v zahraničných vydavateľstvách'},
    {value :"ACB", viewValue: 'Vysokoškolské učebnice vydané v domácich vydavateľstvách'},
    {value :"ACC", viewValue: 'Kapitoly vo vysokoškolských učebniciach vydané v zahraničných vydavateľstvách'},
    {value :"ACD", viewValue: 'Kapitoly vo vysokoškolských učebniciach vydané v domácich vydavateľstvách'},
    {value :"ADC", viewValue: 'Vedecké práce v zahraničných karentovaných časopisoch'},
    {value :"ADD", viewValue: 'Vedecké práce v domácich karentovaných časopisoch'},
    {value :"ADE", viewValue: 'Vedecké práce v ostatných zahraničných časopisoch'},
    {value :"ADF", viewValue: 'Vedecké práce v ostatných domácich časopisoch'},
    {value :"ADM", viewValue: 'Vedecké práce v zahraničných časopisoch registrovaných v databázach Web of Science alebo SCOPUS'},
    {value :"ADN", viewValue: 'Vedecké práce v domácich časopisoch registrovaných v databázach Web of Science alebo SCOPUS'},
    {value :"AEC", viewValue: 'Vedecké práce v zahraničných recenzovaných vedeckých zborníkoch'},
    {value :"AED", viewValue: 'AED - Vedecké práce v domácich recenzovaných vedeckých zborníkoch, monografiách'},
    {value :"AEE", viewValue: 'Vedecké práce v zahraničných nerecenzovaných vedeckých zborníkoch, monografiách'},
    {value :"AEF", viewValue: 'Vedecké práce v domácich nerecenzovaných vedeckých zborníkoch, monografiách'},
    {value :"AEG", viewValue: 'Abstrakty vedeckých prác v zahraničných karentovaných časopisoch'},
    {value :"AEH", viewValue: 'Abstrakty vedeckých prác v domácich karentovaných časopisoch'},
    {value :"AEM", viewValue: 'Abstrakty vedeckých prác v zahraničných časopisoch registrovaných v databázach Web of Science alebo SCOPUS'},
    {value :"AEN", viewValue: 'Abstrakty vedeckých prác v domácich časopisoch registrovaných v databázach Web of Science alebo SCOPUS'},
    {value :"AFA", viewValue: 'Publikované pozvané príspevky na zahraničných vedeckých konferenciách'},
    {value :"AFB", viewValue: 'Publikované pozvané príspevky  na domácich vedeckých konferenciách'},
    {value :"AFC", viewValue: 'Publikované príspevky na zahraničných vedeckých konferenciách'},
    {value :"AFD" , viewValue: ' Publikované príspevky na domácich vedeckých konferenciách'},
    {value :"AFE", viewValue: 'Abstrakty pozvaných príspevkov zo zahraničných vedeckých konferencií'},
    {value :"AFF", viewValue: ' Abstrakty pozvaných príspekov z domácich vedeckých konferencií'},
    {value :"AFG", viewValue: 'Abstrakty príspevkov zo zahraničných vedeckých konferencií'},
    {value :"AFH", viewValue: 'Abstrakty príspevkov z domácich vedeckých konferencií'},
    {value :"AFI", viewValue: 'Preprinty vedeckých prác vydané v zahraničných vydavateľstvách'},
    {value :"AFJ", viewValue: 'Preprinty vedeckých prác vydané v domácich vydavateľstvách'},
    {value :"AFK", viewValue: 'Postery zo zahraničných konferencií'},
    {value :"AFL", viewValue: 'Postery z domácich konferencií'},
    {value :"AGI", viewValue: 'Správy o vyriešených vedeckovýskumných úlohách'},
    {value :"AGJ", viewValue: 'Patentové prihlášky, prihlášky úžitkových vzorov, prihlášky dizajnov, prihlášky ochranných známok...'},
    {value :"BAA", viewValue: 'Odborné knižné publikácie vydané v zahraničných vydavateľstvách'},
    {value :"BAB", viewValue: 'Odborné knižné publikácie vydané v domácich vydavateľstvách'},
    {value :"BBA", viewValue: 'Kapitoly v odborných knižných publikáciách vydané v zahraničných vydavateľstvách'},
    {value :"BBB", viewValue: 'Kapitoly v odborných knižných publikáciách vydané v domácich vydavateľstvách'},
    {value :"BCB", viewValue: 'Učebnice pre stredné a základné školy'},
    {value :"BCI", viewValue: 'Skriptá  a učebné texty'},
    {value :"BCK", viewValue: 'Kapitoly v učebniciach a učebných textoch'},
    {value :"BDA", viewValue: 'Heslá v odborných terminologických slovníkoch a encyklopédiách vydaných v zahraničných vydavateľstvách'},
    {value :"BDB", viewValue: 'Heslá v odborných terminologických slovníkoch a encyklopédiách vydaných v domácich vydavateľstvách'},
    {value :"BDC", viewValue: 'Odborné práce v zahraničných karentovaných časopisoch'},
    {value :"BDD", viewValue: 'Odborné práce v domácich karentovaných časopisoch'},
    {value :"BDE", viewValue: 'Odborné práce v ostatných zahraničných časopisoch'},
    {value :"BDF", viewValue: 'Odborné práce v ostatných domácich časopisoch'},
    {value :"BDM", viewValue: 'Odborné práce v zahraničných časopisoch registrovaných v databázach Web of Science alebo SCOPUS'},
    {value :"BDN", viewValue: 'Odborné práce v domácich časopisoch registrovaných v databázach Web of Science alebo SCOPUS'},
    {value :"BEC", viewValue: 'Odborné práce v zahraničných recenzovaných zborníkoch (konferenčných aj nekonferenčných)'},
    {value :"BED", viewValue: 'Odborné práce v domácich recenzovaných zborníkoch (konferenčných aj nekonferenčných)'},
    {value :"BEE", viewValue: 'Odborné práce v zahraničných zborníkoch (konferenčných aj nekonferenčných)'},
    {value :"BEF", viewValue: 'Odborné práce v domácich zborníkoch (konferenčných aj nekonferenčných)'},
    {value :"BFA", viewValue: 'Abstrakty odborných prác zo zahraničných podujatí (konferencie...)'},
    {value :"BFB", viewValue: 'Abstrakty odborných prác z domácich podujatí (konferencie...)'},
    {value :"BGG", viewValue: 'Normy'},
    {value :"BGH", viewValue: 'Legislatívne dokumenty'},
    {value :"CAA", viewValue: 'Umelecké monografie, dramatické diela, scenáre, umelecké preklady publikácií, autorské katalógy vydané v zahraničných vydavateľstvách'},
    {value :"CAB", viewValue: 'Umelecké monografie, dramatické diela, scenáre, umelecké preklady publikácií, autorské katalógy vydané v domácich vydavateľstvách'},
    {value :"CBA", viewValue: 'Kapitoly v umeleckých monografiách,kapitoly umeleckých prekladov publikácií vydaných v zahraničných vydavateľstvách'},
    {value :"CBB", viewValue: 'Kapitoly v umeleckých monografiách,kapitoly umeleckých prekladov publikácií vydaných v domácich vydavateľstvách'},
    {value :"CAG", viewValue: 'Audiovizuálne diela (videokazeta, film, CD-ROM, DVD) natočené v zahraničnej produkcii'},
    {value :"CAH", viewValue: 'Audiovizuálne diela (videokazeta, film, CD-ROM, DVD) natočené v domácej produkcii'},
    {value :"CAI", viewValue: 'Hudobné diela (partitúry, notové materiály) vydané v zahraničných vydavateľstvách'},
    {value :"CAJ", viewValue: 'Hudobné diela (partitúry, notové materiály) vydané v domácich vydavateľstvách'},
    {value :"CDC", viewValue: 'Umelecké práce a preklady v zahraničných karentovaných časopisoch'},
    {value :"CDD", viewValue: 'Umelecké práce a preklady v domácich karentovaných časopisoch'},
    {value :"CDE", viewValue: 'Umelecké práce a preklady v zahraničných nekarentovaných časopisoch'},
    {value :"CDF", viewValue: 'Umelecké práce a preklady v domácich nekarentovaných časopisoch'},
    {value :"CEC", viewValue: 'Umelecké práce, dramatické diela, scenáre a preklady v zborníkoch, knižných publikáciách a skupinových katalógoch vydaných v zahr. vydav.'},
    {value :"CED", viewValue: 'Umelecké práce, dramatické diela, scenáre a preklady v zborníkoch, knižných publikáciách a skupinových katalógoch vydaných v dom. vydav.'},
    {value :"CGC", viewValue: 'Umelecké a architektonické štúdie a projekty - v zahraničí'},
    {value :"CGD", viewValue: 'Umelecké a architektonické štúdie a projekty - doma'},
    {value :"CIA", viewValue: 'Skladačka k výstave (menej ako 8 s.) vydaná v zahraničí'},
    {value :"CIB", viewValue: 'Skladačka k výstave (menej ako 8 s.) vydaná doma'},
    {value :"CJA", viewValue: 'Katalóg k výstave (viac ako 8 s. a menej ako 1 AH) vydaný v zahraničí'},
    {value :"CJB", viewValue: 'Katalóg k výstave (viac ako 8 s. a menej ako 1 AH) vydaný doma'},
    {value :"CKA", viewValue: 'Katalóg k výstave (viac ako 1 AH) vydaný v zahraničí'},
    {value :"CKB", viewValue: 'Katalóg k výstave (viac ako 1 AH) vydaný doma'},
    {value :"DAI", viewValue: 'Dizertačné a habilitačné práce'},
    {value :"EAI", viewValue: 'Prehľadové práce'},
    {value :"EAJ", viewValue: ' Odborné preklady publikácií'},
    {value :"EDI", viewValue: 'Recenzie v časopisoch a zborníkoch'},
    {value :"EDJ", viewValue: 'Prehľadové práce, odborné práce, preklady noriem; odborné preklady v časopisoch, zborníkoch'},
    {value :"FAI", viewValue: 'Zostavovateľské práce knižného charakteru(bibliografie, encyklopédie, katalógy, slovníky, zborníky, atlasy...)'},
    {value :"GAI", viewValue: 'Správy'},
    {value :"GHG", viewValue: 'Práce zverejnené spôsobom umožňujúcim hromadný prístup'},
    {value :"GII", viewValue: 'Rôzne publikácie a dokumenty, ktoré nemožno zaradiť do žiadnej z predchádzajúcich kategórií'}
  ];
  
  publication: Publication;
  countAuthors = 1;
  showAddUser:boolean;
  countResearches = 1;
  showAddResearch: boolean;
  selectedValue:boolean;
  selectedValue2:boolean;
  selectedValue3:boolean;
  countGrantSchemes = 0;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  slovakWords: SlovakWord[] = [];
  englishWords: EnglishWord[] = [];
  documentType = '';

  firstFormGroup = new FormGroup({
    // DOI: new FormControl(''),
    authors: new FormArray([this.addAuthorGroup()])
    
  });
  secondFormGroup = new FormGroup({
    documentName: new FormControl('',  [Validators.required, Validators.minLength(3)],),
    documentTranslate: new FormControl('', [Validators.required]),
    keyWordsSK: new FormControl(''),
    keyWordsAJ:new FormControl(''),
    categoryPub: new FormControl(''),
    researchFieldss: new FormArray([this.addResearchGroup()]),
    webAddress: new FormControl(''),
    typeDoc: new FormControl(''),
    projects: new FormArray([])
  });

  get researches(){
    return this.secondFormGroup.get('researchFieldss') as FormArray;
  }

  get projects(){
    return this.secondFormGroup.get('projects') as FormArray;
  }
  



  addAuthorGroup(){
    return this._fb.group({
      name: ['', new FormControl('',  [Validators.required, Validators.minLength(3)],)],
      surname:  ['',new FormControl('',  [Validators.required, Validators.minLength(3)],)],
      titul: ['',new FormControl('', [Validators.required])],
      percentage: ['', new FormControl('', [Validators.required])],
      doktorand: [new FormControl('', [Validators.required])],
      department:  [new FormControl('', [Validators.required])],
      ustav: ['', new FormControl('',[Validators.required])],
      contact: ['',new FormControl('', [Validators.required])],
    })
  }

  addAuthor(){
    this.authorArray.push(this.addAuthorGroup());
  }

  removeAuthor(index){
    if (!(this.authorArray.length <= 1))
      this.authorArray.removeAt(index);
  }

  addProjectGroup(){
    return this._fb.group({
      nameP: [],
      numberP: [],
      scheme: [],
      agency: []
    });
  }

  get nameP() {
    if (this.projects.length ==1)
      return this.projects.at(0).get('nameP').value;
    else if (this.projects.length == 0)
      return '';
  }

  get numberP() {
    if (this.projects.length ==1)
      return this.projects.at(0).get('numberP').value;
    else if (this.projects.length == 0)
      return '';
  }
  get scheme() {
    if (this.projects.length ==1)
      return this.projects.at(0).get('scheme').value;
    else if (this.projects.length == 0)
      return '';
  }

  get agency() {
    if (this.projects.length ==1)
      return this.projects.at(0).get('agency').value;
    else if (this.projects.length == 0)
      return '';
  }

  addProject(){
    this.projectArray.push(this.addProjectGroup());
  }

  removeProject(index){
    this.projectArray.removeAt(index);
  }


  addResearchGroup(){
    return this._fb.group({
      researchF: []
    });
  }

  get resGroup() {
    return this.researches.at(0).get('researchF').value;
  }

  addResearch(){
    if (this.researchArray.length<5) {
    this.researchArray.push(this.addResearchGroup());
    }
  }

  removeResearch(index){
    if(this.researchArray.length !==1){
    this.researchArray.removeAt(index);
    }
  }
  

  constructor(private userServerService: UserServerService, private router: Router, private _fb: FormBuilder) { }

  ngOnInit() {
    this.showAddUser = false;
    this.selectedValue= false;
    this.selectedValue2 = false;
    this.selectedValue3 = false;
    this.showAddResearch = false;
  }

  // get DOI() {
  //   return this.firstFormGroup.get('DOI');
  // }
  get authorArray(){
    return <FormArray>this.firstFormGroup.get("authors");
  }
  get name() {
    return this.authors.at(0).get('name').value;
  }
  get surname() {
    return this.authors.at(0).get('surname').value;
  }
  get titul() {
    return this.authors.at(0).get('titul').value;
  }
  get percentage() {
    return this.authors.at(0).get('percentage').value;
  }
  get department() {
    return this.authors.at(0).get('department').value;
  }
  get doktorand(){
    return this.authors.at(0).get('doktorand').value;
  }
  get ustav(){
    return this.authors.at(0).get('ustav').value;
  }
  get contact() {
    return this.authors.at(0).get('contact').value;
  }

  get documentName() {
    return this.secondFormGroup.get('documentName').value;
  }
  get documentTranslate() {
    return this.secondFormGroup.get('documentTranslate').value;
  }
  get keyWordsSK() {
    return this.secondFormGroup.get('keyWordsSK').value;
  }
  get keyWordsAJ() {
    return this.secondFormGroup.get('keyWordsAJ').value;
  }
  get categoryPub(){
    return this.secondFormGroup.get('categoryPub').value;
  }
  get researchArray(){
    return <FormArray>this.secondFormGroup.get("researchFieldss");
  }
  get webAddress() {
    return this.secondFormGroup.get('webAddress').value;
  }
  get typeDoc() {
    return this.secondFormGroup.get('typeDoc').value;
  }
  get projectArray(){
    return <FormArray>this.secondFormGroup.get("projects");
  }

  get authors(){
    return this.firstFormGroup.get('authors') as FormArray;
  }


  // insertFromDOI(){
  //   console.log(this.DOI.value);
  // }  
  
  addingAnotherAuthor(){
    console.log(this.countAuthors);
    this.countAuthors++;
    // console.log("vacsi pocet "+this.countAuthors);
    // this.showAddUser = true;
    return this.countAuthors;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      console.log("value "+ value);
      this.slovakWords.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(word: SlovakWord): void {
    const index = this.slovakWords.indexOf(word);

    if (index >= 0) {
      this.slovakWords.splice(index, 1);
    }
  }

  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      console.log("value "+ value);
      this.englishWords.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove2(word: EnglishWord): void {
    const index = this.englishWords.indexOf(word);

    if (index >= 0) {
      this.englishWords.splice(index, 1);
    }
  }

  choosingComponent(document){
    console.log(document.value);
    this.documentType = document.value;
    if(document.value === "monografia_zbornik" ){
      this.selectedValue = !this.selectedValue;
      this.selectedValue2 = false;
      this.selectedValue3 = false;
    } else if(document.value === "clanok_kapitola" ){
      this.selectedValue2 = !this.selectedValue2;
      this.selectedValue = false;
      this.selectedValue3 = false;
    }else if(document.value === "clanok_casopis" ){
      this.selectedValue3 = !this.selectedValue3;
      this.selectedValue = false;
      this.selectedValue2 = false;
    }
  }

  formSubmit(){
    var names = '';
    var surnames = '';
    var tituly= '';
    var percentages = '';
    var doktorandy= '';
    var ustavy = '';
    var contacty = '';
    var departmenty = '';
    
    
    if(this.authorArray.length>1) {

      for(var i= 0; i < this.authorArray.length; i++){
        names +=this.authors.at(i).get('name').value + ', ';
        surnames += this.authors.at(i).get('surname').value + ', ';
        tituly += this.authors.at(i).get('titul').value + ', ';
        percentages += this.authors.at(i).get('percentage').value+ ', ';
        departmenty += this.authors.at(i).get('department').value+ ', ';
        doktorandy += this.authors.at(i).get('doktorand').value+ ', ';
        ustavy += this.authors.at(i).get('ustav').value+ ', ';
        contacty += this.authors.at(i).get('contact').value+ ', ';
      }

    } else {
      names = this.name;
      surnames = this.surname;
      tituly= this.titul;
      percentages = this.percentage;
      departmenty = this.department;
      doktorandy= this.doktorand;
      ustavy = this.ustav;
      contacty = this.contact;
    }


    var slovakChips= '';
    for(var j=0; j< this.slovakWords.length; j++){
      if(j == (this.slovakWords.length-1)){
        slovakChips+= this.slovakWords[j].name;
      }
      else{
        slovakChips+= this.slovakWords[j].name+',';
      }
      
    }
    // console.log("slovak chips "+slovakChips);

    var englishChips= '';
    for(var j=0; j< this.englishWords.length; j++){
      if(j == (this.englishWords.length-1)){
        englishChips+= this.englishWords[j].name;
      }
      else{
        englishChips+= this.englishWords[j].name+',';
      }
      
    }
    // console.log("english chips "+englishChips);

    var resr ='';
    if(this.researches.length>1) {
      for(var i= 0; i < this.researches.length; i++){
        resr +=this.researches.at(i).get('researchF').value + ', ';
      }
    }
    

    console.log("web adresa"+ this.webAddress);

    var namepy = "";
    var numberpy = "";
    var schemy = "";
    var agencyy = "";
    // if (this.projects.length>1) {
      for(var i= 0; i < this.projectArray.length; i++){
        namepy +=this.projects.at(i).get('nameP').value + ', ';
        console.log("vypisujem namepy: " + namepy);
        
        numberpy += this.projects.at(i).get('numberP').value + ', ';
        schemy += this.projects.at(i).get('scheme').value + ', ';
        agencyy += this.projects.at(i).get('agency').value + ', ';
      }
    // }
    // else {
    //   namepy = this.nameP;
    //   numberpy = this.numberP;
    //   schemy = this.scheme;
    //   agencyy = this.agency;
    // }


    console.log(namepy + numberpy + schemy + agencyy);

    //typ dokumentu
    var mon_miesto, mon_vydavatelstvo, mon_rok, mon_rozsah, mon_pocetah, mon_isbn = '';
    var kap_zdroj, kap_miesto, kap_vydavatelstvo, kap_rok, kap_pocetah, kap_od, kap_do, kap_isbn = "";
    var cas_zdroj, cas_rocnik, cas_cislo, cas_rok, cas_od, cas_do, cas_issn, cas_krajina = "";

    var konf_nazov, konf_miesto, konf_cislo, konf_datum = '';


    if(this.selectedValue) {
      mon_miesto = this.monographForm.editionPlace;
      mon_vydavatelstvo = this.monographForm.editorship;
      mon_rok = this.monographForm.year;
      mon_rozsah = this.monographForm.pagesCount;
      mon_pocetah = this.monographForm.authorsCount;
      mon_isbn = this.monographForm.isbn;
      konf_nazov = this.monographForm.name;
      konf_cislo = this.monographForm.number;
      konf_miesto = this.monographForm.place;
      konf_datum = this.monographForm.date;
      
      
    } else if (this.selectedValue2){

      kap_zdroj = this.formBook.sourceDoc;
      kap_miesto = this.formBook.editionPlace;
      kap_vydavatelstvo = this.formBook.editorship;
      kap_rok = this.formBook.year;
      kap_pocetah = this.formBook.authorsCount;
      kap_od = this.formBook.from;
      kap_do = this.formBook.to;
      kap_isbn = this.formBook.isbn;
      konf_miesto = this.formBook.place;
      konf_nazov = this.formBook.name;
      konf_cislo = this.formBook.number;
      konf_datum = this.formBook.date;

      console.log(kap_zdroj, kap_miesto, kap_vydavatelstvo, kap_rok, kap_pocetah, kap_od, kap_do, kap_isbn, konf_nazov, konf_miesto, konf_cislo, konf_datum);
      

    } else if(this.selectedValue3) {
      
      cas_zdroj = this.magazineForm.sourceDoc;
      cas_rocnik = this.magazineForm.grade;
      cas_cislo = this.magazineForm.number;
      cas_rok = this.magazineForm.year;
      cas_krajina = this.magazineForm.editionCountry;
      cas_issn = this.magazineForm.issn;
      cas_od = this.magazineForm.from;
      cas_do = this.magazineForm.to;

      console.log(cas_zdroj, cas_rocnik, cas_cislo, cas_rok, cas_od, cas_do, cas_issn, cas_krajina);
      
    }

    console.log(this.documentType);
    


    console.log("finalne je: " + names + surnames + tituly + percentages + doktorandy + ustavy + contacty);

    console.log("finalne2 je" + this.documentName + this.documentTranslate + slovakChips + englishChips + this.categoryPub + resr)
    
    //zbernik
    console.log(mon_miesto, mon_vydavatelstvo, mon_rok, mon_rozsah, mon_pocetah, mon_isbn, konf_nazov, konf_miesto, konf_cislo, konf_datum);
    
  
    
    


    
    //tu je potrebne urobit cyklus a to: 
    if (this.documentType ==="monografia_zbornik" ){
      const pub = new Publication(names, surnames, tituly, percentages, doktorandy, departmenty, ustavy, contacty,
        this.documentName, this.documentTranslate,  slovakChips, englishChips, this.categoryPub, resr,
        numberpy, schemy, "", namepy, agencyy, this.webAddress, this.documentType, "", "", "", "", "", "", 
        mon_miesto, mon_vydavatelstvo, mon_rok, mon_rozsah, mon_pocetah, mon_isbn, "", "","","","","","","","","","","","","","","",
        konf_nazov, konf_miesto, konf_cislo, konf_datum
        );

    }



    if (this.documentType ==="clanok_kapitola" ){

      const pub = new Publication(names, surnames, tituly, percentages, doktorandy, departmenty, ustavy, contacty,
        this.documentName, this.documentTranslate,  slovakChips, englishChips, this.categoryPub, resr,
        numberpy, schemy, "", namepy, agencyy, this.webAddress, this.documentType, "", "", "", "", "", "", 
        "", "","","","","", kap_zdroj, kap_miesto, kap_vydavatelstvo, kap_rok, kap_pocetah , kap_od, kap_do, kap_isbn, 
        "", "","","","","","", "", 
        konf_nazov, konf_miesto, konf_cislo, konf_datum
        );

    }






    if (this.documentType ==="clanok_casopis" ){

      const pub = new Publication(names, surnames, tituly, percentages, doktorandy, departmenty, ustavy, contacty,
        this.documentName, this.documentTranslate,  slovakChips, englishChips, this.categoryPub, resr,
        numberpy, schemy, "", namepy, agencyy, this.webAddress, this.documentType, "", "", "", "", "", "", 
        "", "","","","","", "", "","","","","","", "", 
        cas_zdroj, cas_rocnik, cas_cislo, cas_rok, cas_od, cas_do, cas_issn, cas_krajina,
        konf_nazov, konf_miesto, konf_cislo, konf_datum
        );
    }
    

    
    
    // this.userServerService.sendForm(pub).subscribe(
    //   ok =>{
    //     this.router.navigateByUrl('/users');
    //   }
    // );
    // console.log(this.secondFormGroup.value);
    
    console.log("posielam formular");
  }



}
