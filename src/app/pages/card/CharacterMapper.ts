import { Character } from "../../services/character"
export function Initial(phrase:string) {
  return phrase[0].toUpperCase() +phrase.slice(1) .replaceAll('_',' ')
}
export interface CharacterMapper{
  keyCategory:string,
  content:{
  
    keyField:string, 
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
export function CharacterMapper(ref:Character) :CharacterMapper[] {
  return Object.keys(ref) 
  .map(keyCategory=>({
    // SEZIONI
    keyCategory: Initial(keyCategory),
    content: Object.keys(ref[keyCategory as keyof object]) 
    
    // CAMPI
    .map(keyField=>{
      const field :CharacterMapper['content'][0]['content'] =ref[keyCategory as keyof object][keyField as keyof object]
      return{ 
        keyField: Initial(keyField),
        value: typeof(field)==='object' ?undefined :field,
        content: keyField!=='caratteristica'&&keyField!=='oggetti' ?undefined :Object.keys(field) 

        // SOTTOCAMPI
        .map(keySub=>{
          const subfield =field[keySub]
          return{
          keySub: keyCategory==='equipaggiamento' ?subfield['titolo'] :Initial(keySub),
          value: keyCategory==='equipaggiamento' ?subfield['quantita'] :subfield['valore'],
          content: keyCategory==='equipaggiamento' ?undefined :Object.keys(subfield['abilita'])

          // ABILITA
          .map(keyAb=>({
            keyAb:Initial(keyAb),
            value:subfield['abilita'][keyAb],
          }))
        }})
      }})
  }))
}