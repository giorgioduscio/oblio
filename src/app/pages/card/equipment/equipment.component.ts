import { Component } from '@angular/core';
import { Character } from '../../../services/character';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { every } from 'rxjs';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [NgFor, MatIcon, FormsModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent {
  userId! :string
  charId! :string
  character! :Character
  tools :Character['equipaggiamento']['oggetti'] =[]
  coins :Character['equipaggiamento']['monete'] =0
  transport ={max:0, current:0} 
  // TODO MOSTRA
  constructor(private activatedRoute:ActivatedRoute, private usersService:UsersService){
    activatedRoute.params.subscribe(params=>{
      usersService.getUsers().subscribe((res:any)=>{
        this.userId =params['userId']
        this.charId =params['charId']

        this.character =res[this.userId].gdrCharacters[this.charId]
        this.coins =this.character.equipaggiamento.monete
        this.tools =this.character.equipaggiamento.oggetti
        this.transport ={
          max: ((this.character.bonus.caratteristica.forza.valore *2) +10) *7.5,
          current: 40
        }
        // console.log(this.transport);
      })
    })
  }
  // TODO AGGIUNGE
  addToEquip(addForm:NgForm){
    const 
      quantita =Number(addForm.value['quantita'])>1 ?Number(addForm.value['quantita']) :1,
      titolo =addForm.value['titolo']
    this.character.equipaggiamento.oggetti.push({quantita:quantita, titolo:titolo})
    this.usersService.patchCharacter(this.userId, this.charId,this.character)
      .subscribe((res:any)=>{ 
        console.log(res['equipaggiamento']['oggetti']) 
        addForm.reset()
      })
  }
  // TODO ELIMINA
  deleteToEquip(indexToDelete:number){
    const updatedObject =this.tools .filter((_privilege,i)=>i!==indexToDelete)
      
    this.character.equipaggiamento.oggetti =updatedObject
    this.usersService.patchCharacter(this.userId, this.charId, this.character)
      .subscribe((res:any)=>{ 
        this.tools =this.character.equipaggiamento.oggetti
        console.log(res['equipaggiamento']['oggetti']) 
      })
  }
  // TODO MODIFICA
  updateToEquip(indexToUpdate:number,e:Event){
    const {value, name} =e.target as HTMLInputElement
    const updatedTool :Character['equipaggiamento']['oggetti'][0] ={ 
      ...this.tools[indexToUpdate], 
      [name]:name=="quantita" ?Number(value) :value
    }
    this.tools[indexToUpdate] =updatedTool
    this.usersService.patchCharacter(this.userId, this.charId,this.character)
    .subscribe((res:any)=>{ 
      console.log(res['equipaggiamento']['oggetti'][indexToUpdate]); 
    })
  }
  updateCoins(e:Event){
    this.character.equipaggiamento.monete =Number((e.target as HTMLInputElement).value)
    this.usersService.patchCharacter(this.userId, this.charId,this.character)
    .subscribe((res:any)=>{ 
      console.log(res); 
    })    
  }
}