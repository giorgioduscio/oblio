import { Component, Input, WritableSignal } from '@angular/core';
import { Character, Morale } from '../../../services/character';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-personalita',
  standalone: true,
  imports: [NgFor],
  templateUrl: './personalita.component.html',
  styleUrl: './personalita.component.css'
})
export class PersonalitaComponent {
  @Input() character! :WritableSignal<Character> 
  fields! :thisCategory[]
  
  //TODO INIZIALIZZAZIONI
  ngOnInit(): void {
    const {personalita} =this.character()
    this.fields =Object.keys(personalita) .map(key =>({
      key: key, 
      title: key.charAt(0).toUpperCase() +key.slice(1),
      value: personalita[key as keyof typeof personalita]
    }))
  }
  
  // TODO CAMBIO VALORE
  changeField(e:Event){
    const 
      {personalita} =this.character(),
      name =(e.target as HTMLInputElement).name as keyof typeof personalita,
      value =(e.target as HTMLInputElement).value,
      clone :Character|any =this.character()

    clone.personalita[name] =value
    this.character.set(clone)
  }
}
interface thisCategory{ key:string, title:string, value:string }