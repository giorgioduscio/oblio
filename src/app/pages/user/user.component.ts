import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { mapper } from '../../tools/tools';
import { User } from '../../services/user';
import { Character, ClasseArmatura, Morale } from '../../services/character';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../comp/navbar/navbar.component";
import { MatIcon } from '@angular/material/icon';
import { randomId } from '../../tools/randomCompiler';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    NgIf,
    NavbarComponent,
    MatIcon,
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user! :User
  characters! :Character[]
  userId! :string

  constructor(private activateRoute:ActivatedRoute, private usersService:UsersService){
    document.title='User'

    activateRoute.params.subscribe(params=>{
      this.userId =params['userId']
    })

    usersService.getUsers().subscribe((res:any)=>{
      this.user =mapper(res) .filter(user=>user.key ===this.userId)[0]
      this.characters =mapper(this.user.gdrCharacters!)
      // console.log('user',this.user,'\ncharacters', this.characters);
    })
  }
  addCharacter(){
    const newCharacter :Character ={
      generalita: {
        nome: 'Nuovo',
        punti_esperienza: 0,
        morale: Morale.Collettivista_buono,
        eta: 0,
        altezza: 0,
        peso: 0
      },
      competenze: {
        linguaggi: '',
        armature: '',
        armi: '',
        strumenti: ''
      },
      combattimento: {
        velocita: 0,
        classe_armatura: ClasseArmatura.Senza_armatura
      },
      personalita: {
        aggettivi: '',
        ideali: '',
        legami: ''
      },
      bonus: {
        competenza: 0,
        caratteristica: {
          forza: {
            valore: 0,
            abilita: {
              atletica: false
            }
          },
          destrezza: {
            valore: 0,
            abilita: {
              acrobazia: false,
              furtivita: false,
              mano: false
            }
          },
          costituzione: {
            valore: 0,
            abilita: {
              resilienza: false
            }
          },
          intelligenza: {
            valore: 0,
            abilita: {
              conoscenze_generali: false,
              indagare: false,
              psiche: false
            }
          },
          saggezza: {
            valore: 0,
            abilita: {
              animali: false,
              intuizione: false,
              medicina: false,
              percezione: false,
              sopravvivenza: false
            }
          },
          carisma: {
            valore: 0,
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
        monete: 0,
        oggetti: []
      },
      privilegi: []
    }
    this.usersService.addCharacter(this.userId, newCharacter)
    .subscribe((res:any)=>{
      console.log(res);
      location.reload()
    })
  }
  deleteCharacter(characterKey:string){
    this.usersService.deleteCharacter(this.userId, characterKey)
    .subscribe(res=>{
      location.reload()
      console.log(characterKey);
    })
  }
}
