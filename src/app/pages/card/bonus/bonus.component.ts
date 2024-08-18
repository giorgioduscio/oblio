import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { Character } from '../../../services/character';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-bonus',
  standalone: true,
  imports: [NgFor],
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.css'
})
export class BonusComponent implements OnInit {
  @Input() character! :WritableSignal<Character>
  characteristics! :BonusMapper[]
  BC :number =2

  //TODO INIZIALIZZAZIONE
  ngOnInit(): void {
    this.BC =this.character().bonus.competenza
    this.characteristics =Object.keys(this.character().bonus) 
      .filter(key=>key!=="competenza")
      .map(key =>{
        const 
          bonus :any =this.character().bonus[key as keyof Character['bonus']],
          value :number =bonus.valore,
          abilities :object =bonus.abilita

        return{
          key: key, 
          title: key.charAt(0).toUpperCase() +key.slice(1),
          value: value,
          abilities: Object.keys(abilities) 
            .map(abilityKey =>({
              key:abilityKey,
              title: abilityKey.charAt(0).toUpperCase() +abilityKey.slice(1) .replaceAll('_',' '),
              value: abilities[abilityKey as keyof object],
            }))
        }})
    console.log(this.characteristics);
  }
  
  // TODO CAMBIO VALORE CARATTERISTICA
  changeCharacteristic(e:Event){
    const 
      {bonus} =this.character(),
      name =(e.target as HTMLInputElement).name as keyof typeof bonus,
      value =(e.target as HTMLInputElement).value,
      clone :Character|any =this.character()

    clone.bonus[name].valore =Number(value)
    this.character.set(clone)

    console.log(this.character().bonus);
  }
  // TODO CAMBIO VALORE ABILITA
  changeAbility(characteristicKey:string, abilityKey:string, e:Event){
    const 
      C =characteristicKey as keyof Character['bonus'],
      A =abilityKey as keyof Character['bonus'][typeof C],
      clone :Character |any =this.character()

    clone.bonus[C].abilita[A] =(e.target as HTMLInputElement).checked
    this.character.set(clone)
    
    console.log(this.character().bonus);
  }
}
interface BonusMapper{ key:string, title:string, value:number, abilities:AbilityMapper[] }
interface AbilityMapper{ key:string, title:string, value:boolean }