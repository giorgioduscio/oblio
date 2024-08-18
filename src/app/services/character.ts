export interface Character {
  // todo
  generalita:{
    nome :string,
    punti_esperienza :number,
    morale :Morale,
    eta :number,
    altezza :number,
    peso :number,
  }
  // todo
  competenze:{
    linguaggi :string, 
    armature :string, 
    armi :string, 
    strumenti :string 
  },
  // todo
  combattimento:{ 
    velocita:number
    classe_armatura :ClasseArmatura 
  },
  // todo
  personalita:{ 
    aggettivi :string, 
    ideali :string,
    legami :string
  },
  // todo
  bonus:{
    competenza :number,

    forza :{
      valore :number,
      abilita :{
        atletica :boolean,
      }
    },
    
    destrezza :{
      valore :number,
      abilita :{
        acrobazia :boolean,
        furtivita :boolean,
        mano :boolean,
      }
    },

    costituzione :{
      valore :number,
      abilita :{
        resilienza :boolean,
      }
    },
    intelligenza :{
      valore :number,
      abilita :{
        conoscenze_generali :boolean,
        indagare :boolean,
        psiche :boolean,
      }
    },

    saggezza :{
      valore :number,
      abilita :{
        animali :boolean,
        intuizione :boolean,
        medicina :boolean,
        percezione :boolean,
        sopravvivenza :boolean,
      },
    }

      carisma :{
      valore :number,
      abilita :{
        inganno :boolean,
        intimidire :boolean,
        intrattenere :boolean,
        persuasione :boolean,
      }
    },
  }
  // todo
  equipaggiamento:{
    oggetti:[{quantita:number, titolo:string}],
    monete:number,
  }
  // todo
  privilegi:string[]
}

// TODO enum
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