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
    {value :"AEC"  >AEC - Vedecké práce v zahraničných recenzovaných vedeckých zborníkoch, monografiách</option>
    {value :"AED"  >AED - Vedecké práce v domácich recenzovaných vedeckých zborníkoch, monografiách</option>
    {value :"AEE"  >AEE - Vedecké práce v zahraničných nerecenzovaných vedeckých zborníkoch, monografiách</option>
    {value :"AEF"  >AEF - Vedecké práce v domácich nerecenzovaných vedeckých zborníkoch, monografiách</option>
    {value :"AEG"  >AEG - Abstrakty vedeckých prác v zahraničných karentovaných časopisoch</option>
    {value :"AEH"  >AEH - Abstrakty vedeckých prác v domácich karentovaných časopisoch</option>
    {value :"AEM"  >AEM - Abstrakty vedeckých prác v zahraničných časopisoch registrovaných v databázach Web of Science alebo SCOPUS</option>
    {value :"AEN"  >AEN - Abstrakty vedeckých prác v domácich časopisoch registrovaných v databázach Web of Science alebo SCOPUS</option>
    {value :"AFA"  >AFA - Publikované pozvané príspevky na zahraničných vedeckých konferenciách</option>
    {value :"AFB"  >AFB - Publikované pozvané príspevky  na domácich vedeckých konferenciách</option>
    {value :"AFC"  >AFC - Publikované príspevky na zahraničných vedeckých konferenciách</option>
    {value :"AFD"  >AFD - Publikované príspevky na domácich vedeckých konferenciách</option>
    {value :"AFE"  >AFE - Abstrakty pozvaných príspevkov zo zahraničných vedeckých konferencií</option>
    {value :"AFF"  >AFF - Abstrakty pozvaných príspekov z domácich vedeckých konferencií</option>
    {value :"AFG"  >AFG - Abstrakty príspevkov zo zahraničných vedeckých konferencií</option>
    {value :"AFH"  >AFH - Abstrakty príspevkov z domácich vedeckých konferencií</option>
    {value :"AFI"  >AFI - Preprinty vedeckých prác vydané v zahraničných vydavateľstvách</option>
    {value :"AFJ"  >AFJ - Preprinty vedeckých prác vydané v domácich vydavateľstvách</option>
    {value :"AFK"  >AFK - Postery zo zahraničných konferencií</option>
    {value :"AFL"  >AFL - Postery z domácich konferencií</option>
    {value :"AGI"  >AGI - Správy o vyriešených vedeckovýskumných úlohách</option>
    {value :"AGJ"  >AGJ - Patentové prihlášky, prihlášky úžitkových vzorov, prihlášky dizajnov, prihlášky ochranných známok...</option>
    {value :"BAA"  >BAA - Odborné knižné publikácie vydané v zahraničných vydavateľstvách</option>
    {value :"BAB"  >BAB - Odborné knižné publikácie vydané v domácich vydavateľstvách</option>
    {value :"BBA"  >BBA - Kapitoly v odborných knižných publikáciách vydané v zahraničných vydavateľstvách</option>
    {value :"BBB"  >BBB - Kapitoly v odborných knižných publikáciách vydané v domácich vydavateľstvách</option>
    {value :"BCB"  >BCB - Učebnice pre stredné a základné školy</option>
    {value :"BCI"  >BCI - Skriptá  a učebné texty</option>
    {value :"BCK"  >BCK - Kapitoly v učebniciach a učebných textoch</option>
    {value :"BDA"  >BDA - Heslá v odborných terminologických slovníkoch a encyklopédiách vydaných v zahraničných vydavateľstvách</option>
    {value :"BDB"  >BDB - Heslá v odborných terminologických slovníkoch a encyklopédiách vydaných v domácich vydavateľstvách</option>
    {value :"BDC"  >BDC - Odborné práce v zahraničných karentovaných časopisoch</option>
    {value :"BDD"  >BDD - Odborné práce v domácich karentovaných časopisoch</option>
    {value :"BDE"  >BDE - Odborné práce v ostatných zahraničných časopisoch</option>
    {value :"BDF"  >BDF - Odborné práce v ostatných domácich časopisoch</option>
    {value :"BDM"  >BDM - Odborné práce v zahraničných časopisoch registrovaných v databázach Web of Science alebo SCOPUS</option>
    {value :"BDN"  >BDN - Odborné práce v domácich časopisoch registrovaných v databázach Web of Science alebo SCOPUS</option>
    {value :"BEC"  >BEC - Odborné práce v zahraničných recenzovaných zborníkoch (konferenčných aj nekonferenčných)</option>
    {value :"BED"  >BED - Odborné práce v domácich recenzovaných zborníkoch (konferenčných aj nekonferenčných)</option>
    {value :"BEE"  >BEE - Odborné práce v zahraničných zborníkoch (konferenčných aj nekonferenčných)</option>
    {value :"BEF"  >BEF - Odborné práce v domácich zborníkoch (konferenčných aj nekonferenčných)</option>
    {value :"BFA"  >BFA - Abstrakty odborných prác zo zahraničných podujatí (konferencie...)</option>
    {value :"BFB"  >BFB - Abstrakty odborných prác z domácich podujatí (konferencie...)</option>
    {value :"BGG"  >BGG - Normy</option>
    {value :"BGH"  >BGH - Legislatívne dokumenty</option>
    {value :"CAA"  >CAA - Umelecké monografie, dramatické diela, scenáre, umelecké preklady publikácií, autorské katalógy vydané v zahraničných vydavateľstvách</option>
    {value :"CAB"  >CAB - Umelecké monografie, dramatické diela, scenáre, umelecké preklady publikácií, autorské katalógy vydané v domácich vydavateľstvách</option>
    {value :"CBA"  >CBA - Kapitoly v umeleckých monografiách,kapitoly umeleckých prekladov publikácií vydaných v zahraničných vydavateľstvách</option>
    {value :"CBB"  >CBB - Kapitoly v umeleckých monografiách,kapitoly umeleckých prekladov publikácií vydaných v domácich vydavateľstvách</option>
    {value :"CAG"  >CAG - Audiovizuálne diela (videokazeta, film, CD-ROM, DVD) natočené v zahraničnej produkcii</option>
    {value :"CAH"  >CAH - Audiovizuálne diela (videokazeta, film, CD-ROM, DVD) natočené v domácej produkcii</option>
    {value :"CAI"  >CAI - Hudobné diela (partitúry, notové materiály) vydané v zahraničných vydavateľstvách</option>
    {value :"CAJ"  >CAJ - Hudobné diela (partitúry, notové materiály) vydané v domácich vydavateľstvách</option>
    {value :"CDC"  >CDC - Umelecké práce a preklady v zahraničných karentovaných časopisoch</option>
    {value :"CDD"  >CDD - Umelecké práce a preklady v domácich karentovaných časopisoch</option>
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
