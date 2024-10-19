import { Component, effect } from '@angular/core';
import { EquipmentService, Tool } from '../../services/equipment.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { upperSpaces } from '../../tools/upperSpaces';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../services/character';
import { EquipCartService } from './equip-cart.service';

@Component({
  selector: 'app-adventures-equipment',
  standalone: true,
  imports: [NgIf,NgFor,RouterModule,MatIcon, NavbarComponent],
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.css','./equipResponsive.component.css',]
})
export class EquipComponent {
  charKey=''
  tools :Tool[] =[]
  character!:Character
  constructor(private ar:ActivatedRoute, private equipS:EquipmentService, 
              private charService:CharactersService, public cart:EquipCartService,
              private router:Router
            ){
    document.title =`Equipaggiamento`
    ar.params.subscribe((p:any)=>this.charKey= p.charKey==':charKey' ?'' :p.charKey )
    this.tools =equipS.tools .map(tool=>({...tool,title:upperSpaces(tool.title)}))
    charService.getCharacter()
    effect(()=>{
      if(charService.characters()) this.character =charService.characters().find(c=>c.key===this.charKey)!
    })
  }
  onPatchCart(e:Event, index:number){
    const newValue =Number((e.target as HTMLInputElement).value)
    this.cart.patchCart(newValue, index)
  }
  addToEquip(){
    let tools =this.character.equipaggiamento.oggetti
    // PER OGNI ELEMENTO DEL CARRELLO
    this.cart.getCart().map(el=>{
      let newtool ={ titolo:el.title, quantita:el.amount! }
      ,   index =tools.findIndex(tool=>tool.titolo===newtool.titolo)
      // SE L'OGGETTO E' NUOVO
      if(index===-1){
        this.character.equipaggiamento.oggetti.push(newtool)

      // L'OGGETTO ESISTE GIA'
      }else{        
        tools[index].quantita +=newtool.quantita
        this.character.equipaggiamento.oggetti =tools
      }
    })
    this.charService.patchCharacter(this.charKey,this.character)
    this.cart.reset()
    this.router.navigate(['/card/'+this.charKey])
  }

}
