import { Component, effect } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user';
import { Character } from '../../services/character';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';
import { mapper } from '../../tools/mapper';
import { CharactersService } from '../../services/characters.service';
import { initCharacter } from '../card/initCharacter';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [ RouterModule, NgFor, NgIf, NavbarComponent, MatIcon, ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','./userResponsive.component.css']
})
export class UserComponent {
  user :User ={id: 0,email: '',username: '',password: '',imageUrl: '' }
  characters :Character[] =[]
  userKey =''
  isAuthenticated =false
  constructor(
    private activateRoute:ActivatedRoute, 
    private usersService:UsersService,
    private authService:AuthService,
    private charactersService:CharactersService,
  ){
    document.title ='Area personale'
    activateRoute.params.subscribe(params=>{ this.userKey =params['userKey'] })
    usersService.getUsers()
    charactersService.getCharacter()
    
    effect(()=>{
      if(usersService.users().length){
        this.isAuthenticated =authService.accesserUser() ?true :false
        this.user =usersService.users().find(user=>user.key===this.userKey)!
        document.title =this.user.username

        if (charactersService.characters().length){
          this.characters =charactersService.characters().filter(c=>c.userId===this.user.id)
          // console.log('users',this.characters);
        }
      } 
    })
  }
  // TODO AGGIUNGE PERSONAGGI
  onAddCharacter(){ 
    const newCharacter =initCharacter(this.user.id)
    this.charactersService.addCharacter(newCharacter) 
  }

  // TODO ELIMINA PERSONAGGI
  deleteList :string[] =[]
  setDeleteList(characterKey:string,e:Event){
    const i =this.deleteList.indexOf(characterKey)
    ,     el =(e.target as HTMLInputElement).parentElement
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
        this.charactersService.deleteCharacter(characterKey)
      })
      this.deleteList =[]
    }
  }

  // TODO MODIFICA LO USER
  onPatchUser(e:Event){
    const {name,value} =e.target as HTMLInputElement
    this.user ={...this.user,[name]:value}
    this.usersService.patchUser(this.userKey,this.user)
  }



}
