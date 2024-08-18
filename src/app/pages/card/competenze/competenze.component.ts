import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { Character } from '../../../services/character';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-competenze',
  standalone: true,
  imports: [NgFor],
  templateUrl: './competenze.component.html',
  styleUrl: './competenze.component.css'
})
export class CompetenzeComponent implements OnInit{
  @Input() character! :WritableSignal<Character>
  fields! :thisCategory[]

  //TODO INIZIALIZZAZIONE
  ngOnInit(): void {
    const {competenze} =this.character()
    this.fields =Object.keys(competenze) .map(key =>({
      key: key, 
      title: key.charAt(0).toUpperCase() +key.slice(1),
      value: competenze[key as keyof typeof competenze]
    }))
  }
  
  // TODO CAMBIO VALORE
  changeField(e:Event){
    const 
      {competenze} =this.character(),
      name =(e.target as HTMLInputElement).name as keyof typeof competenze,
      value =(e.target as HTMLInputElement).value,
      clone :Character|any =this.character()

    clone.competenze[name] =value
    this.character.set(clone)
  }
}
interface thisCategory{ key:string, title:string, value:string }