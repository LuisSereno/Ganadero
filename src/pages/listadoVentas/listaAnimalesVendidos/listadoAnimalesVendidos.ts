import { Component } from '@angular/core';
import {Animal} from '../../../servicios/beans/animal'
import {Venta} from '../../../servicios/beans/venta'
import { NavController,NavParams } from 'ionic-angular';
import {ServicioDatos} from '../../../servicios/serviciodatos';
import {Constantes} from '../../../servicios/constantes';

@Component({
  templateUrl: 'listadoAnimalesVendidos.html'
})
export class ListadoAnimalesVendidos {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "hembras";

	arrayAnimales: Array<Animal>;

	venta:Venta;


  	constructor(public navCtrl: NavController,params: NavParams,public servicio: ServicioDatos) {

  		this.arrayAnimales=params.get("animalesSeleccionados");	
  		
	}		


}
