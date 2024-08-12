import { Component } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../services/character';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  character :Character
  keys! :string[]
  constructor(private charactersService:CharactersService){
    this.character =this.charactersService.characters[0]
    this.keys =Object.keys(this.character)
    console.log(this.character);
  }
}
