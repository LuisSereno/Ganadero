
import {NavController,NavParams,ToastController} from 'ionic-angular';
import { Component } from '@angular/core';
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Animal} from '../../servicios/beans/animal'
import {ServicioDatos} from '../../servicios/serviciodatos';

@Component({
	templateUrl: 'detalle.html'
})
export class Detalle {
	
	animal:Animal;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	arrayDescendencia:Array<Animal>;

	arrayAscendencia:Array<Animal>;

	constructor(public navCtrl: NavController,  params: NavParams,public servicio: ServicioDatos,
				private toastCtrl: ToastController) {
		this.animal=params.get("animal");
		this.arrayDescendencia=new Array<Animal>();
		this.arrayAscendencia=new Array<Animal>();
		this.fechaNacimiento="";
		this.fechaUltimoNacimiento="";
	}

	ngOnInit() {
		if (this.animal){
			let fechaFormateada=this.animal.getFechaNacimiento();
			this.fechaNacimiento= fechaFormateada ? fechaFormateada.toISOString() : '';
			if(this.animal instanceof Hembra){
				let fechaUltNacFormateada=this.animal.getFechaUltimoNacimiento();
				this.fechaUltimoNacimiento=fechaUltNacFormateada ? fechaUltNacFormateada.toISOString() : '';
			}else{
				this.fechaUltimoNacimiento="";
			}
			
			this.arrayAscendencia=this.servicio.getBusquedaAscDesc(this.animal.getAscendencia());
			this.arrayDescendencia=this.servicio.getBusquedaAscDesc(this.animal.getDescendencia());			
		}

	}

	protected irDetalleDesdeDetalle(animalito:Animal){
		this.navCtrl.push(Detalle,{animal:animalito});
	}

	protected devuelveColorBadge(tipoObjeto:any):String{
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
	}

	protected volver(){
		this.navCtrl.pop();
	}

	protected modificaDatosAnimal(){

		this.animal.setDescendencia(this.arrayDescendencia);
		this.animal.setAscendencia(this.arrayAscendencia);
		this.animal.setFechaNacimiento(new Date(String(this.fechaNacimiento)));
		if(this.animal instanceof Hembra){
			this.animal.setFechaUltimoNacimiento(new Date(String(this.fechaUltimoNacimiento)));
		}

        console.log("Animal!!!" + this.animal);
		let correcto=this.servicio.guardaModificaAnimal(false,this.animal);
		if (correcto){
			this.presentToast("Guardado correcto");
		}else{
			this.presentToast("Error al guardar");
		}
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

	isInstanceOfHembra(objeto:Animal):boolean{
		return objeto instanceof Hembra;
	}
	
}