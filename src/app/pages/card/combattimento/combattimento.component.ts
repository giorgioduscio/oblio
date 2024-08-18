import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { Character, ClasseArmatura } from '../../../services/character';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-combattimento',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './combattimento.component.html',
  styleUrl: './combattimento.component.css'
})
export class CombattimentoComponent implements OnInit {
  @Input() character! :WritableSignal<Character>
  combattimento :thisCategory[] =[]

  // TODO INIZIALIZZAZIONE
  ngOnInit(): void {
    const cos =this.character().bonus.costituzione.valore

    this.combattimento =Object.keys(this.character().combattimento) .map(key=>({
      key:key,
      title: key.charAt(0).toUpperCase() +key.slice(1) .replaceAll('_',' '),
      value: this.character().combattimento[key as keyof Character['combattimento']]
    }))
    this.combattimento.unshift({ key:"punti_ferita", title:"Punti ferita", value: 20 +cos +(cos *Math.abs(cos)) })
  }

  // TODO CAMBIO VALORE
  changeField(e:Event){
    const 
      {combattimento} =this.character(),
      name =(e.target as HTMLInputElement).name as keyof typeof combattimento,
      value =(e.target as HTMLInputElement).value,
      clone :Character|any =this.character()

    clone.combattimento[name] =Number(value)
    this.character.set(clone)
  }

  calculateCA():number{
    const {destrezza, costituzione, saggezza} =this.character().bonus
    switch(this.character().combattimento.classe_armatura){
      case 0: return 10 +destrezza.valore
      case 1: return 10 +destrezza.valore +saggezza.valore
      case 2: return 10 +destrezza.valore +costituzione.valore
      case 3: return 12 +destrezza.valore 
      case 4: return 16
      case 5: return 18
      default: return 404
    }
  }
}
interface thisCategory{ key:string, title:string, value:number }