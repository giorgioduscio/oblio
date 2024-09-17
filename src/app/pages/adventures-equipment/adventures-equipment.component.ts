import { Component } from '@angular/core';
import { EquipmentService } from '../../services/equipment.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { upperSpaces } from '../../tools/upperSpaces';

@Component({
  selector: 'app-adventures-equipment',
  standalone: true,
  imports: [NgIf,NgFor,RouterModule,MatIcon, NavbarComponent],
  templateUrl: './adventures-equipment.component.html',
  styleUrl: './adventures-equipment.component.css'
})
export class AdventuresEquipmentComponent {
  mk ={userKey:'',charKey:''}
  tools =[{title:'', weight:0}]

  constructor(
    private ar:ActivatedRoute, 
    private equipmentService:EquipmentService,
  ){
    document.title =`Equipaggiamento`
    ar.params.subscribe((p:any)=>{p.userKey ?this.mk=p :0})
    this.tools =equipmentService.tools 
      .map(tool=>({...tool,title:upperSpaces(tool.title)}))
    // console.log(
    //   this.mk,
    //   this.tools
    // );
  }
}
