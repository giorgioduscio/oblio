import { Component, effect } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MappedCharacter } from './tools/MappedCharacter';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../../services/character';
import { MatIcon } from '@angular/material/icon';
import { EquipmentService } from '../../services/equipment.service';
import { PrivilegesService } from '../../services/privileges.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CharactersService } from '../../services/characters.service';
import { CardService } from './card.service';
import { TraitsComponent } from "./sec/traits/traits.component";
import { ToolsComponent } from "./sec/tools/tools.component";
import { PrivilegesComponent } from "./sec/privileges/privileges.component";
import { CombatComponent } from "./sec/combat/combat.component";
import { GenericComponent } from "./sec/generic/generic.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent, MatIcon, FormsModule, RouterModule, TraitsComponent, ToolsComponent, PrivilegesComponent, CombatComponent, GenericComponent],
  templateUrl: './card.component.html',
  styleUrls:['./card.component.css','./cardResponsive.component.css']
})
export class CardComponent {
  charKey=''
  mappedCharacter :MappedCharacter[] =[]
  character! :Character
  constructor(
    private activatedRoute:ActivatedRoute, 
    private charactersService:CharactersService,
    public card:CardService,

    private equipService:EquipmentService,
    private privilegeService:PrivilegesService,
  ){ 
    document.title =`Card`
    activatedRoute.params.subscribe((params:any)=>{ this.charKey =params.charKey })
    charactersService.getCharacter()
    
    effect(()=>{ 
      this.character =charactersService.characters().find(c=>c.key===this.charKey)!
      if(this.character){
        this.mappedCharacter =MappedCharacter( this.character )

        card.charKey =this.charKey
        card.character =this.character
        card.mappedCharacter =this.mappedCharacter
        // console.log('cardComponent',card.charKey, card.character, card.mappedCharacter);
      }
    })
  }

  // DROPDOWN
  dropdowns =[false, false, false, false, false, false, false]
  menageDrop(index:number){ this.dropdowns[index] =!this.dropdowns[index] }
  





}