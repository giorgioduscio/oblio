import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CharacterMapper } from './CharacterMapper';

@Component({
  selector: 'app-card-fields',
  standalone: true,
  imports: [NgIf, ],
  template:`
  @if(keyCategory==='Competenze'||keyCategory==='Personalita'){
    <textarea [id]="field.keyField" [value]="field.value"></textarea>
  }
  @else if (field.keyField==='Morale') {
    <select [id]="field.keyField" [value]="field.value">
      <option value="0">Individualista buono</option>
      <option value="1">Individualista neutrale</option>
      <option value="2">Individualista malvagio</option>
      <option value="3">Neutrale buono</option>
      <option value="4">Neutrale puro</option>
      <option value="5">Neutrale malvagio</option>
      <option value="6">Collettivista buono</option>
      <option value="7">Collettivista neutrale</option>
      <option value="8">Collettivista malvagio</option>
    </select>  
  }
  @else if (field.keyField==="Classe armatura") {
    <select [id]="field.keyField" [value]="field.value">
      <option value="0">Senza armatura</option>
      <option value="1">Monaco</option>
      <option value="2">Barbaro</option>
      <option value="3">Armatura di cuoio</option>
      <option value="4">Cotta di maglia</option>
      <option value="5">Armatura di piastre</option>
    </select>
  }
  @else { <!-- DEFAULT -->
    <input 
      *ngIf="field.value!==undefined" 
      [id]="field.keyField"
      [value]="field.value" 
      [type]="inputType(field.value)"
    >
  }
  `,
  styleUrl:'./card.component.css'
})
export class CardFieldsComponent {
  @Input() field!: CharacterMapper['content'][0];
  @Input() keyCategory!: string;
  inputType(value:number |string){ return typeof value==='number' ?'number' :"text" }
}