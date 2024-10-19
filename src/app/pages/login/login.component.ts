import { Component, effect } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgFor } from '@angular/common';
import { randomId, randomImage } from '../../tools/randomCompiler';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MappedForm, mapperForm } from './mapperForm';

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
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ){
    document.title ='Login'
    this.mappedForm =mapperForm(this.form) 
    usersService.getUsers()
    effect(()=>{
      if(usersService.users()) console.log(usersService.users());
      
    })
  }
  // TODO AGGIUNGE
  onSubmit(){
    this.usersService.addUser({
      id: randomId(),
      email: this.form.value.email,
      username: this.form.value.username,
      password: this.form.value.password,
      imageUrl: randomImage(),
    })
    this.router.navigate(
      ['/access'], 
      { relativeTo: this.activatedRoute }
    );
  }
}
