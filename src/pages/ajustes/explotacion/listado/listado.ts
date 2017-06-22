
import {NavController,NavParams,ToastController,Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {Explotacion} from '../../../../servicios/beans/explotacion';
// Cordova
declare var cordova: any;

@Component({
  templateUrl: 'listado.html',
})
export class ListaExplotaciones {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayExplotaciones: Array<Explotacion>;

  	constructor(public navCtrl: NavController,  params: NavParams) {

		this.arrayExplotaciones=params.get("explotaciones");
	}

	ngOnInit(){

	}

	
	protected seleccionarDocumento(explo:Explotacion){

	}  



}
