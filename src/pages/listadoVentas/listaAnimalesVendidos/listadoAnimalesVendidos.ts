import { Component } from '@angular/core';
import {Animal} from '../../../servicios/beans/animal'
import {Venta} from '../../../servicios/beans/venta'
import { NavController,NavParams,ToastController } from 'ionic-angular';
import {ServicioCompraVenta} from '../../../servicios/servicioCompraVenta';
import {Constantes} from '../../../servicios/constantes';
import {ServicioDatos} from '../../../servicios/serviciodatos';


@Component({
  templateUrl: 'listadoAnimalesVendidos.html'
})
export class ListadoAnimalesVendidos {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "hembras";

	arrayAnimales: Array<Animal>;

	venta:Venta;

	public servicio: ServicioCompraVenta;

  	constructor(public navCtrl: NavController,params: NavParams,public servicioDatos: ServicioDatos,private toastCtrl: ToastController) {

  		this.arrayAnimales=params.get("animalesSeleccionados");	
  		this.venta=new Venta(null,null,null,null,null);
  		this.sumarCantidad();
  		this.servicio=new ServicioCompraVenta(false,servicioDatos);
	}		


	protected volver(){
		this.navCtrl.pop();
	}

	protected enviarVenta(){
		this.venta.setAnimales(this.arrayAnimales);

		if (!(this.venta.getFecha() instanceof Date)){
			this.venta.setFecha(new Date(this.venta.getFecha()));
		}


		let correcto:boolean=this.servicio.crearVenta(this.venta);
	
		if (correcto){
			this.presentToast("Guardado correcto");
			this.navCtrl.popToRoot();
		}else{
			this.presentToast("Error al guardar");
		}

	}	


	protected sumarCantidad(){
		var suma:number=0;
		for (let anim of this.arrayAnimales){
			let valor:number=anim.getPrecioVenta();
			if (valor){
				suma= suma + valor;
			}
		}
		this.venta.setPrecio(suma);
	}


	protected comprobarCampos(){
		if (!this.venta.getAgrupacion()){
			return false;
		}

		if (!this.venta.getFecha()){
			return false;
		}

		if(this.venta.getPrecio()){
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
