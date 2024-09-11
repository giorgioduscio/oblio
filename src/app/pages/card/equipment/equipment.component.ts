import { Component } from '@angular/core';
import { Character } from '../../../services/character';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { EquipmentService } from '../../../services/equipment.service';
import { initCharacter } from '../initCharacter';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [NgFor, MatIcon, FormsModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent {
  mk ={ userKey:'', charKey:'' }
  character :Character =initCharacter()
  tools :Character['equipaggiamento']['oggetti'] =[]
  coins :Character['equipaggiamento']['monete'] =0
  // TODO MOSTRA
  constructor(
    private activatedRoute:ActivatedRoute, 
    private usersService:UsersService, 
    private equipService:EquipmentService,
  ){
    activatedRoute.params.subscribe((params:any)=>{
      usersService.getUsers().subscribe((res:any)=>{
        this.mk =params
        this.character =res[this.mk.userKey].gdrCharacters[this.mk.charKey]
        this.coins =this.character.equipaggiamento.monete
        this.tools =this.character.equipaggiamento.oggetti
      })
    })
  }
  toolWeight(toolTitle:string,toolAmount:number){ return this.equipService.toolWeight(toolTitle,toolAmount) }
  transportableWeight(){
    const max =((this.character.bonus.caratteristica.forza.valore *2) +10) *7.5
    , current =this.tools.reduce((accumulator,tool) => accumulator +this.equipService.toolWeight(tool.titolo,tool.quantita),0)
    , overWeight =current>max
    return {max:max, current:current, overWeight:overWeight}
  }
  
  // TODO AGGIUNGE
  addToEquip(addForm:NgForm){
    const 
      quantita =Number(addForm.value['quantita'])>1 ?Number(addForm.value['quantita']) :1,
      titolo =addForm.value['titolo']
    this.character.equipaggiamento.oggetti.push({quantita:quantita, titolo:titolo})
    this.usersService.patchCharacter(this.mk.userKey, this.mk.charKey,this.character)
      .subscribe((res:any)=>{ 
        console.log(res['equipaggiamento']['oggetti']) 
        addForm.reset()
      })
  }
  // TODO ELIMINA
  deleteToEquip(indexToDelete:number){
    if (confirm('Eliminare elemento?')) {
      const updatedObject =this.tools .filter((_privilege,i)=>i!==indexToDelete)
        
      this.character.equipaggiamento.oggetti =updatedObject
      this.usersService.patchCharacter(this.mk.userKey, this.mk.charKey, this.character)
        .subscribe((res:any)=>{ 
          this.tools =this.character.equipaggiamento.oggetti
          console.log(res['equipaggiamento']['oggetti']) 
        })
    }
  }
  // TODO MODIFICA
  updateToEquip(indexToUpdate:number,e:Event){
    const {value, name} =e.target as HTMLInputElement
    const updatedTool :Character['equipaggiamento']['oggetti'][0] ={ 
      ...this.tools[indexToUpdate], 
      [name]: (name=="quantita" ?Number(value) :value)
    }
    this.tools[indexToUpdate] =updatedTool
    this.usersService.patchCharacter(this.mk.userKey, this.mk.charKey,this.character)
    .subscribe((res:any)=>{ 
      console.log(res['equipaggiamento']['oggetti'][indexToUpdate]); 
    })
  }
  updateCoins(e:Event){
    this.character.equipaggiamento.monete =Number((e.target as HTMLInputElement).value)
    this.usersService.patchCharacter(this.mk.userKey, this.mk.charKey,this.character)
    .subscribe((res:any)=>{ 
      console.log(res); 
    })    
  }
}