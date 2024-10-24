import { Component, effect } from '@angular/core';
import { EquipmentService, Tool } from '../../services/equipment.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { upperSpaces } from '../../tools/upperSpaces';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../services/character';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';
import { Privilege } from '../../services/privilege';
import { PrivilegesService } from '../../services/privileges.service';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, FormsModule, MatIcon, NavbarComponent],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css','./listsResponsive.component.css',]
})
export class ListsComponent {
  charKey=''
  tools :Tool[] =[]
  privileges :Privilege[] =[]
  character!:Character
  templateFilter=''
  constructor(private ar:ActivatedRoute, private equipS:EquipmentService, 
              private charService:CharactersService, public cart:CartService,
              private router:Router, private privS:PrivilegesService,
    ){
    ar.url.subscribe(seg=>{ 
      const {path} =seg[0]
      this.cart.isEquip =path.includes('equip') ?true :false
      document.title =upperSpaces(path)
    })
    ar.params.subscribe((p:any)=>this.charKey= p.charKey==':charKey' ?'' :p.charKey )
    // OGGETTI
    if(this.cart.isEquip) this.tools =equipS.tools .map(tool=>({...tool,title:upperSpaces(tool.title)}))
    // PRIVILEGI
    else this.privileges =privS.privileges .map(tool=>({...tool,title:upperSpaces(tool.title)}))
    
    charService.getCharacter()
    effect(()=>{
      if(charService.characters()) this.character =charService.characters().find(c=>c.key===this.charKey)!
    })
    console.log("equipcomp", cart.equipCart, cart.privilegesCart );
  }

  //  TODO MODIFICA
  onPatchCart(e:Event, index:number){
    const newValue =Number((e.target as HTMLInputElement).value)
    this.cart.patchCart(newValue, index)
  }
  addToCharacter(){
    // EQUIPAGGIAMENTO
    if(this.cart.isEquip){
      let tools =this.character.equipaggiamento.oggetti
      // PER OGNI ELEMENTO DEL CARRELLO
      this.cart.equipCart.map(el=>{
        let newtool ={ titolo:el.title, quantita:el.amount! }
        ,   index =tools.findIndex(tool=>tool.titolo===newtool.titolo)
        // SE L'OGGETTO E' NUOVO
        if(index===-1) this.character.equipaggiamento.oggetti.push(newtool)
        // L'OGGETTO ESISTE GIA'
        else tools[index].quantita +=newtool.quantita; this.character.equipaggiamento.oggetti =tools
      })
    // PRIVILEGI
    }else{
      let privs =this.character.privilegi.privilegi
      this.cart.privilegesCart.map(el=>{
        let newPrivilege =el.title
        ,   index =privs.findIndex(privilege=>privilege===newPrivilege)
        // SE L'OGGETTO E' NUOVO
        if(index===-1) this.character.privilegi.privilegi.push(newPrivilege)
        // else privs[index] +=newPrivilege; this.character.equipaggiamento.oggetti =privs
      })
    }
    this.charService.patchCharacter(this.charKey,this.character)
    this.cart.reset()
    this.router.navigate(['/card/'+this.charKey])
  }

}
