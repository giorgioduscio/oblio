import { Component, effect } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../services/user';
import { RouterModule } from '@angular/router';
import { closeDropdown } from './closeDropdown';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ NgIf, NgFor, MatIcon, RouterModule ],
  template: `
  <details class="authDropdown">
    <summary class="authDropdown">
      <img *ngIf="localUser!=undefined" [src]="localUser.imageUrl" [alt]="localUser.username">
      <mat-icon *ngIf="localUser==undefined">person</mat-icon>
    </summary>
    
    <div>
    @if(localUser){
      <a routerLink="/user/{{localUser.key}}">Area personale</a>
      <a (click)="onResetLocalUser()">Esci</a>
    }@else {
      <a routerLink="/login">Login</a>
      <a routerLink="/access">Access</a>
    }
    </div>
  </details>
  `,
  styleUrls: ['../navbar.component.css','./dropdowns.component.css']
})
export class AuthComponent {
  localUser! :User |undefined
  constructor(private authService:AuthService,){
    closeDropdown("authDropdown")
    effect(()=>{
      if(authService.accesserUser()) this.localUser =authService.accesserUser()
    })
  }
  onResetLocalUser(){ 
    this.localUser =undefined
    this.authService.resetLocalUser() 
  }
}
