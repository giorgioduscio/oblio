import { Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { AccessComponent } from './pages/login/access/access.component';

export const routes :Routes |any[] =[
  {show:false, path:'', pathMatch:'full', redirectTo:"/Login"},
  {show:true, path:'Login', component:LoginComponent},
  {show:true, path:'Access', component:AccessComponent},

  {show:true, path:'Users', component:UsersComponent},
  {show:false, path:'User/:userId', component:UserComponent},
  {show:false, path:'Card/:userId/:charId', component:CardComponent},
];
