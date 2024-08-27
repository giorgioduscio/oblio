import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user';
import { NavbarComponent } from "../../comp/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  users :User[] =[]
  constructor(private usersService:UsersService){
    usersService.getUsers().subscribe((res:any)=>{
      this.users =Object.keys(res) .map(key=>{
        res[key]['firebaseId'] =key
        return res[key]
      })
      console.log(this.users);
    })
  }
}
