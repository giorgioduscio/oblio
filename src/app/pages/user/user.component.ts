import { Component, effect } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { mapper } from '../../tools/mapper';
import { User } from '../../services/user';
import { Character } from '../../services/character';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { MatIcon } from '@angular/material/icon';
import { initCharacter } from '../card/initCharacter';
import { RealtimeUsersService } from '../../services/realtimeUsers.service';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [ RouterModule, NgFor, NgIf, NavbarComponent, MatIcon, ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','./userResponsive.component.css']
})
export class UserComponent {
  // TODO MOSTRA PERSONAGGI
  localUser :User ={id: 0,email: '',username: '',password: '',imageUrl: '' }
  userKey =''
  constructor(private activateRoute:ActivatedRoute, private rus:RealtimeUsersService){
    document.title='User'
    activateRoute.params.subscribe(params=>{ this.userKey =params['userKey'] })
    rus.getUsers()
    effect(()=>{
      if (rus.users().length) {
        this.localUser =rus.users().filter(user=>user.key===this.userKey)[0]
        // console.log(this.localUser,this.localUser.gdrCharacters);
      }
    })
  }
  // TODO AGGIUNGE PERSONAGGI
  onAddCharacter(){ this.rus.addCharacter(this.userKey,initCharacter()) }

  // TODO ELIMINA PERSONAGGI
  deleteList :string[] =[]
  setDeleteList(characterKey:string,e:Event){
    const i =this.deleteList.indexOf(characterKey)
    , el =(e.target as HTMLInputElement).parentElement
    if(i===-1){
      this.deleteList.push(characterKey)
      el!.classList.add('deleteList')
    }else{
      this.deleteList.splice( i,1 )
      el!.classList.remove('deleteList')
    }
  }
  onDeleteCharacters(){
    if(confirm("Cancellare i personaggi?")){
      this.deleteList.map(characterKey=>{
        this.rus.deleteCharacter(this.userKey,characterKey)
      })
      this.deleteList =[]
    }
  }

  // TODO MODIFICA LO USER
  onPatchUser(e:Event){
    const {name,value} =e.target as HTMLInputElement
    this.localUser ={...this.localUser,[name]:value}
    this.rus.patchUser(this.userKey,this.localUser)
  }



}
