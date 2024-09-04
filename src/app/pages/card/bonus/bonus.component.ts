import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Character } from '../../../services/character';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { mapper } from '../../../tools/tools';
import { upperSpaces } from '../CharacterMapper';

@Component({
  selector: 'app-bonus',
  standalone: true,
  imports: [NgFor],
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.css'
})
export class BonusComponent {
  userId! :string
  charId! :string
  character! :Character
  bonus! :Character['bonus']
  mappedTraits! :{abilities:{key:string, title:string, value:boolean}[], key:string, title:string, value:number}[]
  proficiencyBonus! :number
  // TODO MOSTRA
  constructor(private activatedRoute:ActivatedRoute, private usersService:UsersService){
    activatedRoute.params.subscribe(params=>{
      usersService.getUsers().subscribe((res:any)=>{
        this.userId =params['userId']
        this.charId =params['charId']

        this.character =res[this.userId].gdrCharacters[this.charId]
        this.proficiencyBonus =this.character.bonus.competenza
        this.mappedTraits =Object.keys(this.character.bonus.caratteristica) 
          .map((key)=>({
            key:key,
            title: upperSpaces(key),
            value: this.character.bonus.caratteristica[key as keyof object]['valore'],
            abilities: Object.keys(this.character.bonus.caratteristica[key as keyof object]['abilita'])
              .map(abilityKey=>({
                key:abilityKey, 
                title: upperSpaces(abilityKey),
                value:this.character.bonus.caratteristica[key as keyof object]['abilita'][abilityKey] 
              })),
          }))
        // console.log(this.mappedTraits);
      })
    })
  }
  abilityModifier(proficiency:boolean, modifier:number){
    const proficiencyBonus =this.character.bonus.competenza
    return proficiency ?modifier+proficiencyBonus :modifier
  }
  // TODO MODIFICA
  updateProficiency(e:Event){
    const value =Number((e.target as HTMLInputElement).value)
    this.character.bonus.competenza =value
    this.usersService.patchCharacter(this.userId, this.charId,this.character)
    .subscribe((res:any)=>{ 
      this.character =res
      console.log('bc', this.character.bonus.competenza);
    })
  }
  updateBonus(traitName:string,e:Event){
    const traitKey =traitName as keyof Character['bonus']['caratteristica']
    const value =Number((e.target as HTMLInputElement).value)

    this.character.bonus.caratteristica[traitKey]['valore'] =value
    this.usersService.patchCharacter(this.userId, this.charId,this.character)
    .subscribe((res:any)=>{ 
      this.character =res
      this.mappedTraits .filter(trait=>trait.key==traitKey)[0]['value'] = value
      console.log(this.mappedTraits);
    })
  }
  updateAbility(traitName:string, abilityName:string,e:Event){
    const newValue =(e.target as HTMLInputElement).checked
    const clone :any =this.character
    clone.bonus.caratteristica[traitName].abilita[abilityName] =newValue
    this.character=clone

    this.usersService.patchCharacter(this.userId, this.charId,this.character)
    .subscribe((res:any)=>{ 
      this.character =res
      this.mappedTraits .filter(trait=>trait.key==traitName)[0].abilities 
        .filter(ability=>ability.key==abilityName)[0].value =newValue
      console.log(this.mappedTraits);
    })
  }
}
