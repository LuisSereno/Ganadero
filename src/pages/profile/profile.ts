// app/pages/profile/profile.ts
import { NavController } from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthService} from '../../servicios/auth/auth';
//import {ListaGanado} from '../listadoGanado/listado';
//import {ServicioDatos} from '../../servicios/serviciodatos';
import {MyApp} from '../../app/app.component';

@Component({
  templateUrl: 'profile.html'
})
export class PerfilAutenticacion {
  
	// We need to inject AuthService so that we can
	// use it in the view,public servicio: ServicioDatos
	constructor(private navCtrl: NavController,public auth: AuthService) {
		 console.log("ENTRA AQUI EN PROFILE");
	}

	logearse(){
	    if(!this.auth.isAuthenticated()) {
	       this.auth.login().then(data => {
	          console.log("El valor que retorna login es");
	          console.log(data);
	          this.navCtrl.setRoot(MyApp);
	        },err => {
	            console.log("Errr al obtener los datos del Usuario!");
	        });
	    }else{
	      this.navCtrl.setRoot(MyApp);
	    }
	}


}

