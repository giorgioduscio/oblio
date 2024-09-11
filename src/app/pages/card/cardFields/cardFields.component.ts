import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CharacterMapper } from '../CharacterMapper';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { Character } from '../../../services/character';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-fields',
  standalone: true,
  imports: [NgIf, MatIcon, FormsModule],
  templateUrl:'./cardFields.component.html',
  styleUrl:'../card.component.css'
})
export class CardFieldsComponent {
  // MODIFICA I CAMPI IN BASE A DOVE SI TROVANO 
  @Input() field!: CharacterMapper['content'][0];
  @Input() keyCategory!: string;
  userKey! :string
  charKey! :string
  character! :Character
  
  // TODO MOSTRA
  constructor(private activatedRoute:ActivatedRoute, private usersService:UsersService){
    usersService.getUsers().subscribe((res:any)=>{
      activatedRoute.params.subscribe(params=>{
        this.userKey =params['userKey']
        this.charKey =params['charKey']
        this.character =res[this.userKey].gdrCharacters[this.charKey]
        // console.log('res', this.character);
      })
    })
  }
  inputType(value:number |string){ return typeof value==='number' ?'number' :"text" }

  //TODO MODIFICA
  updateField(keyCategory:string,fieldKey:string, e:Event){
    const newValue =(e.target as HTMLInputElement).value
      ,clone :any =this.character
    clone[keyCategory][fieldKey] =typeof clone[keyCategory][fieldKey]==='number' ?Number(newValue) :newValue
      this.character =clone
    this.usersService.patchCharacter(this.userKey, this.charKey, this.character)
      .subscribe((res:any)=>{
        console.log(
          // keyCategory, fieldKey, newValue,
          clone[keyCategory][fieldKey]
        );
      })
  }

}