import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthComponent } from "./dropdowns/auth.component";
import { RouterComponent } from "./dropdowns/router.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, MatIcon, AuthComponent, RouterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() placeholder :string =document.title
  constructor(){}
}
