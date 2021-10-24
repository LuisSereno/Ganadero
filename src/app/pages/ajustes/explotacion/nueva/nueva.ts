import { IEExplotacion } from './../../../../servicios/beans/interfaces/explotacion.interface';
import { IEIdentification } from './../../../../servicios/beans/interfaces/identification.interface';

import { Component } from '@angular/core';
import { ServicioDatos } from '../../../../servicios/serviciodatos';
import { Explotacion } from '../../../../servicios/beans/explotacion';
//import {Usuario} from '../../../../servicios/beans/usuario';
//import {AuthService} from '../../../../servicios/auth/auth';
//import {Constantes} from '../../servicios/constantes';
import { ListaGanado } from '../../../listadoGanado/listado';
import { PerfilAutenticacion } from '../../../profile/profile';
import { Router, ActivatedRoute } from '@angular/router';
import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import {Location} from '@angular/common';
import { Constantes } from 'src/app/servicios/genericos/constantes';
import { ToastService } from 'src/app/servicios/genericos/mensajeToast';

@Component({
	templateUrl: 'nueva.html',
})
export class DetalleExplotacion {

	explota: Explotacion;

	edicion:boolean;


	constructor(private location: Location, private params: ActivatedRoute,
		private router: Router, private user: UsuarioServicio,
		private explotacion: ExplotacionServicio, private toastCtrl: ToastService) {
	}

	ngOnInit() {
		this.edicion=JSON.parse(this.params.snapshot.paramMap.get('es_edicion'));
		if(this.explotacion.explotacionSeleccionada){
			this.explota=this.explotacion.encontrarExplotacion(this.explotacion.explotacionSeleccionada);
		}else{
			this.explota = new Explotacion();
		}
	}

	protected salir() {
		//this.auth.logout();
		navigator['app'].exitApp();
	}

	protected guardaDatosExplotacion() {

		if (this.edicion){
			console.log("es una edicion");
			this.explotacion.actualizarExplotacion(this.explota).then(data => {
				if (data) {
					console.log("Los datos han sido actualizados");
					this.toastCtrl.push("Modificación correcta", "CORRECTO");
				}else{
					this.toastCtrl.push("No se han actualizado los datos", "WARNING");
				}
			}, err => {
				console.log("No se han podido actualizar los datos");
				this.toastCtrl.push("Error al modificar", "ERROR");
			});
		}else{
			console.log("es una nueva explotacion");
			let idUSuario: IEIdentification = { id: this.user.usuario.id };
			this.explota.usuarios = new Array<IEIdentification>();
			this.explota.usuarios.push(idUSuario);
			this.explotacion.guardaExplotacion(this.explota).then(data => {
				if (data) {
					if (!this.explotacion.explotaciones) {
						this.explotacion.explotaciones = new Array<IEExplotacion>();

					}
					this.explotacion.explotaciones.push(data);
					let idExplotacion: IEIdentification = { id: data.id };
					if (!this.user.usuario.explotaciones || this.user.usuario.explotaciones.length == 0) {
						this.user.usuario.explotaciones = new Array<IEIdentification>();
					}
					this.user.usuario.explotaciones.push(idExplotacion)
					this.user.actualizarUsuario(this.user.usuario).then(() => {
						this.router.navigate(['ganadero/listado-explotaciones']);
					}).catch(err => {
						console.log("No se guardo la parcela con el usuario", err);
					});
					console.log("Hay clave de guardado");

				} else {
					console.log("No hay clave de guardado");
					this.router.navigate(['ganadero/perfil-autenticacion']);
				}
			}, err => {
				console.log("Errr al guardar los datos del Usuario!");
				this.router.navigate(['ganadero/perfil-autenticacion']);
			});
		}
	}

	protected cambiaExplotacion(){
		this.router.navigate(['ganadero/listado-explotaciones']);
	}

	protected cambiarVacunas(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.VACUNA ]);
   	}

   	protected cambiarEnfermedad(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.ENFERMEDAD]);
	}
}