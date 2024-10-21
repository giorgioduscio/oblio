import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MappedCharacter } from '../../tools/MappedCharacter';
import { NavbarComponent } from "../../../../comp/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../card.service';
import { EquipmentService } from '../../../../services/equipment.service';

@Component({
  selector: 'app-generic',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent,MatIcon, FormsModule, RouterModule],
  template:`
  @if (field.keyField=='morale'){
    <div class="colField">
      <label [for]="field.keyField">{{field.title}}</label>
      <select [id]="field.keyField" [value]="field.value" (change)="card.onPatchField(category.keyCategory, $event)">
        <option value="0">Individualista buono</option>
        <option value="1">Individualista neutrale</option>
        <option value="2">Individualista malvagio</option>
        <option value="3">Neutrale buono</option>
        <option value="4">Neutrale puro</option>
        <option value="5">Neutrale malvagio</option>
        <option value="6">Collettivista buono</option>
        <option value="7">Collettivista neutrale</option>
        <option value="8">Collettivista malvagio</option>
      </select> 
    </div>

  }@else if (field.keyField=='monete') {
    <div class="quadCols">
      <label [for]="field.keyField">{{field.title}}</label>
      <input
        [type]="inputType(field.value!)"
        [value]="field.value"
        [id]="field.keyField"
        (change)="card.onPatchField(category.keyCategory, $event)"
      >
      <label for="">Peso trasportabile</label>
      <span><b>{{transportableWeight().current}}</b> /{{transportableWeight().max}} kg</span>
    </div>

  } @else{
    <div [class]="autoClass()">
      <label [for]="field.keyField">{{field.title}}</label>
      <input
        [type]="inputType(field.value!)"
        [value]="field.value"
        [id]="field.keyField"
        (change)="card.onPatchField(category.keyCategory, $event)"
      >
    </div>
  }
  `,
  styleUrls:['../../card.component.css','./generic.component.css']
})
export class GenericComponent {
  @Input() category!:MappedCharacter
  @Input() field!:MappedCharacter['content'][4]
  constructor(public card:CardService, private es:EquipmentService){}
  ngOnInit(): void {
    // console.log(this.category.keyCategory, this.field.keyField);
  }

  inputType(value:number |string){ return typeof value==='number' ?'number' :"text" }

  autoClass(){
    if(this.category.keyCategory=='bonus'||this.category.keyCategory=='privilegi') return 'rowField' 
    else return 'colField'
  }
  
  transportableWeight(){
    const max =((this.card.character.bonus.caratteristica.forza.valore *2) +10) *7.5
    ,     current =this.card.character.equipaggiamento.oggetti.reduce(
      (accumulator,tool) => accumulator +this.es.toolWeight(tool.titolo,tool.quantita),0
    ) 
    ,     overWeight =current>max
    return {max:max, current:current, overWeight:overWeight}
  }

}