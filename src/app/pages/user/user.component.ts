import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { mapper } from '../../tools/tools';
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
  userId! :string

  constructor(private activateRoute:ActivatedRoute, private usersService:UsersService){
    document.title='User'

    activateRoute.params.subscribe(params=>{
      this.userId =params['userId']
    })

    usersService.getUsers().subscribe((res:any)=>{
      this.user =mapper(res) .filter(user=>user.key ===this.userId)[0]
      this.characters =mapper(this.user.gdrCharacters!)
      // console.log('user',this.user,'\ncharacters', this.characters);
    })
  }
  addCharacter(){
    this.usersService.addCharacter(this.userId, initCharacter())
    .subscribe((res:any)=>{
      console.log(res);
      location.reload()
    })
  }
  deleteCharacter(characterKey:string){
    if(confirm("Cancellare il personaggio?")){
      this.usersService.deleteCharacter(this.userId, characterKey)
      .subscribe(res=>{
        location.reload()
        console.log(characterKey);
      })
    }
  }
}
