//import {NavController} from 'ionic-angular';
import { Component } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Venta} from '../../servicios/beans/venta'
import {Compra} from '../../servicios/beans/compra'
import {ListaGanado} from '../listadoGanado/listado'
import { NavController } from 'ionic-angular';
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Constantes} from '../../servicios/constantes';

@Component({
  templateUrl: 'listado.html'
})
export class ListaVentas {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "ventas";

	arrayVentas: Array<Venta>;

	arrayCompras: Array<Compra>;

  	constructor(public navCtrl: NavController,public servicio: ServicioDatos) {

		this.arrayVentas=new Array<Venta>();
		this.arrayCompras=new Array<Venta>();
  		this.servicio.obtenerDatosOperaciones(this.servicio.getExplotacion().getId(),true).subscribe(data => {
				console.log("guapito de cara");
				console.log(data);
				let arrayTotal:Array<Animal>=new Array<Animal>();
				let machito:Macho;
				let hembrita:Hembra;
				let venta:Venta;
				for (let mach of data.datos){
					for(let array of mach.animales){
						if (array.sexo==Constantes.HEMBRA){
							machito=Macho.fromJSON(array);
							arrayTotal.push(machito);
						}else if (array.sexo==Constantes.MACHO){
							hembrita=Hembra.fromJSON(array);
							arrayTotal.push(hembrita);
						}
					}

					venta=Venta.fromJSON(mach);
					venta.setAnimales(arrayTotal);
					this.arrayVentas.push(venta);
				}
			},err => {
			    console.log("Errr al obtener los datos de la venta del ganado!" + err);
			});

  		this.servicio.obtenerDatosOperaciones(this.servicio.getExplotacion().getId(),false).subscribe(data => {
				console.log("guapito de cara");
				console.log(data);
				let arrayTotal:Array<Animal>=new Array<Animal>();
				let machito:Macho;
				let hembrita:Hembra;
				let compra:Compra;
				for (let mach of data.datos){
					for(let array of mach.animales){
						if (array.sexo==Constantes.HEMBRA){
							machito=Macho.fromJSON(array);
							arrayTotal.push(machito);
						}else if (array.sexo==Constantes.MACHO){
							hembrita=Hembra.fromJSON(array);
							arrayTotal.push(hembrita);
						}
					}

					compra=Compra.fromJSON(mach);
					compra.setAnimales(arrayTotal);
					this.arrayCompras.push(compra);
				}
			},err => {
			    console.log("Errr al obtener los datos de la compra del ganado!" + err);
			});



	}

	protected verListadoAnimales(animalitos:Array<Animal>,tipoOperacion:number){
		this.navCtrl.push(ListaGanado,{animales:animalitos,venta:tipoOperacion});
	}

	protected anadirDatosVentas(){
		alert("Aniade una venta");	
	}

	protected anadirDatosCompras(){
		alert("Aniade una compra");	
	}
}
