import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgFor } from '@angular/common';
import { Initial } from '../card/CharacterMapper';
import { randomId, randomImage } from '../../tools/randomCompiler';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  form! :FormGroup
  showForm! :{key:string, title:string, inputType:string, value:string}[]
  passwordConfirmer :string =''

  constructor(private usersService:UsersService, 
    private activatedRoute: ActivatedRoute, private router: Router
  ){
    document.title ='Login'
    usersService.getUsers().subscribe(res =>console.log(res))

    this.form =new FormGroup({
      username :new FormControl('', Validators.required),
      email :new FormControl('', [Validators.required, Validators.email]),
      password :new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password :new FormControl('', [Validators.required]),
    })

    this.showForm =Object.keys(this.form.value) .map((key,i)=>({
      key:key,
      title:Initial(key),
      inputType: i<2 ?'text' :'password',
      value: this.form.value[key],
    }))   
  }


  onSubmit(){
    if (this.form.value.confirm_password==this.form.value.password){
      console.log('submit',this.form);
      
      this.usersService.addUser({
        id: randomId(),
        email: this.form.value.email,
        username: this.form.value.username,
        password: this.form.value.password,
        imageUrl: randomImage(),
      })
      .subscribe((res:any)=>{
        console.log(res); 
        this.router.navigate(
          ['/User/'+res.name], 
          { relativeTo: this.activatedRoute }
        );
    })
    } else console.log('nosubmit');
  }
}
