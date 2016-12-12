import { Component } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Detalle} from '../detalle/detalle'
import { NavController,NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'listado.html'
})
export class ListaGanado {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "hembras";

	arrayHembras: Array<Animal>;

	arrayMachos: Array<Animal>;

  	constructor(public navCtrl: NavController,  params: NavParams) {

  		if (params!=null && params.get("animales")!=null){
  			this.arrayHembras= new Array<Animal>();
  			this.arrayMachos= new Array<Animal>();

  			let animalito:Array<Animal>=params.get("animales");
  			for (let ani of animalito){
  				if (ani instanceof Macho ){
  					this.arrayMachos.push(ani);
  				}else{
					this.arrayHembras.push(ani);
  				}
  			}
  		}else{
  			let toroPadre1:Animal = new Macho(33,"pilon","blonda",null,5675,new Date(),["Ag5","A4E"],["cirrosis","quiste"],new Date(),[],[],0,0);
			let vacaMadre2:Animal = new Hembra(36,"mili","blonda",null,5678,new Date(),["3r3","23f","bm3"],["cirrosis4","quiste4"],new Date(),[],[],0,0);


	  		let arrayAscen:Array<Animal>=[toroPadre1,vacaMadre2];

	  		let arrayDescen:Array<Animal>=[toroPadre1,toroPadre1];

			let toro1:Animal = new Macho(33,"pilon","blonda",null,5675,new Date(),["Ag5","A4E"],["cirrosis","quiste"],new Date(),arrayAscen,arrayDescen,0,0);
			let toro2:Animal = new Macho(34,"pilonazo","blonda",null,5676,new Date(),["sere","as3","9oi"],["cirrosis2","quiste2"],new Date(),arrayAscen,arrayDescen,0,0);
			let vaca1:Animal = new Hembra(35,"pili","blonda",null,5677,new Date(),["Iu2","34e","23f"],["cirrosis3","quiste3"],new Date(),arrayAscen,arrayDescen,0,0);
			let vaca2:Animal = new Hembra(36,"mili","blonda",null,5678,new Date(),["3r3","23f","bm3"],["cirrosis4","quiste4"],new Date(),arrayAscen,arrayDescen,0,0);

			this.arrayHembras=[vaca1,vaca2];
			this.arrayMachos=[toro1,toro2];
  		}

	}

	protected detalle(animalito:Animal){
		this.navCtrl.push(Detalle,{animal:animalito});
	}
}
