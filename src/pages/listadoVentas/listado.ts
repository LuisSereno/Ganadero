//import {NavController} from 'ionic-angular';
import { Component } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Venta} from '../../servicios/beans/venta'
import {Compra} from '../../servicios/beans/compra'
import {ListaGanado} from '../listadoGanado/listado'
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'listado.html'
})
export class ListaVentas {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "ventas";

	arrayVentas: Array<Venta>;

	arrayCompras: Array<Compra>;

  	constructor(public navCtrl: NavController) {

		let toroPadre1:Animal = new Macho(33,"pilon","blonda",null,5675,new Date(),["Ag5","A4E"],["cirrosis","quiste"],[],[],0,0);
		let vacaMadre2:Animal = new Hembra(36,"mili","blonda",null,5678,new Date(),["3r3","23f","bm3"],["cirrosis4","quiste4"],new Date(),[],[],0,0);
  		let arrayAscen:Array<Animal>=[toroPadre1,vacaMadre2];
  		let arrayDescen:Array<Animal>=[toroPadre1,toroPadre1];
		let toro1:Animal = new Macho(33,"pilon","blonda",null,5675,new Date(),["Ag5","A4E"],["cirrosis","quiste"],arrayAscen,arrayDescen,0,0);
		let toro2:Animal = new Macho(34,"pilonazo","blonda",null,5676,new Date(),["sere","as3","9oi"],["cirrosis2","quiste2"],arrayAscen,arrayDescen,0,0);
		let vaca1:Animal = new Hembra(35,"pili","blonda",null,5677,new Date(),["Iu2","34e","23f"],["cirrosis3","quiste3"],new Date(),arrayAscen,arrayDescen,0,0);
		let vaca2:Animal = new Hembra(36,"mili","blonda",null,5678,new Date(),["3r3","23f","bm3"],["cirrosis4","quiste4"],new Date(),arrayAscen,arrayDescen,0,0);
		let toro3:Animal = new Macho(37,"pilon2","blonda2",null,5679,new Date(),["Ag5","A4E"],["cirrosis","quiste"],null,null,0,0);
		let toro4:Animal = new Macho(38,"pilonazo2","blonda2",null,5680,new Date(),["sere","as3","9oi"],["cirrosis2","quiste2"],null,null,0,0);
		let vaca3:Animal = new Hembra(39,"pili2","blonda2",null,5681,new Date(),["Iu2","34e","23f"],["cirrosis3","quiste3"],new Date(),null,null,0,0);
		let vaca4:Animal = new Hembra(40,"mili2","blonda2",null,5682,new Date(),["3r3","23f","bm3"],["cirrosis4","quiste4"],new Date(),null,null,0,0);


		let arrayAnimalesCompra: Array<Animal> = [toro1,vaca1];
		let arrayAnimalesVenta: Array<Animal> = [toro2,vaca2];
		let arrayAnimalesCompra1: Array<Animal> = [toro3,vaca3];
		let arrayAnimalesVenta1: Array<Animal> = [toro4,toro3,toro3,vaca4];

		let venta1 = new Venta(1,"venta noviembre",arrayAnimalesVenta,500,new Date());
		let venta2 = new Venta(2,"venta noviembre",arrayAnimalesVenta1,600,new Date());
		let venta3 = new Venta(3,"venta noviembre",arrayAnimalesCompra1,700,new Date());

		let compra1 = new Compra(1,"compra enero",arrayAnimalesCompra,515,new Date());
		let compra2 = new Compra(2,"venta febrero",arrayAnimalesVenta1,6340,new Date());
		let compra3 = new Compra(3,"venta marzo",arrayAnimalesCompra1,740,new Date());


		this.arrayVentas=[venta1,venta2,venta3];
		this.arrayCompras=[compra1,compra2,compra3];
	}

	protected verListadoAnimales(animalitos:Array<Animal>){
		this.navCtrl.push(ListaGanado,{animales:animalitos});
	}
}
