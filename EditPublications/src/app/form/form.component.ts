import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  options: Option[] = [
    {value: 'no-0', viewValue: 'Nie'},
    {value: 'yesI-1', viewValue: 'Ano - interny'},
    {value: 'yesE-2', viewValue: 'Ano - externy'}
  ];

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
  
  constructor() { }

  ngOnInit() {
  }

}
