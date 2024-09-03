import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgFor } from '@angular/common';
import { randomId, randomImage } from '../../tools/randomCompiler';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MappedForm, mapperForm } from './mapperForm';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  form! :FormGroup
  mappedForm! :MappedForm[]

  constructor(private usersService:UsersService, 
    private activatedRoute: ActivatedRoute, private router: Router
  ){
    document.title ='Login'

    this.form =new FormGroup({
      username :new FormControl('', Validators.required),
      email :new FormControl('', [Validators.required, Validators.email]),
      password :new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password :new FormControl('', [Validators.required]),
    })

    this.mappedForm =mapperForm(this.form) 
  }
  // TODO AGGIUNGE
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
        this.form.reset()
    })
    } else console.log('nosubmit');
  }
}
