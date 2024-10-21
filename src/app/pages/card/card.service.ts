import { effect, Injectable } from '@angular/core';
import { Character } from '../../services/character';
import { CharactersService } from '../../services/characters.service';
import { NgForm } from '@angular/forms';
import { MappedCharacter } from './tools/MappedCharacter';

@Injectable({  providedIn: 'root' })
export class CardService {
  charKey=''
  character! :Character
  mappedCharacter :MappedCharacter[] =[]
  constructor(private charactersService:CharactersService){}
  
  onPatchField(keyCetegory:string, e:Event){
    const {id, value} =e.target as HTMLInputElement
    ,     $keyCetegory =keyCetegory as keyof Character
    ,     $keyField =id as keyof Character[typeof $keyCetegory]
    ,     newvalue =Number.isNaN(Number(value)) ?value :Number(value)
    ,     newCharacter :any =this.character

    newCharacter[$keyCetegory]![$keyField] =newvalue
    this.charactersService.patchCharacter(this.charKey, newCharacter)
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
    this.charactersService.patchCharacter(this.charKey, newCharacter)
  }
  onPatchAbility(keySub:string,e:Event){
    const $traitName =keySub as keyof Character['bonus']['caratteristica']
    ,     {id, checked} =e.target as HTMLInputElement
    ,     $abilityName =id as keyof Character['bonus']['caratteristica'][typeof $traitName]['abilita']
    ,     newCharacter :any =this.character
    
    newCharacter.bonus.caratteristica[$traitName].abilita[$abilityName] =checked
    this.charactersService.patchCharacter(this.charKey, newCharacter)
  }

  onDeleteRecord(keyCetegory:string,i:number){
    const $keyCetegory =keyCetegory as keyof Character
    ,     newCharacter :any =this.character
    
    if ($keyCetegory=='equipaggiamento') {
      newCharacter[$keyCetegory]['oggetti'].splice(i,1)
      
    } else if($keyCetegory=='privilegi') {
      newCharacter[$keyCetegory]['privilegi'].splice(i,1)
    }
    this.charactersService.patchCharacter(this.charKey, newCharacter)
  }
  onAddRecord(keyCetegory:string, form:NgForm){
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
      // ARRAY PIENO
      } else {
        this.character.equipaggiamento.oggetti.push(newTool)
      }
    }
    else if(keyCetegory==='privilegi'){
      if (isVoidPrivileges) {
        this.character.privilegi.privilegi = [form.value.titolo] 
        
      } else {
        this.character.privilegi.privilegi.push( form.value.titolo )
      }
    }
    this.charactersService.patchCharacter(this.charKey, this.character)
    form.reset()
  }
}
