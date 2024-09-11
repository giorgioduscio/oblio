import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { mapper } from '../../tools/mapper';
import { User } from '../../services/user';
import { Character, ClasseArmatura, Morale } from '../../services/character';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { MatIcon } from '@angular/material/icon';
import { initCharacter } from '../card/initCharacter';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    NgIf,
    NavbarComponent,
    MatIcon,
],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','./userResponsive.component.css']
})
export class UserComponent {
  user :User ={id: 0,email: '',username: '',password: '',imageUrl: '' }
  characters :Character[] =[]
  userKey! :string

  constructor(private activateRoute:ActivatedRoute, private usersService:UsersService){
    document.title='User'

    activateRoute.params.subscribe(params=>{
      this.userKey =params['userKey']
    })

    usersService.getUsers().subscribe((res:any)=>{
      this.user =mapper(res) .filter(user=>user.key ===this.userKey)[0]
      this.characters =mapper(this.user.gdrCharacters!)
      // console.log('user',this.user,'\ncharacters', this.characters);
    })
  }
  addCharacter(){
    this.usersService.addCharacter(this.userKey, initCharacter())
    .subscribe((res:any)=>{
      console.log(res);
      location.reload()
    })
  }
  deleteCharacter(characterKey:string){
    if(confirm("Cancellare il personaggio?")){
      this.usersService.deleteCharacter(this.userKey, characterKey)
      .subscribe(res=>{
        location.reload()
        console.log(characterKey);
      })
    }
  }
}
