import { Injectable } from '@angular/core';
import { Tool } from '../../services/equipment.service';

@Injectable({  providedIn: 'root' })
export class EquipCartService {
  private equipCart :Tool[] =[
    // { title: 'oggetto1', weight: 10, price: 3, amount:1 },
    // { title: 'oggetto2', weight: 2, price: 2, amount:10 },
    // { title: 'oggettoNomeLungo', weight: 1, price: 5, amount:3 },
  ]
  getCart(){ return this.equipCart }
  getTotal(){
    let weight=0
    ,   price=0
    this.equipCart.map(el=>{
      weight +=el.weight *el.amount!
      price +=el.price *el.amount!
    })
    return{ weight, price }
  }
  // TODO MODIFICA
  addToCart(newTool:Tool){
    let index =this.equipCart.indexOf(newTool)
    if (index ===-1) {
      newTool.amount=1
      this.equipCart.push(newTool) 
      
    } else {
      this.equipCart[index].amount! +=newTool.amount!
    }
  }
  deleteFromCart(i:number){ this.equipCart.splice(i,1) }
  reset(){ this.equipCart=[] }
  patchCart(totalAmount:number, index:number){
    if(totalAmount>0) this.equipCart[index].amount =totalAmount
    else this.deleteFromCart(index)
  }
}

