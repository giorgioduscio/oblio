import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { Character } from '../../../services/character';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-equipaggiamento',
  standalone: true,
  imports: [NgFor,],
  templateUrl: './equipaggiamento.component.html',
  styleUrl: './equipaggiamento.component.css'
})
export class EquipaggiamentoComponent implements OnInit {
  @Input() character! :WritableSignal<Character>
  equipaggiamento! :Character['equipaggiamento']['oggetti']
  monete! :number
  trasporto! :number

  //TODO INIZIALIZZAZIONE
  ngOnInit(): void {
    this.equipaggiamento =this.character().equipaggiamento.oggetti
    this.monete =this.character().equipaggiamento.monete
    this.trasporto =((this.character().bonus.forza.valore *2) +10 ) *7.5
    // console.log(this.monete, this.equipaggiamento);
  }
  
  // TODO MONETE
  changeMoney(e:Event){
    const 
      newValue =Number((e.target as HTMLInputElement).value),
      clone :Character =this.character()
    this.character().equipaggiamento.monete =newValue
  }
  // TODO CAMBIO VALORE
  changeField(e:Event, i:number){
    const 
      name =(e.target as HTMLInputElement).name as keyof Character['equipaggiamento']['oggetti'][0],
      newValue = (e.target as HTMLInputElement).value,
      clone :Character |any =this.character()

    clone.equipaggiamento.oggetti[i][name]
      =name==='quantita' ?Number(newValue) :newValue
    console.log(typeof this.character().equipaggiamento.oggetti);
  }
}
// interface EquipaggiamentoMapper{ key:string, title:string, value:number }