import { effect, Injectable, signal } from '@angular/core';
import { User } from '../services/user';
import { RealtimeUsersService } from '../services/realtimeUsers.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  users :User[] =[]
  gettedId =Number(localStorage.getItem('userId'))
  accesserUser =signal<User |undefined>(undefined)
  accessContitiones =signal({ isLogged:false, isAdmin:false })

  constructor(private rus:RealtimeUsersService, private router:Router){
    rus.getUsers()
    effect(()=>{ 
      this.users =rus.users() 
      this.gettedId =Number(localStorage.getItem('userId'))
      // console.log(this.users);
    })
    setTimeout(()=>{
      // console.log('auto access');
      this.verifyLocalUser( this.gettedId )
    }, 1000);
  }

  verifyLocalUser(userId:number){
    const userToVerify =this.users .filter(user=>user.id===userId)[0]
    
    if (userToVerify!==undefined) {
      this.accesserUser.set(userToVerify)
      localStorage.setItem('userId',`${userId}`)
      this.accessContitiones().isLogged =true
      // if (userToVerify.role===SelectRole.ADMIN) this.isAdmin.set(true)
      return this.accesserUser
    }else{ return 'Error' }
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
