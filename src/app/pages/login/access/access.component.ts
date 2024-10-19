import { Component, effect } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { User } from '../../../services/user';
import { AuthService } from '../../../auth/auth.service';
import { UsersService } from '../../../services/users.service';

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
    private usersService:UsersService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authService:AuthService,
  ){
    document.title ='Access'
    usersService.getUsers()
    effect(()=>{
      if(usersService.users().length){ 
        this.users =usersService.users(); 
        // console.log('this.users',this.users);
      }
    })
  }
  // TODO RICERCA
  onSubmit(form:NgForm){
    const {email, password} =form.value
    ,     user =this.users.find(user=>
            user.email===email && user.password===password
          )
    if(user){
      this.authService.verifyLocalUser(user.id)
      this.router.navigate(
        ['/user/'+user.key], 
        { relativeTo: this.activatedRoute }
      );
    }
  }
}