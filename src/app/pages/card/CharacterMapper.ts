import { Character } from "../../services/character"
import { upperSpaces } from "../../tools/upperSpaces"
export interface CharacterMapper{
  keyCategory:string,
  title:string,
  content:{
  
    keyField:string, 
    title:string,
    value?:string |number,
    content?:{
  
      keySub:string,
      value:number,
      content?:{
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
export function CharacterMapper(ref:Character) :CharacterMapper[] {
  return Object.keys( Object.assign(order,ref) ) 
  // SEZIONI
  .map(keyCategory=>{
    return{
    keyCategory: keyCategory,
    title: upperSpaces(keyCategory),
    content: Object.keys(ref[keyCategory as keyof object]) 
    
    // CAMPI
    .map(keyField=>{
      const field :CharacterMapper['content'][0]['content'] =ref[keyCategory as keyof object][keyField as keyof object]
      return{ 
      title: upperSpaces(keyField),
      keyField: keyField,
      value: typeof(field)==='object' ?undefined :field,
      content: keyField!=='caratteristica'&&keyField!=='oggetti' ?undefined :Object.keys(field) 

      // SOTTOCAMPI
      .map(keySub=>{
        const subfield =field[keySub]
        return{
        keySub: keyCategory==='equipaggiamento' ?subfield['titolo'] :upperSpaces(keySub),
        value: keyCategory==='equipaggiamento' ?subfield['quantita'] :subfield['valore'],
        content: keyCategory==='equipaggiamento' ?undefined :Object.keys(subfield['abilita'])

        // ABILITA
        .map(keyAb=>({
          keyAb:upperSpaces(keyAb),
          value:subfield['abilita'][keyAb],
        }))
      }})
    }})
  }})
}