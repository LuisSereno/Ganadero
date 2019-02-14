
import {NavController,NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Explotacion} from '../../../../servicios/beans/explotacion';
import {ServicioDatos} from '../../../../servicios/serviciodatos';
import {ListaGanado} from '../../../listadoGanado/listado';
import {DetalleExplotacion} from '../nueva/nueva';
// Cordova
declare var cordova: any;

@Component({
  templateUrl: 'listado.html',
})
export class ListaExplotaciones {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayExplotaciones: Array<Explotacion>;

  	constructor(protected navCtrl: NavController,protected  params: NavParams,public servicio: ServicioDatos) {
		
	}

	ionViewDidLoad(){
		this.arrayExplotaciones=this.params.get("explotaciones");
	}

	
	protected seleccionarExplotacion(explo:Explotacion){
		this.servicio.setExplotacion(explo);
		this.navCtrl.setRoot(ListaGanado);
	}  

	protected crearExplotacion(){
 		this.navCtrl.setRoot(DetalleExplotacion);
	}

}
