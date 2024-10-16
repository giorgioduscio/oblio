import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Character } from './character';
import { mapper } from '../tools/mapper';

@Injectable({providedIn: 'root'})
export class CharactersService {
  private url='https://gdrcards-default-rtdb.europe-west1.firebasedatabase.app/characters'
  constructor(private http:HttpClient) { }
  characters =signal<Character[]>([])

  getCharacter(){
    this.http.get(`${this.url}.json`).subscribe((res:any)=>{
      this.characters.set( mapper(res) )
      // console.log('get',res);
    })
  }
  addCharacter(newCharacter:Character){
    this.http.post(`${this.url}.json`, newCharacter).subscribe((res:any)=>{
      this.getCharacter()
      console.log('post', this.characters()[this.characters().length-1]);
    })
  }
  deleteCharacter(characterKey:string){
    this.http.delete(`${this.url}/${characterKey}.json`).subscribe((res:any)=>{
      this.getCharacter()
      console.log('delete',this.characters());
    })
  }
  patchCharacter(characterKey:string, newCharacter:Character){
    this.http.patch(`${this.url}/${characterKey}.json`, newCharacter).subscribe((res:any)=>{
      this.getCharacter()
      console.log('patch', 
        this.characters().find(c=>c.key==newCharacter.key)?.generalita.nome,
      )
    })
  }

}
