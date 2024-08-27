import { Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { UsersComponent } from './pages/users/users.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { LoginComponent } from './pages/login/login.component';

export const routes :Routes |any[] =[
  {show:false, path:'', pathMatch:'full', redirectTo:"/Card"},
  {show:true, path:'Card', component:CardComponent},
  {show:true, path:'Users', component:UsersComponent},
  {show:false, path:'User/:id', component:PersonalComponent},
  {show:true, path:'Login', component:LoginComponent},
];
