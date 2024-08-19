import { Component, signal, WritableSignal } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../services/character';
import { GeneralitaComponent } from "./generalita/generalita.component";
import { CompetenzeComponent } from "./competenze/competenze.component";
import { CombattimentoComponent } from "./combattimento/combattimento.component";
import { PersonalitaComponent } from "./personalita/personalita.component";
import { BonusComponent } from "./bonus/bonus.component";
import { EquipaggiamentoComponent } from "./equipaggiamento/equipaggiamento.component";
import { PrivilegiComponent } from "./privilegi/privilegi.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [GeneralitaComponent, CompetenzeComponent, CombattimentoComponent, PersonalitaComponent, BonusComponent, EquipaggiamentoComponent, PrivilegiComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  character! :WritableSignal<Character>
  constructor(private charactersService:CharactersService){
    this.character =signal(this.charactersService.characters[0])
    
    console.log("card", this.character());
  }
}