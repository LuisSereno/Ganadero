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
import { OperacionServicio } from 'src/app/servicios/operacion.service';
import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';
import { Operacion } from 'src/app/servicios/beans/operacion';

@Component({
  templateUrl: 'listado.html'
})
export class ListaVentas {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "ventas";

	arrayVentas: Array<IEOperacion>;

	arrayCompras: Array<IEOperacion>;

  	constructor(public router: Router,public operacion: OperacionServicio,	public explotacionServ: ExplotacionServicio) {
	}

	ionViewDidLoad() {
  		this.arrayVentas=new Array<Venta>();
		this.arrayCompras=new Array<Compra>();
	}

	ionViewWillEnter (){
		this.arrayVentas=new Array<Venta>();
		this.arrayCompras=new Array<Compra>();

		let explotacion=this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada);
		if (explotacion){
				this.operacion.obtenerDatosOperaciones(explotacion.arrayIdOperaciones).then((dataOperacion:IEOperacion[]) => {

					for (let operacion of dataOperacion){
						if (operacion){
							operacion.fechaOperacion=new Date(String(operacion.fechaOperacion));
							if (operacion.tipo == Constantes.VENTA){
								this.arrayVentas.push(operacion);
							}else{
								this.arrayCompras.push(operacion);
							}
						}
					}

			   },err => {
				   console.error("Errr al obtener los datos de la venta del ganado!" + err);
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
		this.router.navigate(['listado-ganado',{animales:animalitos,venta:tipoOperacion}]);
	}

	protected anadirDatosVentas(){
		this.router.navigate(['ganadero/operacion-nueva',Constantes.VENTA_VENDER]);
	}

	protected anadirDatosCompras(){
		//this.router.navigate(['animal-nuevo',{animal:null,compra:Constantes.COMPRA_COMPRA}]);
		this.router.navigate(['ganadero/operacion-nueva',Constantes.COMPRA_COMPRA]);

	/*	this.router.navigate(['ganadero/animal-nuevo'], {
			queryParams: {
				"explotacionID": this.servicio.getExplotacion().id,
				"animalID": null,
				"sexo": sexo,
				"compra":Constantes.COMPRA_COMPRA
			}
		});
*/
	}

	protected verDetalleOperacion(operation:Operacion,kindOperation:number){
		this.operacion.operacionSeleccionada=operation;
		this.router.navigate(['ganadero/operacion-nueva',kindOperation]);
	}
}
