import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Character } from '../../../services/character';
import { NgFor, NgIf } from '@angular/common';
import { PrivilegesService } from '../../../services/privileges.service';
import { upperSpaces } from '../../../tools/upperSpaces';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [FormsModule, MatIcon, NgFor, NgIf],
  templateUrl: './privileges.component.html',
  styleUrl: './privileges.component.css'
})
export class PrivilegesComponent {
  userKey! :string
  charKey! :string
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
        this.userKey =params['userKey']
        this.charKey =params['charKey']

        this.character =res[this.userKey].gdrCharacters[this.charKey]
        this.privileges =this.character.privilegi.privilegi
        this.experiencePoints =this.character.privilegi.punti_esperienza
        // console.log(this.privileges);
      })
    })
  }
  privilegeDescription(privilegeTitle:string){ 
    return this.privilegeService.privilegeProprieties(privilegeTitle,true) 
  }
  privilegeCost(privilegeTitle:string){ 
    return this.privilegeService.privilegeProprieties(privilegeTitle,false) 
  }
  // TODO AGGIUNGE
  addPrivilege(form:NgForm){
    const newPrivilege =form.value['newPrivilege']
    this.character.privilegi.privilegi.push(newPrivilege)
    this.usersService.patchCharacter(this.userKey, this.charKey,this.character)
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
      this.usersService.patchCharacter(this.userKey, this.charKey, this.character)
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
    this.usersService.patchCharacter(this.userKey, this.charKey,this.character)
    .subscribe((res:any)=>{ 
      console.log(res['privilegi']['privilegi']);
      (e.target as HTMLInputElement).value =''
    })
  }
}
