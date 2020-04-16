import { NavController } from '@ionic/angular';
import { Usuario } from './../../servicios/beans/usuario';
import {Component} from '@angular/core';
//import {AuthService} from '../../servicios/auth/auth';
//import {ListaGanado} from '../listadoGanado/listado';
//import {ServicioDatos} from '../../servicios/serviciodatos';
import {HomePage} from '../home/home.page';
import { AuthService } from 'src/app/servicios/auth/auth';
import { Router } from '@angular/router';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'profile.html'
})
export class PerfilAutenticacion {
  
	isLoggedIn:boolean=false;
	// We need to inject AuthService so that we can
	// use it in the view,public servicio: ServicioDatos
	constructor(private router: Router, public auth: AuthService, private user:UsuarioServicio,
		private navCtrl: NavController) {
		 console.log("ENTRA AQUI EN PROFILE");
		 this.isLoggedIn=auth.isAuthenticated();
	}

	logearse(){
		console.log("logearse");
	}
}

