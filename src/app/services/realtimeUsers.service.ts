import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from './user';
import { Character } from './character';
import { mapper } from '../tools/mapper';
import { CharacterMapper } from '../pages/card/CharacterMapper';

@Injectable({
  providedIn: 'root'
})
export class RealtimeUsersService {
  private url ='https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users'
  constructor(private http:HttpClient) {
    effect(()=>{
      // console.log("service",this.characters());
      this.characters()
    })
  }
  // TODO USERS
  users :WritableSignal<User[]> =signal([])
  getUsers(){
    this.http.get(this.url +'.json').subscribe(((res:any)=>{
      this.users.set( mapper(res) )
    }))
  }
  addUser(body:User){
    this.http.post( this.url+".json", body ).subscribe((res:any)=>{
      this.users().push( {...body, key: res.name} ) 
    })  
    console.log("addUser",this.users());
  }
  deleteUser(key:string){
    this.http.delete(`${this.url}/${key}.json`).subscribe((res:any)=>{
      this.users.set(this.users() .filter(user=>user.key!=key))
    })
    console.log("deleteUser",this.users());
  }
  patchUser(key:string, body:User){
    delete body.key
    this.http.put(`${this.url}/${key}.json`, body).subscribe((res:any)=>{
      let index =this.users() .indexOf(body)
      this.users()[index]=res
      console.log("patchUser",this.users()[index]);
    })
  }

  // TODO CHARACTER
  characters =signal<Character[]>([])
  character =signal<CharacterMapper[]>([])

  getCharacters(userKey:string,characterKey=''){
    this.characters.set( [] )
    this.http.get(`${this.url}/${userKey}/gdrCharacters.json`)
    .subscribe((res:any)=>{ //fix
      if(res!==null){
        console.log('getCharacters',userKey,characterKey,res);
      
      delete res.key      
      this.characters.set( mapper(res) )

      if (characterKey!==''){ 
        this.character.set( [] )
        this.http.get(`${this.url}/${userKey}/gdrCharacters/${characterKey}.json`).subscribe((res:any)=>{
          this.character.set( CharacterMapper(res) )
          // console.log( `${userKey}/${characterKey}`, this.characters(), this.character())
        })
      }}
    })
  }
  addCharacter(userKey:string, body:Character){
    this.http.post(`${this.url}/${userKey}/gdrCharacters.json`,body).subscribe((res:any)=>{
      this.characters().push( {...body, key:res.name} )
      
      console.log("addCharacter", body.generalita.nome, res.name, 
        this.users().filter(u=>u.key===userKey)[0]
          .gdrCharacters?.filter(c=>c.key===body.key)[0]
     );
    })  
  }

  deleteCharacter(userKey:string, characterKey:string){
    this.http.delete(`${this.url}/${userKey}/gdrCharacters/${characterKey}.json`).subscribe((res:any)=>{
      this.characters.set(this.characters() .filter(character=>character.key!=characterKey))
    })
    console.log("deleteCharacter",this.characters());
  }
  
  patchCharacter(userKey:string, characterKey:string, body:Character){
    delete body.key
    this.http.patch(`${this.url}/${userKey}/gdrCharacters/${characterKey}.json`, body).subscribe((res:any)=>{
      let index =404
      this.characters() .map((character,i)=>{character.key===characterKey ?index=i :404})
      this.characters()[index]=res
      console.log("patchCharacter",body);
    })
  }

}
