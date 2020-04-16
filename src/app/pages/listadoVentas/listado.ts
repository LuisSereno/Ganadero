import { IEOperacion } from './../../servicios/beans/interfaces/operacion.interface';
//import {NavController} from 'ionic-angular';
import { Component } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Venta} from '../../servicios/beans/venta'
import {Compra} from '../../servicios/beans/compra'
import {ListaGanado} from '../listadoGanado/listado'
import {Nuevo} from '../nuevo/nuevo'
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Constantes} from '../../servicios/genericos/constantes';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'listado.html'
})
export class ListaVentas {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "ventas";

	arrayVentas: Array<IEOperacion>;

	arrayCompras: Array<IEOperacion>;

  	constructor(public navCtrl: Router,public servicio: ServicioDatos) {
	}

	ionViewDidLoad() {
  		this.arrayVentas=new Array<Venta>();
		this.arrayCompras=new Array<Compra>();
	}

	ionViewWillEnter (){

		this.arrayVentas=this.servicio.getExplotacion().arrayVentas;
		this.arrayCompras=this.servicio.getExplotacion().arrayCompras;

		if (this.arrayVentas.length==0){
	 		this.servicio.obtenerDatosOperaciones(this.servicio.getExplotacion().id,true).subscribe((data:any) => {
				console.log("guapito de cara");
				console.log(data);
				let arrayTotal:Array<Animal>=new Array<Animal>();
				let machito:Macho;
				let hembrita:Hembra;
				let venta:Venta;
				if (data.compraVentas){
					for (let mach of data.compraVentas){
						if (mach.animales){
							for(let array of mach.animales){
								if (array.sexo==Constantes.HEMBRA){
									machito=Macho.fromJSON(array);
									arrayTotal.push(machito);
								}else if (array.sexo==Constantes.MACHO){
									hembrita=Hembra.fromJSON(array);
									arrayTotal.push(hembrita);
								}
							}
						}
						venta=Venta.fromJSON(mach);
						venta.animales = arrayTotal;
						this.arrayVentas.push(venta);
						this.servicio.getExplotacion().arrayVentas = this.arrayVentas;
					}
				}
			},err => {
			    console.log("Errr al obtener los datos de la venta del ganado!" + err);
			});
		}

		if (this.arrayCompras.length==0){
  			this.servicio.obtenerDatosOperaciones(this.servicio.getExplotacion().id,false).subscribe((data:any) => {
				console.log("guapito de cara");
				console.log(data);
				let arrayTotal:Array<Animal>=new Array<Animal>();
				let machito:Macho;
				let hembrita:Hembra;
				let compra:Compra;
				if (data.compraVentas){
					for (let mach of data.compraVentas){
						if (mach.animales){
							for(let array of mach.animales){
								if (array.sexo==Constantes.HEMBRA){
									machito=Macho.fromJSON(array);
									arrayTotal.push(machito);
								}else if (array.sexo==Constantes.MACHO){
									hembrita=Hembra.fromJSON(array);
									arrayTotal.push(hembrita);
								}
							}
						}
						compra=Compra.fromJSON(mach);
						compra.animales = arrayTotal;
						this.arrayCompras.push(compra);
						this.servicio.getExplotacion().arrayCompras = this.arrayCompras;
					}

				}

			},err => {
			    console.log("Errr al obtener los datos de la compra del ganado!" + err);
			});
		}
	}


/*	 ionViewWillEnter() {
	 	if (this.arrayVentas.length==0){
			this.arrayVentas=this.servicio.getExplotacion().getArrayVentas();
	 	}

	 	if (this.arrayCompras.length==0){
			this.arrayCompras=this.servicio.getExplotacion().getArrayCompras();
	 	}
	 }

	 ionViewDidLeave(){
	 	alert("vacio movidas memoria");
	 	this.arrayVentas=new Array<Venta>();
		this.arrayCompras=new Array<Compra>();
	 }
*/
	protected verListadoAnimales(animalitos:Array<Animal>,tipoOperacion:number){
		this.navCtrl.navigate(['listado-ganado',{animales:animalitos,venta:tipoOperacion}]);
	}

	protected anadirDatosVentas(){
		this.navCtrl.navigate(['listado-ganado',{venta:Constantes.VENTA_VENDER}]);	
	}

	protected anadirDatosCompras(){
		this.navCtrl.navigate(['animal-nuevo',{animal:null,compra:Constantes.COMPRA_COMPRA}]);	
	}
}
