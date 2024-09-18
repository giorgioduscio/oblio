import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from './user';
import { Character } from './character';
import { mapper } from '../tools/mapper';
import { CharacterMapper } from '../pages/card/CharacterMapper';

@Injectable({ providedIn: 'root' })
export class RealtimeUsersService {
  private url ='https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users'
  constructor(private http:HttpClient) {}
  // TODO USERS
  users =signal<User[]>([])
  getUsers(){
    this.http.get(this.url +'.json').subscribe(((res:any)=>{
      this.users.set( mapper(res) )
      // MAPPA I PERSONAGGI DELL'UTENTE
      this.users().map(user=>{
        if(user.gdrCharacters) user.gdrCharacters =mapper( user.gdrCharacters )
      })
      // console.log('getUsers',this.users());
    }))
  }
  addUser(user:User){
    this.http.post( this.url+".json", user ).subscribe((res:any)=>{
      this.users().push( {...user, key: res.name} ) 
    })  
    console.log("addUser",this.users() .filter(u=>u.id===user.id));
  }
  deleteUser(userKey:string){
    this.http.delete(`${this.url}/${userKey}.json`).subscribe((res:any)=>{
      this.users.set(this.users() .filter(user=>user.key!=userKey))
    })
    console.log("deleteUser",this.users());
  }
  patchUser(userKey:string, user:User){
    delete user.key
    this.http.put(`${this.url}/${userKey}.json`, user).subscribe((res:any)=>{
      let index =this.users() .indexOf(user)
      this.users()[index]=res
      console.log("patchUser",this.users()[index]);
    })
  }

  // TODO CHARACTER
  characters =signal<Character[]>([])
  character =signal<CharacterMapper[]>([])

  getCharacters(userKey:string,characterKey=''){
    this.characters.set( [] )
    this.http.get(`${this.url}/${userKey}/gdrCharacters.json`) .subscribe((res:any)=>{ //fix
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
  addCharacter(userKey:string, character:Character){
    this.http.post(`${this.url}/${userKey}/gdrCharacters.json`,character).subscribe((res:any)=>{
      let updateCharacters =this.users().filter(user=>user.key===userKey)[0].gdrCharacters 
        if(updateCharacters===undefined) updateCharacters =[]
        updateCharacters?.push( {...character, key:res.name} )
      this.users().filter(user=>user.key===userKey)[0].gdrCharacters =updateCharacters

      this.characters().push( {...character, key:res.name} )
      
      console.log("addCharacter", character.generalita.nome, res.name, 
        this.users().filter(u=>u.key===userKey)[0].gdrCharacters
     );
    })  
  }

  deleteCharacter(userKey:string, characterKey:string){
    this.http.delete(`${this.url}/${userKey}/gdrCharacters/${characterKey}.json`).subscribe((res:any)=>{
      this.users().map(user=>{
        if(user.key===userKey) user.gdrCharacters =user.gdrCharacters?.filter(c=>c.key!==characterKey)
      })

      this.characters.set(this.characters() .filter(character=>character.key!=characterKey))
      console.log("deleteCharacter",this.users().filter(user=>user.key===userKey)[0].gdrCharacters);
    })
  }
  
  patchCharacter(userKey:string, characterKey:string, character:Character){
    delete character.key
    this.http.patch(`${this.url}/${userKey}/gdrCharacters/${characterKey}.json`, character).subscribe((res:any)=>{
      let index =404
      this.characters() .map((character,i)=>{character.key===characterKey ?index=i :404})
      this.characters()[index]=res
      console.log("patchCharacter",character);
    })
  }

}
