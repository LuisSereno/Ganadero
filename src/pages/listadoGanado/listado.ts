//import {NavController} from 'ionic-angular';
import { Component } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/Macho'
import {Detalle} from '../detalle/detalle'
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'listado.html'
})
export class ListaGanado {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "hembras";

	arrayHembras: Array<Animal>;

	arrayMachos: Array<Animal>;

  	constructor(public navCtrl: NavController) {

		let toro1:Animal = new Macho(33,"pilon","blonda",null,5675,new Date(),[],[],new Date());
		let toro2:Animal = new Macho(34,"pilonazo","blonda",null,5676,new Date(),[],[],new Date());
		let vaca1:Animal = new Hembra(35,"pili","blonda",null,5677,new Date(),[],[],new Date());
		let vaca2:Animal = new Hembra(36,"mili","blonda",null,5678,new Date(),[],[],new Date());

		this.arrayHembras=[vaca1,vaca2];
		this.arrayMachos=[toro1,toro2];
	}

	protected detalle(animalito:Animal){
		alert(animalito.getAlias());
		this.navCtrl.push(Detalle,{animal:animalito});
	}
}
