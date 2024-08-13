import { Component, signal, WritableSignal } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../services/character';
import { GeneralitaComponent } from "./generalita/generalita.component";
import { CompetenzeComponent } from "./competenze/competenze.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [GeneralitaComponent, CompetenzeComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  character! :WritableSignal<Character>
  keys! :string[]
  constructor(private charactersService:CharactersService){
    this.character =signal(this.charactersService.characters[0])
    this.keys =Object.keys(this.character()) .filter((key, i)=> i>1)
    
    console.log("card", this.character());
  }
}