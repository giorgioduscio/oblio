import { Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';

export const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:"/Card"},
  {path:'Card', component:CardComponent},
];
