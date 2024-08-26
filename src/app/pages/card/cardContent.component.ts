import { Component, Input } from '@angular/core';
import { Character } from '../../services/character';
import { NgFor, NgIf } from '@angular/common';
import { CharacterMapper, Initial } from './CharacterMapper';
import { CardFieldsComponent } from "./cardFields.component";
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [NgIf, NgFor, CardFieldsComponent],
  template:`
  <!-- FIX GENERICO -->
  <main class="item{{category.keyCategory}}" *ngFor="let field of category.content; let b=index">
    <div class="field {{field.keyField}}">
      <label [for]="field.keyField" *ngIf="a!==6&&field.keyField!=='Caratteristica'">
        {{field.keyField}}
      </label>
      <app-card-fields [field]="field" [keyCategory]="category.keyCategory"></app-card-fields>
    </div>
      
    <!-- TODO BONUS ED EQUIPAGGIAMENTO -->
    <div class="subfields {{field.keyField}}" *ngIf="field.content"> 
      <main *ngFor="let subfield of field.content; let c=index">
        <span>
          <label [for]="subfield.keySub">{{subfield.keySub}}</label>
          <input type="number" [id]="subfield.keySub" [value]="subfield.value">
        </span>
        
        <!-- OPTIMIZE LE ABILITA -->
        <div class="abilities" *ngIf="category.keyCategory==='Bonus'">
          @for (ability of subfield.content; track ability; let d=$index) {
            <input type="checkbox" [id]="ability.keyAb" [checked]="ability.value">
            <label [htmlFor]="ability.keyAb">
              <b>{{abilityModifier(ability.value,subfield.value)}}</b>
              {{ability.keyAb}}
            </label>
        }</div>

      </main>
    </div>

  </main>
  `,
  styleUrl:'./card.component.css'
})
export class CardContent {
  @Input() a! :number
  characters! :Character[]
  character! :CharacterMapper[]
  category! :CharacterMapper
  
  constructor(private charactersService:CharactersService){
    this.characters =charactersService.characters
    this.character =CharacterMapper(this.characters[0])
  }
  ngOnInit(): void {
    this.category =this.character[this.a]
    // console.log(this.character,this.a);
  }

  abilityModifier(proficiency:boolean, modifier:number){
    const proficiencyBonus =this.characters[0].bonus.competenza
    return proficiency ?modifier+proficiencyBonus :modifier
  }
  
}