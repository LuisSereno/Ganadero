import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Filtro } from 'src/app/servicios/beans/filtro';

@Component({
  selector: 'app-filtro-avanzado-component',
  templateUrl: './filtro-avanzado-component.page.html',
  styleUrls: ['./filtro-avanzado-component.page.scss'],
})
export class FiltroAvanzadoComponentPage implements OnInit {

  @Input() filtroAvanzadoEntrada:Filtro;

  filtroAvanzado:Filtro;

  constructor(private popover:PopoverController) {}

  ngOnInit() {
    if (this.filtroAvanzadoEntrada==null){
      this.filtroAvanzado=new Filtro()
    }else{
      this.filtroAvanzado=this.filtroAvanzadoEntrada
    };
  }

  emit() {
    this.popover.dismiss({ data: this.filtroAvanzado });
  }

}
