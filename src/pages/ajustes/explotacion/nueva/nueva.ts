
import {NavController,NavParams,ToastController,Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {ServicioDatos} from '../../../../servicios/serviciodatos';
import {Explotacion} from '../../../../servicios/beans/explotacion';
import {AuthService} from '../../../../servicios/auth/auth';
import {Constantes} from '../../servicios/constantes';

@Component({
	templateUrl: 'nueva.html',
})
export class DetalleExplotacion {
	
	explotacion:Explotacion;


	constructor(public navCtrl: NavController,  params: NavParams,public servicio: ServicioDatos,
				private toastCtrl: ToastController,public auth: AuthService,public plt: Platform) {
		this.explotacion=params.get("explotacion");
	}

	ngOnInit() {
		if (this.explotacion){
			this.explotacion=new Explotacion();
		}
	}

	protected salir(){
	    this.auth.logout();
     	this.plt.exitApp();
	}

	protected guardaDatosExplotacion(){


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