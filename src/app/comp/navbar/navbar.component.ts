import { Component, Input } from '@angular/core';
import { routes } from '../../app.routes';
import { NgFor, NgIf } from '@angular/common';
import { closeDropdown } from './closeDropdown';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ NgIf, NgFor, RouterModule, MatIcon, ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  pages =routes .filter(page =>page.show && page.path!=document.title)
  @Input() placeholder :string =''
  constructor(){
    closeDropdown("dropdown")
    // console.log('routes',this.pages);
  }
}
