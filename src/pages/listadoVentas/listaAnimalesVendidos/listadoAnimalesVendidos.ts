import { Component } from '@angular/core';
import {Animal} from '../../../servicios/beans/animal'
import {Venta} from '../../../servicios/beans/venta'
import {Compra} from '../../../servicios/beans/compra'
import {Operacion} from '../../../servicios/beans/operacion'
import { NavController,NavParams,ToastController } from 'ionic-angular';
import {ServicioCompraVenta} from '../../../servicios/servicioCompraVenta';
import {Constantes} from '../../../servicios/constantes';
import {ServicioDatos} from '../../../servicios/serviciodatos';


@Component({
  templateUrl: 'listadoAnimalesVendidos.html'
})
export class ListadoAnimalesVendidos {

	arrayAnimales: Array<Animal>;

	operacion:Operacion;

	public servicio: ServicioCompraVenta;

  	constructor(public navCtrl: NavController,params: NavParams,public servicioDatos: ServicioDatos,private toastCtrl: ToastController) {

  		this.arrayAnimales=params.get("animalesSeleccionados");	
  		this.operacion=params.get("operacion");			
  		this.sumarCantidad();
  		this.servicio=new ServicioCompraVenta(false,servicioDatos);
	}		


	protected volver(){
		this.navCtrl.pop();
	}

	protected enviarOperacion(){
		this.operacion.setAnimales(this.arrayAnimales);

		if (!(this.operacion.getFecha() instanceof Date)){
			this.operacion.setFecha(new Date(this.operacion.getFecha()));
		}


		let correcto:boolean=this.servicio.crearOperacion(this.operacion);
	
		if (correcto){
			this.presentToast("Guardado correcto");
			this.navCtrl.popToRoot();
		}else{
			this.presentToast("Error al guardar");
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

		if (!this.operacion.getFecha()){
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


	presentToast(mensaje:string) {
	  let toast = this.toastCtrl.create({
	    message: mensaje,
	      duration: 15000,
	      showCloseButton: true,
	      closeButtonText: 'Cerrar',
	      dismissOnPageChange: true,
	      cssClass: "toast-success"
	  });

	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  toast.present();
	}
}
