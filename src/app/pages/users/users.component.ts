import { Component, effect } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { autoGenerateUser } from './autoGenerateUser';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ NavbarComponent, NgFor, NgIf, MatIconModule, RouterModule, FormsModule  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users :User[] =[]
  constructor(private usersService:UsersService){
    document.title ='Users'
    usersService.getUsers()

    effect(()=>{
      if(usersService.users()) this.users =usersService.users()
      // console.log(this.users);
    })
  }
  onDelete(userKey:string){
    if (confirm("Eliminare l'utente?")){
      this.usersService.deleteUser(userKey)
    }
  }
  onPatchUser(e:Event, i:number){
    const {name, value} =(e.target as HTMLInputElement)
    ,     $key =name as keyof User
    ,     clone :any =this.users[i]
    clone[$key] =value
    this.usersService.patchUser(clone.key!, clone)
  }

  generateForTest(){ autoGenerateUser(this.usersService) }
}
