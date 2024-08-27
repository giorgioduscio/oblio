import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { NgFor } from '@angular/common';
import { closeDropdown } from './closeDropdown';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgFor,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  pages =routes .filter(page =>page.show && page.path!=document.title)
  constructor(){
    closeDropdown("dropdown")
    // console.log('routes',this.pages);
  }
}
