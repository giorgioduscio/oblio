import { Component } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../services/character';
import { NgFor, NgIf } from '@angular/common';
import { CharacterMapper, Initial } from './CharacterMapper';
import { CardFieldsComponent } from "./cardFields.component";
import { CardContent } from "./cardContent.component";
import { NavbarComponent } from "../../comp/navbar/navbar.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, NgFor, CardFieldsComponent, CardContent, NavbarComponent],
  templateUrl: './card.component.html',
  styleUrl:'./card.component.css'
})
export class CardComponent {
  characters! :Character[]
  character! :CharacterMapper[] 

  constructor(private charactersService:CharactersService){
    this.characters =this.charactersService.characters
    this.character =CharacterMapper(this.characters[0])
    
  } //constructor
  abilityModifier(proficiency:boolean, modifier:number){
    const proficiencyBonus =this.characters[0].bonus.competenza
    return proficiency ?modifier+proficiencyBonus :modifier
  }
}