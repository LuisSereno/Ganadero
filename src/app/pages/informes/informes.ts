/**
 * Created by plectro on 16/7/17.
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { Filtro } from 'src/app/servicios/beans/filtro';

//import {ServicioDatos} from '../../servicios/serviciodatos';

@Component({
  templateUrl: 'informes.html'
})
export class Informes {

  @Output() typeChanged = new EventEmitter<Filtro>();

  filtroAvanzado:Filtro;

  constructor() {
    this.filtroAvanzado=new Filtro();
  }

  emit() {
    this.typeChanged.emit(this.filtroAvanzado);
  }

}
