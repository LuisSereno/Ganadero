/**
 * Created by plectro on 16/7/17.
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Filtro } from 'src/app/servicios/beans/filtro';


@Component({
  selector: 'ganadero-filtro-avanzado',
  templateUrl: 'filtroAvanzado.html'
})
export class FiltroAvanzado {

  @Output() typeChanged = new EventEmitter<Filtro>();

  filtroAvanzado:Filtro;

  constructor(private popover:PopoverController) {}

  ngOnInit() {
    this.filtroAvanzado=new Filtro();
  }
  ClosePopover()
  {
    this.popover.dismiss();
  }

  emit() {
    this.typeChanged.emit(this.filtroAvanzado);
  }

}
