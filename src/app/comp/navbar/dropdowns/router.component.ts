import { Component, effect } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../services/user';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { closeDropdown } from './closeDropdown';

@Component({
  selector: 'app-router',
  standalone: true,
  imports: [ NgIf, NgFor, MatIcon, RouterModule ],
  template: `
    <details class="routerDropdown">
      <summary class="routerDropdown"><mat-icon>apps</mat-icon></summary>

      <div>
        <a *ngFor="let page of pages; let i=index"
          routerLink="/{{page.path}}"
        > {{page.title}}
        </a>
      </div>
    </details>
  `,
  styleUrls: ['../navbar.component.css','./dropdowns.component.css']
})
export class RouterComponent {
  pages =routes .filter(page =>
    page.show 
    && page.title!=document.title 
  )
  constructor(){
    closeDropdown("routerDropdown")
  }
}
