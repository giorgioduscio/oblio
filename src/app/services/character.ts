export interface Character {
  generalita:{
    nome :string,
    punti_esperienza :number,
    morale :Morale,
    eta :number,
    altezza :number,
    peso :number,
  }
  competenze:{
    linguaggi :string, 
    Armature :string, 
    Armi :string, 
    strumenti :string 
  },
  combattimento:{ 
    velocita:number
    classe_armatura :ClasseArmatura 
  },
  personalita:{ 
    aggettivi :string, 
    ideali :string,
    legami :string
  },
  bonus:{
    competenza :number,
    punteggi:{ 
      forza :number,
      destrezza :number,
      costituzione :number,
      intelligenza :number,
      saggezza :number,
      carisma:number,
    },
    abilita:{
      atletica :boolean,
      acrobazia :boolean,
      fFurtività :boolean,
      mano :boolean,
      resilienza :boolean,
      conoscenzeGenerali :boolean,
      indagare :boolean,
      psiche :boolean,
      animali :boolean,
      intuizione :boolean,
      medicina :boolean,
      percezione :boolean,
      sopravvivenza :boolean,
      inganno :boolean,
      intimidire :boolean,
      intrattenere :boolean,
      persuasione :boolean,
    },
  }
  equipaggiamento:{
    oggetti:[{quantita:number, titolo:string}],
    monete:number,
  }
  privilegi:[{titolo:string}]
}

// TODO enum
// export enum Morale{
//   Individualista_buono ="Individualista buono",
//   Individualista_neutrale ="Individualista neutrale",
//   Individualista_malvagio ="Individualista malvagio",
  
//   Neutrale_buono ="Neutrale buono",
//   Neutrale_puro ="Neutrale puro",
//   Neutrale_malvagio ="Neutrale malvagio",

//   Collettivista_buono="Collettivista buono",
//   Collettivista_neutrale="Collettivista neutrale",
//   Collettivista_malvagio="Collettivista malvagio",
// }
export enum Morale{
  Individualista_buono,
  Individualista_neutrale,
  Individualista_malvagio,
  
  Neutrale_buono,
  Neutrale_puro,
  Neutrale_malvagio,

  Collettivista_buono,
  Collettivista_neutrale,
  Collettivista_malvagio,
}

export enum ClasseArmatura{
  Senza_armatura,
  Monaco,
  Barbaro,
  Armatura_di_cuoio,
  Cotta_di_maglia,
  Armatura_di_piastre,
}