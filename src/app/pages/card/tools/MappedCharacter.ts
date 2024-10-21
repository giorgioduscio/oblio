import { Character } from "../../../services/character"
import { upperSpaces } from "../../../tools/upperSpaces"
export interface MappedCharacter{
  keyCategory:string,
  title:string,
  content:{
  
    keyField:string, 
    title:string,
    value?:string |number,
    content?:{
  
      titleSub:string,
      keySub:string,
      value:number|string,
      content?:{
        titleAb:string,
        keyAb:string,
        value:boolean,
      }[]
    }[]
  }[]
}

const order ={
  generalita:null,
  competenze:null,
  combattimento:null,
  personalita:null,
  bonus:null,
  equipaggiamento:null,
  privilegi:null,
}

export function MappedCharacter(character:Character) :MappedCharacter[] {
  // elimina la chiave e inizializza gli array undefined
  delete character.key
  let characterAny :any =character; delete characterAny.userId; character =characterAny
  if (!character.equipaggiamento.oggetti) character.equipaggiamento.oggetti =[{ quantita: 0, titolo: "" }]
  if (!character.privilegi.privilegi) character.privilegi.privilegi =['']
  
  const result =Object.keys( Object.assign(order,character) ) 
  // SEZIONI
  .map((keyCategory,a)=>{
    return{
    keyCategory: keyCategory,
    title: upperSpaces(keyCategory),
    content: Object.keys(character[keyCategory as keyof object]) 
    
    // CAMPI
    .map(keyField=>{
      const field :MappedCharacter['content'][0]['content'] =character[keyCategory as keyof object][keyField as keyof object]
      
      return{ 
      title: upperSpaces(keyField),
      keyField: keyField,
      value: typeof(field)==='object' ?undefined :field,
      content:  keyField!=='caratteristica'&&keyField!=='oggetti'&&keyField!=='privilegi' ?undefined :Object.keys(field) 

      // SOTTOCAMPI
      .map(keySub=>{
        const subfield =field[keySub]
        return{
        titleSub: upperSpaces(keySub),
        keySub: keyCategory==='equipaggiamento' ?subfield['titolo'] :keySub,
        // quantità equip | valore punteggio | privilegio
        value:  keyCategory==='equipaggiamento' ?subfield['quantita'] :
                keyCategory==='bonus' ?subfield['valore'] :
              /*keyCategory==='privilegi'*/subfield,
        
        // ABILITA
        content:keyCategory!=='bonus' ?undefined :Object.keys(subfield['abilita'])
        .map(keyAb=>({
          titleAb:upperSpaces(keyAb),
          keyAb:keyAb,
          value:subfield['abilita'][keyAb],
        })) // ABILITA

      }})
    }})
  }})
  // GESTISCE L'ORDINE DEGLI ARRAY
  // combattimento
  if(result[2].content[0].keyField=='classe_armatura') result[2].content.reverse()
  // bonus
  if(result[4].content[0].keyField=='caratteristica') result[4].content.reverse()
  // privilegi
  if(result[6].content[0].keyField=='privilegi') result[6].content.reverse()
  
  return result
}