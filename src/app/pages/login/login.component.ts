import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgFor } from '@angular/common';
import { randomId, randomImage } from '../../tools/randomCompiler';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MappedForm, mapperForm } from './mapperForm';
import { RealtimeUsersService } from '../../services/realtimeUsers.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, NgFor, RouterModule, ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './loginResponsive.component.css']
})
export class LoginComponent{
  form :FormGroup =new FormGroup({
    username :new FormControl('', Validators.required),
    email :new FormControl('', [Validators.required, Validators.email]),
    password :new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password :new FormControl('', [Validators.required]),
  })
  mappedForm! :MappedForm[]

  constructor(
    private usersService:UsersService, 
    private rus :RealtimeUsersService,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ){
    document.title ='Login'
    this.mappedForm =mapperForm(this.form) 
  }
  // TODO AGGIUNGE
  onSubmit(){
    this.rus.addUser({
      id: randomId(),
      email: this.form.value.email,
      username: this.form.value.username,
      password: this.form.value.password,
      imageUrl: randomImage(),
    })
    this.router.navigate(
      ['/Access'], 
      { relativeTo: this.activatedRoute }
    );
  }
}
