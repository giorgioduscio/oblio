import { Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { AccessComponent } from './pages/login/access/access.component';
import { HomeComponent } from './pages/home/home.component';
import { ListsComponent } from './pages/lists/lists.component';

export const routes :Routes |any[] =[
  {show:false, path:'', pathMatch:'full', redirectTo:"/home"},
  {show:true, title:'Home', path:'home', component:HomeComponent},

  {show:false, title:'Login', path:'login', component:LoginComponent},
  {show:false, title:'Access', path:'access', component:AccessComponent},

  {show:true, title:'Users', path:'users', component:UsersComponent},
  {show:false, title:'User', path:'user/:userKey', component:UserComponent},
  {show:false, title:'Card', path:'card/:charKey', component:CardComponent},

  {show:true, title:'Equipment', path:'equipment/:charKey', component:ListsComponent},
  {show:true, title:'Privileges', path:'privileges/:charKey', component:ListsComponent},
  // {show:false, path:'equipment/', pathMatch:'full', redirectTo:'equipment/any'},
];
