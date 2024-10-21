import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MappedCharacter } from '../../tools/MappedCharacter';
import { NavbarComponent } from "../../../../comp/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { Character } from '../../../../services/character';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-traits',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent,MatIcon, FormsModule, RouterModule],
  template:`
  <main>
    <div class="trait" *ngFor="let sub of field.content; let i=index">
      <!-- PUNTEGGIO -->
      <div class="">
        <label [for]="sub.keySub">{{sub.titleSub}}</label>
        <input
          type="number" 
          [value]="sub.value" 
          [id]="sub.keySub" 
          (change)="card.onPatchSubfield(category.keyCategory,field.keyField,$event)"
        >
      </div>
      <!-- ABILITA' -->
      <main class="abilities"> @for (ability of sub.content; track $index) {
        <input
          type="checkbox" 
          [checked]="ability.value" 
          [id]="ability.keyAb" 
          (change)="card.onPatchAbility(sub.keySub,$event)"
        >
        <label [for]="ability.keyAb">{{abilityBonus(sub.keySub, ability.keyAb)}}</label>
      }</main>
    </div>
  </main>
  `,
  styleUrls:['../../card.component.css','./traits.component.css']
})
export class TraitsComponent {
  category!:MappedCharacter
  field!:MappedCharacter['content'][4]
  constructor(public card:CardService){
    this.category =card.mappedCharacter[4]
    this.field =this.category.content[1]
    // console.log(this.category, this.field);
  }
  // BONUS  
  abilityBonus(traitName:string, abilityName:string) :string {
    const $tn =traitName as keyof Character['bonus']['caratteristica']
    ,     traitValue =this.card.character.bonus.caratteristica[$tn].valore
    ,     $an =abilityName as keyof Character['bonus']['caratteristica'][typeof $tn]['abilita']
    ,     abilityValue :boolean =this.card.character.bonus.caratteristica[$tn].abilita[$an]
    ,     abilityBonus =abilityValue ?traitValue+this.card.character.bonus.competenza :traitValue
    return abilityBonus +' ' +$an
  }
}