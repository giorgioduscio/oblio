import { Injectable } from '@angular/core';
import { Character, ClasseArmatura, Morale} from './character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor() { }
  characters :Character[] =[
    {
      generalita: {
        nome: 'Redanofer',
        punti_esperienza: 0,
        morale: Morale.Neutrale_buono,
        eta: 4,
        altezza: 60,
        peso: 30
      },
      competenze: {
        linguaggi: 'Elfico',
        armature: 'Armature leggere',
        armi: 'Armi bilanciate',
        strumenti: 'Nessuno'
      },
      combattimento: {
        velocita: 7.5,
        classe_armatura: ClasseArmatura.Armatura_di_cuoio
      },
      personalita: {
        aggettivi: 'Buffo',
        ideali: 'Individualismo',
        legami: 'Miss Ulena'
      },
      bonus: {
        competenza: 2,
        forza: {
          valore: -1,
          abilita: {
            atletica: false
          }
        },
        destrezza: {
          valore: 0,
          abilita: {
            acrobazia: true,
            furtivita: false,
            mano: true
          }
        },
        costituzione: {
          valore: 1,
          abilita: {
            resilienza: false
          }
        },
        intelligenza: {
          valore: 2,
          abilita: {
            conoscenze_generali: true,
            indagare: false,
            psiche: true
          }
        },
        saggezza: {
          valore:3,
          abilita: {
            animali: false,
            intuizione: true,
            medicina: false,
            percezione: true,
            sopravvivenza: false
          }
        },
        carisma: {
          valore:4,
          abilita: {
            inganno: true,
            intimidire: false,
            intrattenere: true,
            persuasione: false
          }
        }
      },
      equipaggiamento: {
        oggetti: [
          { quantita: 1, titolo: 'Arco' },
          { quantita: 2, titolo: 'Banana' },
          { quantita: 1, titolo: 'Spada lunga' },
          { quantita: 30, titolo: 'Freccia' },
        ],
        monete: 200,
      },
      privilegi: [
        'Allerta',
      ],
    },

    // todo
  ]
}