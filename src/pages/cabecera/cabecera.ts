import { Component } from '@angular/core';
import {ServicioDatos} from '../../servicios/serviciodatos';

@Component({
  selector:'cabecera-ganadero',
  templateUrl: 'cabecera.html'
})
export class Cabecera {

  	constructor(private servicio:ServicioDatos) {
  		console.log("estamos aqui");
  		console.log(this.servicio.getExplotacion());
		console.log(this.servicio.getExplotacion().getUsuario().getNombre())
	}

}
