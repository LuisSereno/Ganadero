
import {NavController,NavParams,ToastController,Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {ServicioDatos} from '../../../../servicios/serviciodatos';
import {Explotacion} from '../../../../servicios/beans/explotacion';
import {Usuario} from '../../../../servicios/beans/usuario';
import {AuthService} from '../../../../servicios/auth/auth';
import {Constantes} from '../../servicios/constantes';
import {ListaGanado} from '../../../listadoGanado/listado';
import { PerfilAutenticacion } from '../../../profile/profile';

@Component({
	templateUrl: 'nueva.html',
})
export class DetalleExplotacion {
	
	explotacion:Explotacion;


	constructor(public navCtrl: NavController,  params: NavParams,public servicio: ServicioDatos,
				private toastCtrl: ToastController,public auth: AuthService,public plt: Platform) {
	}

	ngOnInit() {
		this.explotacion=new Explotacion();
	}

	protected salir(){
	    this.auth.logout();
     	this.plt.exitApp();
	}

	protected guardaDatosExplotacion(){
		this.explotacion.setUsuario(this.servicio.getUsuario());
		this.servicio.guardaExplotacion(this.explotacion).then(data => {
             if (data){
              this.servicio.setExplotacion(data);
              console.log("Hay clave de guardado");
              this.navCtrl.setRoot(ListaGanado);
             }else{
               console.log("No hay clave de guardado");
               this.navCtrl.setRoot(PerfilAutenticacion);
             }
          },err => {
              console.log("Errr al guardar los datos del Usuario!");
              this.navCtrl.setRoot(PerfilAutenticacion);
          });
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