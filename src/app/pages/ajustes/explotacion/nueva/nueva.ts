import { IEExplotacion } from './../../../../servicios/beans/interfaces/explotacion.interface';
import { IEIdentification } from './../../../../servicios/beans/interfaces/identification.interface';

import { Component, ViewChild } from '@angular/core';
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
import { GanadoServicio } from 'src/app/servicios/ganado.service';
import { IEAnimal } from 'src/app/servicios/beans/interfaces/animal.interface';
import { Macho } from 'src/app/servicios/beans/macho';
import { Hembra } from 'src/app/servicios/beans/hembra';
import { UploadFileComponent } from 'src/app/pages/upload-file-component/upload-file-component';

@Component({
	templateUrl: 'nueva.html',
})
export class DetalleExplotacion {

	explota: Explotacion;

	edicion:boolean;

	numHembras:number;

	numMachos:number;

	numTotal:number;

	@ViewChild(UploadFileComponent) childUploadFile:UploadFileComponent;

	constructor(private location: Location, private params: ActivatedRoute,
		private router: Router, private user: UsuarioServicio,
		private explotacion: ExplotacionServicio, private toastCtrl: ToastService,
		public ganadoServicio: GanadoServicio) {
	}

	ngOnInit() {
		console.log("ngOnInit");
		this.numHembras=0;
		this.numMachos=0;
		this.numTotal=0;
		this.explota = new Explotacion();
	}
	ionViewWillEnter() {
		console.log("ionViewWillEnter");
		this.edicion=JSON.parse(this.params.snapshot.paramMap.get('es_edicion'));
		if(this.edicion==true && this.explotacion.explotacionSeleccionada){
			this.explota=this.explotacion.encontrarExplotacion(this.explotacion.explotacionSeleccionada);
			if (this.explota.arrayIdAnimales!=null && this.explota.arrayIdAnimales.length>0){
				if (this.explota.arrayHembras!=null && this.explota.arrayHembras.length>0
					&& this.explota.arrayMachos!=null && this.explota.arrayMachos.length>0){
						this.numMachos= this.explota.arrayMachos.length;
						this.numHembras= this.explota.arrayHembras.length;
						this.numTotal=this.numHembras+this.numMachos;
				}else{
					this.ganadoServicio.obtenerDatosGanadoIds(this.explota.arrayIdAnimales, "baja", "false")
					.then((data:IEAnimal[]) => {
						this.explota.arrayMachos=new Array<IEAnimal>();
						this.explota.arrayHembras=new Array<IEAnimal>();
						for(let animal of data){
							if(animal){
								if (animal.sexo==Constantes.MACHO){
									let macho:Macho;
									macho=Macho.fromJSON(animal);
									this.explota.arrayMachos.push(macho);
								}else{
									let hembra:Hembra;
									hembra=Hembra.fromJSON(animal);

									this.explota.arrayHembras.push(hembra);
								}
							}
						}
						this.ganadoServicio.ganado=data;
						this.numMachos= this.explota.arrayMachos.length;
						this.numHembras= this.explota.arrayHembras.length;
						this.numTotal=this.numHembras+this.numMachos;
					})
				}
			}

		}
	}


	public salir() {
		//this.auth.logout();
		navigator['app'].exitApp();
	}

	public guardaDatosExplotacion() {

		const promise:Promise<boolean>=this.uploadPhoto();

        promise.then(doUpdate=>{
            if (doUpdate){
				if (this.edicion){
					console.log("es una edicion");
					this.explotacion.actualizarExplotacion(Explotacion.fromJSON(this.explota)).then(data => {
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
        });
	}

	public cambiaExplotacion(){
		this.router.navigate(['ganadero/listado-explotaciones']);
	}

	public cambiarVacunas(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.VACUNA ]);
   	}

   	public cambiarEnfermedad(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.ENFERMEDAD]);
	}

	public getFotoAnimal(hembra:boolean) {
		if (!hembra) {
			return Constantes.FOTO_ANIMAL_MACHO_DEFECTO;
		} else {
			return Constantes.FOTO_ANIMAL_HEMBRA_DEFECTO;
		}

	}

	public getFotoExplotacion() {
		if (this.explota && this.explota.foto) {
			return this.explota.foto;
		} else{
			return [Constantes.FOTO_EXPLPOTACION_DEFECTO];
		}
	}


	public deletePhoto(urlPhoto:string){
		// actualizamos el animal
		if (this.explota.foto){
			const indexFinded:number=this.explota.foto.findIndex(photo=>photo===urlPhoto);
			if (indexFinded > -1) {
				this.explota.foto.splice(indexFinded, 1);
				this.guardaDatosExplotacion();
			}
		}


	}

	private uploadPhoto(): Promise<boolean> {
		return new Promise((resolve, reject) => {

			if (this.childUploadFile.currentFileUpload) {
				this.childUploadFile.save().then(result => {
					if (result) {
						if (this.explota.foto != null && this.explota.foto.length === 3) {
							this.toastCtrl.push('No puedes tener más de 3 fotos por animal', 'WARNING');
						} else {
							if (this.explota.foto == null) {
								this.explota.foto = new Array<string>();
							}
							this.explota.foto.push(this.childUploadFile.currentFileUpload.url);
						}
					}
					resolve(true);
				}).catch(error => {
					this.toastCtrl.push(error.stack + '', 'WARNING');
					console.error(error);
					resolve(true);
				});
			} else {
				resolve(true);
			}
		});
	}
}