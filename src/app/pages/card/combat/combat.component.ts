import { Component } from '@angular/core';
import { Character } from '../../../services/character';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { MatIcon } from '@angular/material/icon';
import { initCharacter } from '../initCharacter';

@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.css'
})
export class CombatComponent {
  userId! :string
  charId! :string
  character :Character =initCharacter()
  combat :Character['combattimento'] ={ velocita: 0, classe_armatura: 0, pf_attuali: 0 }

  // TODO MOSTRA
  constructor(private activateRoute:ActivatedRoute, private usersService:UsersService){
    activateRoute.params.subscribe(params=>{
      usersService.getUsers().subscribe((res:any)=>{
        this.userId =params['userId']
        this.charId =params['charId']
        this.character =res[this.userId].gdrCharacters[this.charId]
        this.combat =this.character.combattimento
        // console.log(this.combat, );
      })
    })
  }
  calculateCA():number{
    const destrezza =this.character.bonus.caratteristica.destrezza.valore
      ,costituzione =this.character.bonus.caratteristica.costituzione.valore
      ,saggezza =this.character.bonus.caratteristica.saggezza.valore

    switch(this.character.combattimento.classe_armatura){
      case 1: return 10 +destrezza +saggezza;
      case 2: return 10 +destrezza +costituzione;
      case 3: return 12 +destrezza;
      case 4: return 16;
      case 5: return 18;
      default: return 10 +destrezza;
    }
  }
  hitPoints():number{
    const cos =this.character.bonus.caratteristica.costituzione.valore
    return 20 +cos +(cos *Math.abs(cos))
  }

  //TODO MODIFICA
  updateField(e:Event){
    const {value, id} =(e.target as HTMLInputElement)
    this.character.combattimento[id as keyof Character['combattimento']] =Number(value)
    this.usersService.patchCharacter(this.userId, this.charId, this.character)
      .subscribe((res:any)=>{
        console.log(
          this.character.combattimento
        );
      })
  }

  
}
