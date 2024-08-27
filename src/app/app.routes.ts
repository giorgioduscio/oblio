import { Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonalComponent } from './pages/personal/personal.component';

export const routes :Routes |any[] =[
  {show:false, path:'', pathMatch:'full', redirectTo:"/Card"},
  {show:true, path:'Card', component:CardComponent},
  {show:true, path:'Dashboard', component:DashboardComponent},
  {show:true, path:'Personal', component:PersonalComponent},
];
