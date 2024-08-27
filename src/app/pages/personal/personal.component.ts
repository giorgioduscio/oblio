import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { mapper } from '../../tools/tools';
import { User } from '../../services/user';
import { Character } from '../../services/character';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { NavbarComponent } from "../../comp/navbar/navbar.component";

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    NavbarComponent
],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {
  user! :User
  characters! :Character[] |undefined

  constructor(private usersService:UsersService){
    document.title='Area personale'
    usersService.getUsers().subscribe((res:any)=>{
      this.user =mapper(res)[0]
      this.characters =this.user.gdrCharacters

      console.log('users',this.user,'characters', this.characters);
    })
  }
}
