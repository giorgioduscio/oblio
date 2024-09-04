import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Character } from '../../../services/character';
import { NgFor, NgIf } from '@angular/common';
import { PrivilegesService } from '../../../services/privileges.service';
import { upperSpaces } from '../CharacterMapper';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [FormsModule, MatIcon, NgFor, NgIf],
  templateUrl: './privileges.component.html',
  styleUrl: './privileges.component.css'
})
export class PrivilegesComponent {
  userId! :string
  charId! :string
  character! :Character
  privileges! :Character['privilegi']['privilegi']
  experiencePoints! :Character['privilegi']['punti_esperienza']
  // TODO MOSTRA
  constructor(
    private activatedRoute:ActivatedRoute, 
    private usersService:UsersService,
    private privilegeService:PrivilegesService,
  ){
    activatedRoute.params.subscribe(params=>{
      usersService.getUsers().subscribe((res:any)=>{
        this.userId =params['userId']
        this.charId =params['charId']

        this.character =res[this.userId].gdrCharacters[this.charId]
        this.privileges =this.character.privilegi.privilegi
        this.experiencePoints =this.character.privilegi.punti_esperienza
        // console.log(this.privileges);
      })
    })
  }
  findDescription(privilegeTitle:string):string{
    privilegeTitle =upperSpaces(privilegeTitle)
    let result ='Errore'
    this.privilegeService.privileges.map(privilege=>{
      if (privilege.title===privilegeTitle) result =privilege.description
    })
    return result
  }
  // TODO AGGIUNGE
  addPrivilege(form:NgForm){
    const newPrivilege =form.value['newPrivilege']
    this.character.privilegi.privilegi.push(newPrivilege)
    this.usersService.patchCharacter(this.userId, this.charId,this.character)
      .subscribe((res:any)=>{ 
        console.log(res['privilegi']['privilegi']) 
        form.reset()
      })
  }
  // TODO ELIMINA
  deletePrivilege(indexToDelete:number){
    if(confirm('Eliminare elemento?')){
      const updatedPrivileges =this.privileges .filter((privilege,i)=>i!==indexToDelete)
        
      this.character.privilegi.privilegi =updatedPrivileges
      this.usersService.patchCharacter(this.userId, this.charId, this.character)
        .subscribe((res:any)=>{ 
          this.privileges =this.character.privilegi.privilegi
          console.log(res['privilegi']['privilegi']) 
        })
    }
  }
  // TODO MODIFICA
  updatePrivilege(indexToUpdate:number,e:Event){
    const updatedPrivilege =(e.target as HTMLInputElement).value
      
    this.character.privilegi.privilegi[indexToUpdate] =updatedPrivilege
    this.usersService.patchCharacter(this.userId, this.charId,this.character)
    .subscribe((res:any)=>{ 
      console.log(res['privilegi']['privilegi']);
      (e.target as HTMLInputElement).value =''
    })
  }
}
