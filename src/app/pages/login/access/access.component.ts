import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { NgFor } from '@angular/common';
import { User } from '../../../services/user';
import { mapper } from '../../../tools/tools';
import { MappedForm, mapperForm } from '../mapperForm';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    RouterModule,
  ],
  templateUrl: './access.component.html',
  styleUrl: '../login.component.css'
})
export class AccessComponent {
  form! :FormGroup
  mappedForm! :MappedForm[]
  error =false

  constructor(private usersService:UsersService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ){
    document.title ='Access'
    this.form =new FormGroup({
      email :new FormControl('', [Validators.required, Validators.email]),
      password :new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
    this.mappedForm =mapperForm(this.form)  
  }
  // TODO RICERCA
  onSubmit(){
    this.usersService.getUsers().subscribe((res:any) =>{
      const user :User =mapper(res) .filter(user=>
        user.email===this.form.value.email &&
        user.password===this.form.value.password
      )[0]
      this.router.navigate(
        ['/User/'+user.key], 
        { relativeTo: this.activatedRoute }
      );
    })
  }
}