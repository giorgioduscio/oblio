import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { Character } from '../../../services/character';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-privilegi',
  standalone: true,
  imports: [NgFor],
  templateUrl: './privilegi.component.html',
  styleUrl: './privilegi.component.css'
})
export class PrivilegiComponent implements OnInit {
  @Input() character! :WritableSignal<Character>
  privilegi! :Privilegi[]

  //TODO INIZIALIZZAZIONE
  ngOnInit(): void {
    this.privilegi =this.character().privilegi .map(title=>({
      titolo: title,
      descrizione: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt perspiciatis repudiandae vel optio nostrum. Dolorum officia eaque assumenda porro tempore itaque temporibus? Consequatur saepe nobis quibusdam voluptas voluptatibus? Aut, reiciendis."
    }))
    // console.log(this.privilegi);
  }
  // TODO CAMBIO VALORE
  changeField(e:Event, i:number){
    const 
      newValue = (e.target as HTMLInputElement).value,
      clone :Character |any =this.character()

    clone.privilegi[i] =newValue
    // console.log(i, newValue);
  }
}
interface Privilegi{ titolo:string, descrizione:string }