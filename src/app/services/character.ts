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
    armature :string, 
    armi :string, 
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
    caratteristica:{
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
  }
  equipaggiamento:{
    monete:number,
    oggetti:{quantita:number, titolo:string}[],
  }
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