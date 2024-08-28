import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { NgFor } from '@angular/common';
import { mapper } from '../../tools/tools';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NavbarComponent,
    NgFor,
    MatIconModule,
    RouterModule,
    FormsModule,
    
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users :User[] =[]
  constructor(private usersService:UsersService){
    document.title ='Users'

    usersService.getUsers().subscribe((res:any)=>{
      this.users =mapper(res)
      // console.log(this.users);
    })
  }
  delete(key:string){
    this.usersService.deleteUser(key)
    .subscribe(res=>{
      console.log(res+" eliminato");
      this.users =this.users .filter(user =>user.key!=key)
    })
  }
  onSubmit(form:NgForm){
    console.log(form);
  }
}
