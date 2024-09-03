import { Character, ClasseArmatura, Morale } from "../../services/character";
import { randomString } from "../../tools/randomCompiler";

export function initCharacter():Character {
  return {
    generalita: {
      nome: 'New-' +randomString(),
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
      aggettivi: 'Aggiungi aggettivi',
      ideali: 'Aggiungi ideali',
      legami: 'Aggiungi legami'
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
        { titolo: "Arma di competenza", quantita: 0 },
        { titolo: "Arma/scudo di competenza", quantita: 0 },
        { titolo: "Armatura di competenza", quantita: 0 },
        { titolo: "Giaciglio (sacco a pelo)", quantita: 0 },
        { titolo: "Gavetta (kit da pranzo)", quantita: 0 },
        { titolo: "Un otre (borraccia)", quantita: 0 },
        { titolo: "15m Corda di canapa", quantita: 0 },
        { titolo: "Torcia", quantita: 10 },
        { titolo: "Acciarino e pietra focaia", quantita: 0 },
        { titolo: "Razioni giornaliere", quantita: 10 },
      ]
    },
    privilegi: {
      punti_esperienza: 6,
      privilegi: ['Aggiungi privilegi']
    }
  }
}