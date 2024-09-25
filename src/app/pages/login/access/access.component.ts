import { Component, effect } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { User } from '../../../services/user';
import { RealtimeUsersService } from '../../../services/realtimeUsers.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ FormsModule, NgFor, RouterModule,  ],
  templateUrl: './access.component.html',
  styleUrls: ['../login.component.css', '../loginResponsive.component.css']
})
export class AccessComponent {
  error =false
  users :User[] =[]

  constructor(
    private rus:RealtimeUsersService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authService:AuthService,
  ){
    document.title ='Access'
    rus.getUsers()
    effect(()=>{
      if(rus.users().length){ 
        this.users =rus.users(); 
        // console.log('this.users',this.users);
      }
    })
  }
  // TODO RICERCA
  onSubmit(form:NgForm){
    const {email, password} =form.value
    , user :User =this.users.filter(user=>
        user.email===email && user.password===password
      )[0]
    if(user){
      this.authService.verifyLocalUser(user.id)
      this.router.navigate(
        ['/User/'+user.key], 
        { relativeTo: this.activatedRoute }
      );
    }
  }
}