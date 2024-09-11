import { Character, ClasseArmatura, Morale } from "../../services/character";
import { randomString } from "../../tools/randomCompiler";
import { upperSpaces } from "../../tools/upperSpaces";

export function initCharacter():Character {
  return {
    generalita: {
      nome: upperSpaces(randomString()),
      morale: Morale.Collettivista_buono,
      eta: 30,
      altezza: 170,
      peso: 60
    },
    competenze: {
      linguaggi: 'Comune e dialetto',
      armature: '',
      armi: 'Semplici',
      strumenti: ''
    },
    combattimento: {
      velocita: 9,
      classe_armatura: ClasseArmatura.Senza_armatura,
      pf_attuali: 18
    },
    personalita: {
      aggettivi: '',
      ideali: '',
      legami: ''
    },
    bonus: {
      competenza: 2,
      caratteristica: {
        forza: {
          valore: 0,
          abilita: {
            atletica: false
          }
        },
        destrezza: {
          valore: 3,
          abilita: {
            acrobazia: false,
            furtivita: false,
            mano: false
          }
        },
        costituzione: {
          valore: -1,
          abilita: {
            resilienza: false
          }
        },
        intelligenza: {
          valore: 2,
          abilita: {
            conoscenze_generali: false,
            indagare: false,
            psiche: false
          }
        },
        saggezza: {
          valore: 3,
          abilita: {
            animali: false,
            intuizione: false,
            medicina: false,
            percezione: false,
            sopravvivenza: false
          }
        },
        carisma: {
          valore: 1,
          abilita: {
            inganno: false,
            intimidire: false,
            intrattenere: false,
            persuasione: false
          }
        }
      }
    },
    equipaggiamento: {
      monete: 20,
      oggetti: [
        { titolo: "arma di competenza", quantita: 1 },
        { titolo: "arma/scudo di competenza", quantita: 1 },
        { titolo: "armatura di competenza", quantita: 1 },
        { titolo: "giaciglio (sacco a pelo)", quantita: 1 },
        { titolo: "gavetta (kit da pranzo)", quantita: 1 },
        { titolo: "otre (borraccia)", quantita: 1 },
        { titolo: "corda di canapa (15m)", quantita: 1 },
        { titolo: "torcia", quantita: 10 },
        { titolo: "acciarino e pietra focaia", quantita: 1 },
        { titolo: "razione giornaliera", quantita: 10 },
      ]
    },
    privilegi: {
      punti_esperienza: 6,
      privilegi: ['Aggiungi privilegi']
    }
  }
}