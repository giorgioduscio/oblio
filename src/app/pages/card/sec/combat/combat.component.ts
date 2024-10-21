import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MappedCharacter } from '../../tools/MappedCharacter';
import { NavbarComponent } from "../../../../comp/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { Character } from '../../../../services/character';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent,MatIcon, FormsModule, RouterModule],
  template:`
  <label [for]="field.keyField">{{field.title}}</label>
  <div class="{{field.keyField=='classe_armatura' ?'CA' :'inline'}}">
    <select
      *ngIf="field.keyField=='classe_armatura';else combatNumbers"
      [value]="field.value" 
      [id]="field.keyField" 
      (change)="card.onPatchField(category.keyCategory, $event)"
      >
      <option value="0">Senza armatura</option>
      <option value="1">Monaco</option>
      <option value="2">Barbaro</option>
      <option value="3">Armatura di cuoio</option>
      <option value="4">Cotta di maglia</option>
      <option value="5">Armatura di piastre</option>
    </select>
    
    <ng-template #combatNumbers>
      <input
        type="number" 
        [step]="field.keyField=='velocita' ?1.5 :1"
        [id]="field.keyField" 
        [value]="field.value"
        (change)="card.onPatchField(category.keyCategory, $event)"
      >
    </ng-template>

    <span class="flexRow">
      {{combat(field.keyField).value}} 
      <mat-icon>{{combat(field.keyField).icon}}</mat-icon>
    </span>
  </div>

  `,
  styleUrls:['../../card.component.css','./combat.component.css']
})
export class CombatComponent {
  category!:MappedCharacter
  @Input() field!:MappedCharacter['content'][number]
  constructor(public card:CardService){
    this.category =card.mappedCharacter[2]
    // console.log(this.category, this.field);
  }
  // COMBATTIMENTO
  combat(key:string) {
    const $key =key as keyof Character['combattimento']
    ,     value =this.card.character.combattimento[$key]
    ,     destrezza =this.card.character.bonus.caratteristica.destrezza.valore
    ,     costituzione =this.card.character.bonus.caratteristica.costituzione.valore
    ,     saggezza =this.card.character.bonus.caratteristica.saggezza.valore
    ,     hitPoints =20 +costituzione +(costituzione *Math.abs(costituzione))
    
    let CA =0
    switch(value){
      case 1: CA =10 +destrezza +saggezza; break
      case 2: CA =10 +destrezza +costituzione; break
      case 3: CA =12 +destrezza; break
      case 4: CA =16; break
      case 5: CA =18; break
      default: CA =10 +destrezza;
    }
    switch(key){
      case 'classe_armatura': return { icon:'shield', value: CA}
      case 'velocita':        return { icon:'speed', value: value/1.5 }
      case 'pf_attuali':      return { icon:'favorite', value: hitPoints }
      default:                return { icon:'favorite', value:404 }
    }
  }
}