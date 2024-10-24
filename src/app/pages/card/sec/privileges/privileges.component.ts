import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MappedCharacter } from '../../tools/MappedCharacter';
import { NavbarComponent } from "../../../../comp/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../card.service';
import { PrivilegesService } from '../../../../services/privileges.service';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent,MatIcon, FormsModule, RouterModule],
  template:`
  <main>
  <button class="privLink" routerLink="/privileges/{{card.charKey}}">
    Privilegi <mat-icon>add</mat-icon>
  </button>

    <form #privilegesForm="ngForm" (ngSubmit)="card.onAddRecord(category.keyCategory,privilegesForm)">
      <input type="text" placeholder="Aggiungi privilegio" name="titolo" ngModel required>
      <button type="submit"><mat-icon>add</mat-icon></button>
    </form>

    @for(sub of field.content; track $index; let c=$index){ @if(sub.value){
      <div>
        <div class="title">
          <input
            type="text" 
            [value]="sub.value" 
            (change)="card.onPatchSubfield(category.keyCategory, field.keyField, $event, c)"
          >
          <span>{{ privilegeProp(c).cost }} PE</span>
          <mat-icon (click)="card.onDeleteRecord(category.keyCategory,c)">delete</mat-icon>
        </div>

        <span class="description">{{ privilegeProp(c).description }}</span>
      </div>
    }}
  </main>
  `,
  styleUrls:['../../card.component.css','./privileges.component.css']
})
export class PrivilegesComponent {
  category!:MappedCharacter
  field!:MappedCharacter['content'][number]
  constructor(public card:CardService, private ps:PrivilegesService){
    this.category =card.mappedCharacter[6]
    this.field =this.category.content[1]
    // console.log(this.category, this.field);
  }

  privilegeProp(i:number){ 
    const title =this.card.character.privilegi.privilegi[i]
    return {
      description: this.ps.privilegeDescription(title),
      cost: this.ps.privilegeCost(title)
    }
  }
}