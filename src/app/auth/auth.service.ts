import { effect, Injectable, signal } from '@angular/core';
import { User } from '../services/user';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  users :User[] =[]
  gettedId =Number(localStorage.getItem('userId'))
  accesserUser =signal<User |undefined>(undefined)
  accessContitiones =signal({ isLogged:false, isAdmin:false })

  constructor(private usersService:UsersService, private router:Router){
    usersService.getUsers()
    effect(()=>{ 
      this.users =usersService.users() 
      this.gettedId =Number(localStorage.getItem('userId'))
      // console.log(this.users);
    })
    setTimeout(()=>{
      // console.log('auto access');
      this.verifyLocalUser( this.gettedId )
    }, 1000);
  }

  verifyLocalUser(userId:number){
    const userToVerify =this.users .find(user=>user.id===userId)
    
    if (userToVerify!==undefined) {
      this.accesserUser.set(userToVerify)
      localStorage.setItem('userId',`${userId}`)
      this.accessContitiones().isLogged =true
      // if (userToVerify.role===SelectRole.ADMIN) this.isAdmin.set(true)
      console.log(this.accesserUser()?.username);
      
      return this.accesserUser
    }else return 'Error' 
  }
  resetLocalUser(){
    this.accesserUser.set(undefined)
    localStorage.removeItem('userId')
    this.accessContitiones.set({ isLogged:false, isAdmin:false })
    // console.log(this.accesserUser(),this.accessContitiones());
    this.router.navigate( ['/Home'] );
  }

  isAuthenticated(){return this.accessContitiones().isLogged}
  isRuoleAdmin(){return this.accessContitiones().isAdmin}
}
