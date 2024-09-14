import { Component } from '@angular/core';
import { Character } from '../../services/character';
import { NgFor, NgIf } from '@angular/common';
import { CharacterMapper } from './CharacterMapper';
import { CardFieldsComponent } from "./cardFields/cardFields.component";
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { User } from '../../services/user';
import { UsersService } from '../../services/users.service';
import { EquipmentComponent } from "./equipment/equipment.component";
import { PrivilegesComponent } from "./privileges/privileges.component";
import { BonusComponent } from "./bonus/bonus.component";
import { CombatComponent } from "./combat/combat.component";
import { initCharacter } from './initCharacter';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, NgFor, CardFieldsComponent, NavbarComponent, EquipmentComponent, PrivilegesComponent, BonusComponent, CombatComponent],
  templateUrl: './card.component.html',
  styleUrls:['./card.component.css','./cardResponsive.component.css']
})

export class CardComponent {
  mk ={userKey:'', charKey:''}
  userKey :string =''
  charKey :string =''
  user :User ={ id: 0, email: '', username: '', password: '', imageUrl: '' }
  character :Character =initCharacter()
  characterMapper :CharacterMapper[] =[]

  constructor(private activateRoute:ActivatedRoute, private usersService:UsersService){
    document.title =`Card`
    activateRoute.params.subscribe((params:any)=>{ this.mk ={...params} })
    usersService.getUsers().subscribe((res:any)=>{
      this.user =res[this.mk.userKey]
      this.character =this.user.gdrCharacters![this.mk.charKey as keyof object]
      this.characterMapper =CharacterMapper(this.character)
      // console.log(this.character, this.characterMapper);
    })
  }
  // DROPDOWN
  menageDrop(e:Event){
    const div =(e.target as HTMLInputElement).parentElement
    div?.attributes.getNamedItem('drop') 
    ? div?.removeAttribute('drop') 
    : div?.setAttribute('drop','')
  }
}