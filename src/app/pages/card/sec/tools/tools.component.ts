import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MappedCharacter } from '../../tools/MappedCharacter';
import { NavbarComponent } from "../../../../comp/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { Character } from '../../../../services/character';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../card.service';
import { EquipmentService } from '../../../../services/equipment.service';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent,MatIcon, FormsModule, RouterModule],
  template:`
  <main>
    <button class="equipLink" routerLink="/equipment/{{card.charKey}}">
      Equipaggiamento <mat-icon>add</mat-icon>
    </button>

    <form #toolsForm="ngForm" (ngSubmit)="card.onAddRecord(category.keyCategory,toolsForm)">
      <input type="number" placeholder="Quantità" name="quantita" ngModel >
      <input type="text" placeholder="Aggiungi strumento" name="titolo" ngModel required >
      <button type="submit"> <mat-icon>add</mat-icon></button>
    </form>

    @for(sub of field.content; track $index; let c=$index){ @if(sub.keySub){
      <div>
        <input
          type="number" 
          [value]="sub.value" 
          id="quantita"
          (change)="card.onPatchSubfield(category.keyCategory,field.keyField,$event,c)"
        >
        <input
          type="text" 
          [value]="sub.keySub" 
          id="titolo"
          (change)="card.onPatchSubfield(category.keyCategory,field.keyField,$event,c)"
        >
        <span>{{ toolWeight(c) }}kg</span>
        <button (click)="card.onDeleteRecord(category.keyCategory,c)"> <mat-icon>delete</mat-icon> </button>
      </div>
    }}
  </main>
  `,
  styleUrls:['../../card.component.css','./tools.component.css']
})
export class ToolsComponent {
  category!:MappedCharacter
  field!:MappedCharacter['content'][4]
  constructor(public card:CardService, private es:EquipmentService){
    this.category =card.mappedCharacter[5]
    this.field =this.category.content[1]
    // console.log(this.category, this.field);
  }
  toolWeight(i:number) :number {
    if(this.card.character.equipaggiamento.oggetti[i]){
      const toolAmount =this.card.character.equipaggiamento.oggetti[i].quantita
      ,     toolTitle =this.card.character.equipaggiamento.oggetti[i].titolo
      return this.es.toolWeight(toolTitle, toolAmount)
    } else return 404
  }


}