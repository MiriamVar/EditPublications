import { Component, OnInit } from '@angular/core';
import { ResearchField } from '../form/form.component';

@Component({
  selector: 'app-form-addresearch',
  templateUrl: './form-addresearch.component.html',
  styleUrls: ['./form-addresearch.component.css']
})
export class FormAddresearchComponent implements OnInit {

  constructor() { }

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

  ngOnInit() {
  }

}
