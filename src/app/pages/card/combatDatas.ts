import { Character } from "../../services/character"

function calculateCA(value:number, character:Character):number{
  const destrezza =character.bonus.caratteristica.destrezza.valore
    ,costituzione =character.bonus.caratteristica.costituzione.valore
    ,saggezza =character.bonus.caratteristica.saggezza.valore

  switch(value){
    case 1: return 10 +destrezza +saggezza;
    case 2: return 10 +destrezza +costituzione;
    case 3: return 12 +destrezza;
    case 4: return 16;
    case 5: return 18;
    default: return 10 +destrezza;
  }
}
function hitPoints(character:Character):number{
  // console.log('hp',character);
    const cos =character.bonus.caratteristica.costituzione.valore
    return 20 +cos +(cos *Math.abs(cos))
  
  return 404
}

export function combatDatas(key:string, value:number, character:Character) {
  switch(key){
    case 'classe_armatura': return { icon:'shield', value:calculateCA(value, character)}
    case 'velocita': return { icon:'speed', value: value/1.5 }
    case 'pf_attuali': return { icon:'favorite', value:hitPoints(character) }
    default: return {icon:'favorite', value:404}
  }
}