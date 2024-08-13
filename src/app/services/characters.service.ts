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
        punteggi: {
          forza: -1,
          destrezza: 0,
          costituzione: 1,
          intelligenza: 2,
          saggezza: 3,
          carisma: 4,
        },
        abilita: {
          atletica: true,
          acrobazia: false,
          fFurtività: true,
          mano: false,
          resilienza: true,
          conoscenzeGenerali: false,
          indagare: true,
          psiche: false,
          animali: true,
          intuizione: false,
          medicina: true,
          percezione: false,
          sopravvivenza: true,
          inganno: false,
          intimidire: true,
          intrattenere: false,
          persuasione: true
        }
      },
      equipaggiamento: {
        oggetti:[
          { quantita: 0, titolo: 'Banana' },
        ],
        monete: 200,
      },
      privilegi: [
        { titolo: 'Allerta' },
      ]
    },

  ]
}
