import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { Character, Morale } from '../../../services/character';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-generalita',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './generalita.component.html',
  styleUrl: './generalita.component.css'
})

export class GeneralitaComponent implements OnInit{
  @Input() character! :WritableSignal<Character> 
  fields! :Compiler[]
  trasporto! :number 
  
  //TODO INIZIALIZZAZIONI
  ngOnInit(): void {
    // console.log("character", this.moralEnum);
    // PESO TRASPORTABILE
    this.trasporto =((this.character().bonus.punteggi.forza *2) +10 ) *7.5
    
    // CREA UN AUTOCOMPILATORE {field.key field.value field.inputType}
    const {generalita} =this.character()
    this.fields =Object.keys(generalita) 
      .map(key =>{
        let value =generalita[key as keyof typeof generalita]
        if(key==="morale"&& typeof(value)==='number') value =Morale[value].replace('_',' ')
        return {
          name: key, 
          title: (key.charAt(0).toUpperCase() +key.slice(1)) .replace('_',' '), 
          value: value, 
          inputType: typeof(value)=='number' ?'number' :'text'
        }})
  }
  
  // TODO CAMBIO VALORE
  changeField(e:Event){
    const 
      {generalita} =this.character(),
      name =(e.target as HTMLInputElement).name as keyof typeof generalita,
      value =(e.target as HTMLInputElement).value,
      clone :Character|any =this.character()

    if (typeof(generalita[name])==='number') Number(value)
    clone.generalita[name] =value
    this.character.set(clone)
  }
}

interface Compiler{
  title:string, 
  name:string, 
  value:(string| number), 
  inputType:string
}