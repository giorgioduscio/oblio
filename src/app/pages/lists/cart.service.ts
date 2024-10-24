import { Injectable } from '@angular/core';
import { Tool } from '../../services/equipment.service';
import { Privilege } from '../../services/privilege';

@Injectable({  providedIn: 'root' })
export class CartService {
  isEquip =false
  equipCart :Tool[] =[
    // { title: 'oggetto1', weight: 10, price: 3, amount:1 },
    // { title: 'oggetto2', weight: 2, price: 2, amount:10 },
    // { title: 'oggetto Nome Lungo', weight: 1, price: 5, amount:3 },
  ]
  privilegesCart :Privilege[] =[
    // { title: 'priv1', cost: 1, level: 3, description: '', maxLevel: 3 },
    // { title: 'priv1', cost: 2, level: 1, description: '', maxLevel: 2 },
    // { title: 'privilegio con nome lungo', cost: 1, description: '', maxLevel: 0 },
  ]
  getTotal(){
    let weight=0, price=0
    // OGGETTI
    if(this.isEquip){
      this.equipCart.map(el=>{
        weight +=el.weight *el.amount!
        price +=el.price *el.amount!
      })

    // PRIVILEGI
    }else{
      this.privilegesCart.map(el=>{
        price +=el.level ?(el.cost *el.level) :el.cost
      });
    } return{ weight, price }
  }

  // TODO MODIFICA
  addToCart(newTool?:Tool, newPrivilege?:Privilege){
    // OGGETTI
    if(newTool){
      let index =this.equipCart.indexOf(newTool)
      // se l'oggetto è nuovo
      if (index ===-1) {
        newTool.amount=1
        this.equipCart.push(newTool) 
        
      // se l'oggetto è gia stato selezionato
      } else this.equipCart[index].amount! +=newTool.amount!
    }
    // PRIVILEGI 
    if(newPrivilege){
      let index =this.privilegesCart.indexOf(newPrivilege)
      // se il privilegio è nuovo e non prevede livelli, aggiungi al carrello
      if (index===-1 &&newPrivilege.maxLevel==0) 
        this.privilegesCart.push(newPrivilege)
        
      // se il privilegio è nuovo e prevede livelli, inizia da 1 e aggiungi al carrello
      else if (index===-1 &&newPrivilege.maxLevel){ 
        newPrivilege.level=1; this.privilegesCart.push(newPrivilege) }

      // se il privilegio è già stato scelto e prevede livelli<del massimo, aumenta un livello
      else if(newPrivilege.level &&newPrivilege.level<newPrivilege.maxLevel) 
        this.privilegesCart[index].level! +=newPrivilege.level

      // se il privilegio è già stato scelto e non prevede livelli, non fare nulla
      // se il privilegio è già stato scelto e prevede livelli ma supera il massimo, non fare nulla
    }
    // console.log(newTool);
  }

  // FIX CANCELLA
  deleteFromCart(i:number){ 
    if(this.isEquip) this.equipCart.splice(i,1)
    else this.privilegesCart.splice(i,1)
  }
  reset(){ this.equipCart =this.privilegesCart =[] }

  // TODO MODIFICA
  patchCart(totalAmount_Level:number, index:number){
    if(totalAmount_Level>0)
      if(this.isEquip) this.equipCart[index].amount =totalAmount_Level
      else this.privilegesCart[index].level =totalAmount_Level
    else this.deleteFromCart(index)
  }
}

