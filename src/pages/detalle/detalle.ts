import {NavController,NavParams} from 'ionic-angular';
import { Component } from '@angular/core';
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Animal} from '../../servicios/beans/animal'


@Component({
	templateUrl: 'detalle.html'
})
export class Detalle {
	
	animal:Animal;

	fechaNacimiento: String;

	constructor(public navCtrl: NavController,  params: NavParams) {
		//let vaca2:Animal = new Hembra(36,"mili","blonda",null,5678,new Date(),[],[],new Date());
		//this.animal=vaca2;
		let animalito:Animal=params.get("animal");
		this.fechaNacimiento=animalito.getFechaNacimiento().toISOString();
		this.animal=animalito;
	}

	private volver(){
		this.navCtrl.pop();
	}

}
