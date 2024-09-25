import { Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { AccessComponent } from './pages/login/access/access.component';
import { HomeComponent } from './pages/home/home.component';
import { AdventuresEquipmentComponent } from './pages/adventures-equipment/adventures-equipment.component';

export const routes :Routes |any[] =[
  {show:false, path:'', pathMatch:'full', redirectTo:"/Home"},
  {show:true, path:'Home', component:HomeComponent},

  {show:false, path:'Login', component:LoginComponent},
  {show:false, path:'Access', component:AccessComponent},

  {show:true, path:'Users', component:UsersComponent},
  {show:false, path:'User/:userKey', component:UserComponent},
  {show:false, path:'Card/:userKey/:charKey', component:CardComponent},

  {show:true, path:'Equipment', component:AdventuresEquipmentComponent},
];
