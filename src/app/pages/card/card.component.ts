import { Component, effect } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CharacterMapper } from './CharacterMapper';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { RealtimeUsersService } from '../../services/realtimeUsers.service';
import { Character } from '../../services/character';
import { initCharacter } from './initCharacter';
import { MatIcon } from '@angular/material/icon';
import { EquipmentService } from '../../services/equipment.service';
import { PrivilegesService } from '../../services/privileges.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent,MatIcon, FormsModule],
  templateUrl: './card.component.html',
  styleUrls:['./card.component.css','./cardResponsive.component.css']
})
export class CardComponent {
  mk ={userKey:'', charKey:''}
  mappedCharacter :CharacterMapper[] =[]
  character :Character =initCharacter()
  constructor(
    private activatedRoute:ActivatedRoute, 
    private rus:RealtimeUsersService,
    private equipService:EquipmentService,
    private privilegeService:PrivilegesService,
  ){ 
    document.title =`Card`
    activatedRoute.params.subscribe((params:any)=>{ this.mk =params })
    rus.getUsers()
    
    effect(()=>{ 
      let $user =rus.users().find(u=>u.key===this.mk.userKey)
      if($user){
        this.character =$user.gdrCharacters!.find(c=>c.key===this.mk.charKey)!
        this.mappedCharacter =CharacterMapper( this.character )
      }
    })
  }
  inputType(value:number |string){ return typeof value==='number' ?'number' :"text" }

  // DROPDOWN
  menageDrop(e:Event){
    const div =(e.target as HTMLInputElement).parentElement
    div?.attributes.getNamedItem('drop') 
    ? div?.removeAttribute('drop') 
    : div?.setAttribute('drop','')
  }
  // COMBATTIMENTO
  combat(key:string) {
    const $key =key as keyof Character['combattimento']
    ,     value =this.character.combattimento[$key]
    ,     destrezza =this.character.bonus.caratteristica.destrezza.valore
    ,     costituzione =this.character.bonus.caratteristica.costituzione.valore
    ,     saggezza =this.character.bonus.caratteristica.saggezza.valore
    ,     hitPoints =20 +costituzione +(costituzione *Math.abs(costituzione))
    
    let CA =0
    switch(value){
      case 1: CA =10 +destrezza +saggezza; break
      case 2: CA =10 +destrezza +costituzione; break
      case 3: CA =12 +destrezza; break
      case 4: CA =16; break
      case 5: CA =18; break
      default: CA =10 +destrezza;
    }
    switch(key){
      case 'classe_armatura': return { icon:'shield', value: CA}
      case 'velocita':        return { icon:'speed', value: value/1.5 }
      case 'pf_attuali':      return { icon:'favorite', value: hitPoints }
      default:                return { icon:'favorite', value:404 }
    }
  }

  // BONUS  
  abilityBonus(traitName:string, abilityName:string) :string {
    const $tn =traitName as keyof Character['bonus']['caratteristica']
    ,     traitValue =this.character.bonus.caratteristica[$tn].valore
    ,     $an =abilityName as keyof Character['bonus']['caratteristica'][typeof $tn]['abilita']
    ,     abilityValue :boolean =this.character.bonus.caratteristica[$tn].abilita[$an]
    ,     abilityBonus =abilityValue ?traitValue+this.character.bonus.competenza :traitValue
    return abilityBonus +' ' +$an
  }

  // EQUIPAGGIAMENTO
  transportableWeight(){
    const max =((this.character.bonus.caratteristica.forza.valore *2) +10) *7.5
    ,     current =this.character.equipaggiamento.oggetti.reduce((accumulator,tool) => accumulator +this.equipService.toolWeight(tool.titolo,tool.quantita),0) 
    ,     overWeight =current>max
    return {max:max, current:current, overWeight:overWeight}
  }
  toolWeight(i:number) :number { 
    const toolAmount =this.character.equipaggiamento.oggetti[i].quantita
    ,     toolTitle =this.character.equipaggiamento.oggetti[i].titolo
    return this.equipService.toolWeight(toolTitle, toolAmount) 
  }

  // PRIVILEGI
  privilegeProp(i:number){ 
    const title =this.character.privilegi.privilegi[i]
    return {
      description: this.privilegeService.privilegeDescription(title),
      cost: this.privilegeService.privilegeCost(title)
    }
  }

  // TODO MODIFICA
  onPatchField(keyCetegory:string, e:Event){
    const {id, value} =e.target as HTMLInputElement
    ,     $keyCetegory =keyCetegory as keyof Character
    ,     $keyField =id as keyof Character[typeof $keyCetegory]
    ,     newvalue =Number.isNaN(Number(value)) ?value :Number(value)
    ,     newCharacter :any =this.character

    newCharacter[$keyCetegory]![$keyField] =newvalue
    this.rus.patchCharacter(this.mk.userKey, this.mk.charKey, newCharacter)    
  }
  
  onPatchSubfield(keyCetegory:string, keyField:string, e:Event, indexSub?:number){
    const {id, value} =e.target as HTMLInputElement
    ,     $keyCetegory =keyCetegory as keyof Character
    ,     $keyField =keyField as keyof Character[typeof $keyCetegory]
    ,     $keysub =id as keyof Character[typeof $keyCetegory][typeof $keyField]
    ,     newvalue =Number.isNaN(Number(value)) ?value :Number(value)
    ,     newCharacter :any =this.character

    if(indexSub!=undefined){
      if(keyCetegory=='equipaggiamento') newCharacter[$keyCetegory]![$keyField][indexSub][$keysub] =newvalue
      if(keyCetegory=='privilegi') newCharacter[$keyCetegory]![$keyField][indexSub] =newvalue
      
    }else {
      if(keyCetegory=='bonus') newCharacter[$keyCetegory]![$keyField][$keysub]['valore'] =newvalue
    }
    this.rus.patchCharacter(this.mk.userKey, this.mk.charKey, newCharacter)        
  }
  onPatchAbility(keySub:string,e:Event){
    const $traitName =keySub as keyof Character['bonus']['caratteristica']
    ,     {id, checked} =e.target as HTMLInputElement
    ,     $abilityName =id as keyof Character['bonus']['caratteristica'][typeof $traitName]['abilita']
    ,     newCharacter :any =this.character
    
    newCharacter.bonus.caratteristica[$traitName].abilita[$abilityName] =checked
    this.rus.patchCharacter(this.mk.userKey, this.mk.charKey, newCharacter)        
  }

  onDeleteRecord(keyCetegory:string,i:number){
    const $keyCetegory =keyCetegory as keyof Character
    
    if ($keyCetegory=='equipaggiamento') {
      this.character[$keyCetegory]['oggetti'].splice(i,1)
      this.mappedCharacter[5].content[1].content!.splice(i,1)
      
    } else if($keyCetegory=='privilegi') {
      this.character[$keyCetegory]['privilegi'].splice(i,1)
      this.mappedCharacter[6].content[1].content!.splice(i,1)
    }
    this.rus.patchCharacter(this.mk.userKey, this.mk.charKey, this.character)
  }
  onAddRecord(keyCetegory:string,form:NgForm){
    const isVoidEquipment =this.character.equipaggiamento.oggetti[0].titolo ?false :true
    ,     isVoidPrivileges =this.character.privilegi.privilegi[0] ?false :true

    if (keyCetegory==='equipaggiamento') {
      const newTool ={ 
        titolo: form.value.titolo, 
        quantita: Number(form.value.quantita)==0 ?1 :Number(form.value.quantita)
      }
      // ARRAY VUOTO
      if (isVoidEquipment){ 
        this.character.equipaggiamento.oggetti =[newTool]
        this.mappedCharacter[5].content[1].content 
          =[{ titleSub: '', keySub: newTool.titolo, value: newTool.quantita }]
      // ARRAY PIENO
      } else {
        this.character.equipaggiamento.oggetti.push(newTool)
        this.mappedCharacter[5].content[1].content!
          .push({ titleSub: '', keySub: newTool.titolo, value: newTool.quantita })
      }
    }
    else if(keyCetegory==='privilegi'){
      if (isVoidPrivileges) {
        this.character.privilegi.privilegi = [form.value.titolo] 
        this.mappedCharacter[6].content[1].content
          =[{ titleSub: '', keySub: '', value: form.value.titolo }]
        
      } else {
        this.character.privilegi.privilegi.push( form.value.titolo )
        this.mappedCharacter[6].content[1].content!
          .push({ titleSub: '', keySub: '', value: form.value.titolo })
      }
    }
    this.rus.patchCharacter(this.mk.userKey, this.mk.charKey, this.character)
    form.reset()
  }



}