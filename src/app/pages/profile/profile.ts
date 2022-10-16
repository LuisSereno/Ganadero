import { NavController } from '@ionic/angular';
import { Usuario } from './../../servicios/beans/usuario';
import {Component} from '@angular/core';
import {CustomAuthService} from '../../servicios/auth/auth';
// import {ListaGanado} from '../listadoGanado/listado';
// import {ServicioDatos} from '../../servicios/serviciodatos';
import {HomePage} from '../home/home.page';
// import { AuthService } from 'src/app/servicios/auth/auth';
import { Router } from '@angular/router';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import {Location} from '@angular/common';



@Component({
  templateUrl: 'profile.html'
})
export class PerfilAutenticacion {

	isLoggedIn=false;
	// We need to inject AuthService so that we can
	// use it in the view,public servicio: ServicioDatos
	constructor(private router: Router, private user:UsuarioServicio,
		private navCtrl: NavController, protected auth:CustomAuthService) {
		 console.log('ENTRA AQUI EN PROFILE');
	}

	HAY QUE PONER QUE ENTRE Y COMPRUEBRE SI ESTAS LOGADO CADA VEZ QUE ESTE EN ESTA PANTALLA

	ionViewWillEnter (){
		console.log('ENTRA AQUI EN PROFILE ionViewWillEnter');

		this.auth.isAuthenticated().then(data=>(this.isLoggedIn=data));
	}

	logearse(){
		console.log('logearse');
		this.auth.loginNew();
	}

	logout(){
		console.log('deslogearse');
		this.auth.logout();
	}

}

