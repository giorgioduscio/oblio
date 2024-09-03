import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from './user';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url ='https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users'
  datas :WritableSignal<User[]> =signal([])
  constructor(private http:HttpClient) {
    effect(()=>{
      this.getUsers().subscribe((res:any)=>{ return this.datas.set(res); })
    })
  }

  getUsers(){return this.http.get(this.url +'.json')}
  addUser(body:User){return this.http.post(this.url +'.json',body)}
  deleteUser(id:string){return this.http.delete(`${this.url}/${id}.json`)}
  patchUser(id:string, body:User){return this.http.patch(`${this.url}/${id}.json`,body)}
  
  addCharacter(id:string, body:object){
    return this.http.post(`${this.url}/${id}/gdrCharacters.json`,body)
  }
  deleteCharacter(userId:string, characterKey:string){
    return this.http.delete(`${this.url}/${userId}/gdrCharacters/${characterKey}.json`)
  }
  patchCharacter(userId:string, characterKey:string, body:Character){
    return this.http.patch(`${this.url}/${userId}/gdrCharacters/${characterKey}.json`, body)
  }
}
