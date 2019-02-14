import { Component } from '@angular/core';
import {Animal} from '../../../servicios/beans/animal'
import {Venta} from '../../../servicios/beans/venta'
import {Compra} from '../../../servicios/beans/compra'
import {Operacion} from '../../../servicios/beans/operacion'
import { NavController,NavParams } from 'ionic-angular';
import {ServicioCompraVenta} from '../../../servicios/servicioCompraVenta';
//import {Constantes} from '../../../servicios/constantes';
import {ServicioDatos} from '../../../servicios/serviciodatos';
import {ToastService} from '../../../servicios/mensajeToast';

@Component({
  templateUrl: 'listadoAnimalesVendidos.html'
})
export class ListadoAnimalesVendidos {

	arrayAnimales: Array<Animal>;

	operacion:Operacion;

  	constructor(public navCtrl: NavController,params: NavParams,public servicioDatos: ServicioDatos,
  				protected servicio: ServicioCompraVenta,private toastCtrl: ToastService) {

  		this.arrayAnimales=params.get("animalesSeleccionados");	
  		this.operacion=params.get("operacion");			
  		this.sumarCantidad();
  		this.servicio.esCompra(false);
	}		


	protected volver(){
		this.navCtrl.pop();
	}

	protected enviarOperacion(){
		this.operacion.setAnimales(this.arrayAnimales);

		if (!(this.operacion.getFechaOperacion() instanceof Date)){
			this.operacion.setFechaOperacion(new Date(this.operacion.getFechaOperacion()));
		}


		let correcto:boolean=this.servicio.crearOperacion(this.operacion);
	
		if (correcto){
			this.toastCtrl.push("Guardado correcto","CORRECTO");
			this.navCtrl.popToRoot();
		}else{
			this.toastCtrl.push("Error al guardar","ERROR");
		}

	}	

	isInstanceOfVenta(objeto:Operacion):boolean{
		return objeto instanceof Venta;
	}

	protected sumarCantidad(){
		var suma:number=0;
		if (this.operacion instanceof Venta){
			for (let anim of this.arrayAnimales){
				let valor:number=anim.getPrecioVenta();
				if (valor){
					suma= suma + valor;
				}
			}
		}else if (this.operacion instanceof Compra){
			for (let anim of this.arrayAnimales){
				let valor:number=anim.getPrecioCompra();
				if (valor){
					suma= suma + valor;
				}
			}
		}
		
		this.operacion.setPrecio(suma);
	}


	protected comprobarCampos(){
		if (!this.operacion.getAgrupacion()){
			return false;
		}

		if (!this.operacion.getFechaOperacion()){
			return false;
		}

		if(this.operacion.getPrecio() && this.operacion instanceof Venta){
			if (this.arrayAnimales){
				for (let anim of this.arrayAnimales){
					let valor:number=anim.getPrecioVenta();
					if (!valor){
						return false;
					}
				}
			}
		}

		return true;
	}

}
