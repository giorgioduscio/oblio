import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from './user';
import { mapper } from '../tools/mapper';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private url ='https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users'
  constructor(private http:HttpClient) {}
  // TODO USERS
  users =signal<User[]>([])
  getUsers(){
    this.http.get(this.url +'.json').subscribe((res:any)=>{
      this.users.set( mapper(res) )
      // console.log('get',this.users());
    })
  }
  addUser(user:User){
    this.http.post( this.url+".json", user ).subscribe((res:any)=>{
      this.users().push( {...user, key: res.name} ) 
      console.log("post",this.users()[this.users().length-1]);
    })  
  }
  deleteUser(userKey:string){
    this.http.delete(`${this.url}/${userKey}.json`).subscribe((res:any)=>{
      this.users.set(this.users() .filter(user=>user.key!=userKey))
      console.log("delete",this.users());
    })
  }
  patchUser(userKey:string, user:User){
    delete user.key
    this.http.patch(`${this.url}/${userKey}.json`, user).subscribe((res:any)=>{
      let index =this.users() .indexOf(user)
      this.users()[index]=res
      console.log("patch",this.users()[index]);
    })
  }
}