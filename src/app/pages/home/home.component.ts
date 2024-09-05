import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent, MatIcon],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './homeResponsive.component.css']
})
export class HomeComponent {
  constructor(){
    document.title ='Home'
  }

}
