import { IEAnimal } from './../../../servicios/beans/interfaces/animal.interface';
import { Component } from '@angular/core';
import {Animal} from '../../../servicios/beans/animal'
import {Venta} from '../../../servicios/beans/venta'
import {Compra} from '../../../servicios/beans/compra'
import {Operacion} from '../../../servicios/beans/operacion'
import {ServicioCompraVenta} from '../../../servicios/servicioCompraVenta';
//import {Constantes} from '../../../servicios/constantes';
import {ServicioDatos} from '../../../servicios/serviciodatos';
import {ToastService} from '../../../servicios/genericos/mensajeToast';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'listadoAnimalesVendidos.html'
})
export class ListadoAnimalesVendidos {

	arrayAnimales: Array<IEAnimal>;

	operacion:Operacion;

  	constructor(public navCtrl: Router,params: ActivatedRoute,public servicioDatos: ServicioDatos,
				  protected servicio: ServicioCompraVenta,private toastCtrl: ToastService,
				  private location: Location) {

  		this.arrayAnimales=JSON.parse(params.snapshot.queryParams.animalesSeleccionados);
  		this.operacion=JSON.parse(params.snapshot.queryParams.operacion);
  		this.sumarCantidad();
  		this.servicio.esCompra(false);
	}


	public volver(){
		this.location.back();
	}

	public enviarOperacion(){
		this.operacion.animales = this.arrayAnimales;

		if (!(this.operacion.fechaOperacion instanceof Date)){
			this.operacion.fechaOperacion = new Date(this.operacion.fechaOperacion);
		}


		let correcto:boolean=this.servicio.crearOperacion(this.operacion);

		if (correcto){
			this.toastCtrl.push("Guardado correcto","CORRECTO");
			this.navCtrl.navigate(['']);
		}else{
			this.toastCtrl.push("Error al guardar","ERROR");
		}

	}

	isInstanceOfVenta(objeto:Operacion):boolean{
		return objeto instanceof Venta;
	}

	public sumarCantidad(){
		var suma:number=0;
		if (this.operacion instanceof Venta){
			for (let anim of this.arrayAnimales){
				let valor:number=anim.precioVenta;
				if (valor){
					suma= suma + valor;
				}
			}
		}else if (this.operacion instanceof Compra){
			for (let anim of this.arrayAnimales){
				let valor:number=anim.precioCompra;
				if (valor){
					suma= suma + valor;
				}
			}
		}

		this.operacion.precio= suma;
	}


	public comprobarCampos(){
		if (!this.operacion.agrupacion){
			return false;
		}

		if (!this.operacion.fechaOperacion){
			return false;
		}

		if(this.operacion.precio && this.operacion instanceof Venta){
			if (this.arrayAnimales){
				for (let anim of this.arrayAnimales){
					let valor:number=anim.precioVenta;
					if (!valor){
						return false;
					}
				}
			}
		}

		return true;
	}

}
