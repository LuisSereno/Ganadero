import { UsuarioServicio } from './../../servicios/usuario.service';
import { Constantes } from './../../servicios/genericos/constantes';
import { GanadoServicio } from './../../servicios/ganado.service';
import { Component, ViewChild } from '@angular/core';
import { Hembra } from '../../servicios/beans/hembra'
import { Macho } from '../../servicios/beans/macho'
import { Animal } from '../../servicios/beans/animal'
// import {ListVacEnf} from '../listadoVacunasEnfermedades/listaVacunasEnfermedades'
import { ToastService } from '../../servicios/genericos/mensajeToast';
import { ActivatedRoute, Router } from '@angular/router';
import { IEAnimal } from 'src/app/servicios/beans/interfaces/animal.interface';
// import {AscDesc} from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia'
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UploadFileComponent } from '../upload-file-component/upload-file-component';

@Component({
	templateUrl: 'detalle.html',
	styleUrls: ['./detalle.scss'],
})
export class Detalle {

	animal: Animal;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	formularioAnimal: FormGroup;

	@ViewChild(UploadFileComponent) childUploadFile:UploadFileComponent;

	public submitAttempt = false;

	constructor(private router: Router, private params: ActivatedRoute, public servicio: GanadoServicio,
		private toastCtrl: ToastService, private usuario: UsuarioServicio, private location: Location,
		private formBuilder: FormBuilder) {

	}

	ngOnInit() {
		this.animal = new Hembra(null, null, null, null, null, null, null, null, null, null, null, null, null,null, false,null);
		this.fechaNacimiento = '';
		this.fechaUltimoNacimiento = '';
		this.formularioAnimal = this.formBuilder.group({
			numero: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			alias: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			raza: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			fechaNacimiento: ['value', Validators.compose([Validators.required])]
		});
	}

	ionViewWillEnter() {
		const animalInterface: IEAnimal = this.servicio.encontrarAnimal({ id: this.params.snapshot.paramMap.get('id') })
		if (animalInterface.sexo === Constantes.MACHO) {
			this.animal = Macho.fromJSON(animalInterface);
		} else {
			this.animal = Hembra.fromJSON(animalInterface);
		}

		if (this.animal) {
			const fechaFormateada = this.animal.getFechaNacimiento();
			this.fechaNacimiento = fechaFormateada ? fechaFormateada.toISOString() : '';
			if (this.animal instanceof Hembra) {
				const fechaUltNacFormateada = this.animal.getFechaUltimoNacimiento();
				this.fechaUltimoNacimiento = fechaUltNacFormateada ? fechaUltNacFormateada.toISOString() : '';
			} else {
				this.fechaUltimoNacimiento = '';
			}
			if (this.animal.descendenciaIds) {
				for (const desc of this.animal.descendenciaIds) {
					if (!this.animal.descendencia) {
						this.animal.descendencia = new Array<IEAnimal>();
					}
					this.animal.descendencia.push(this.servicio.encontrarAnimal({ id: desc }));
				}
			}
			if (this.animal.ascendenciaIds) {
				for (const asc of this.animal.ascendenciaIds) {
					if (!this.animal.ascendencia) {
						this.animal.ascendencia = new Array<IEAnimal>();
					}
					this.animal.ascendencia.push(this.servicio.encontrarAnimal({ id: asc }));
				}
			}
		}
	}
	/*
		ngAfterContentInit() {
			console.log("ENTRA EN EL ionViewDidLoad");
			if (this.animal){
				let fechaFormateada=this.animal.getFechaNacimiento();
				this.fechaNacimiento= fechaFormateada ? fechaFormateada.toISOString() : '';
				if(this.animal instanceof Hembra){
					let fechaUltNacFormateada=this.animal.getFechaUltimoNacimiento();
					this.fechaUltimoNacimiento=fechaUltNacFormateada ? fechaUltNacFormateada.toISOString() : '';
				}else{
					this.fechaUltimoNacimiento="";
				}

				this.arrayAscendencia=this.servicio.getBusquedaAscDesc(this.animal.ascendencia?this.animal.ascendencia:this.animal.ascendenciaIds);
				this.arrayDescendencia=this.servicio.getBusquedaAscDesc(this.animal.descendencia?this.animal.descendencia:this.animal.descendenciaIds);
				console.log("ANTES DE ASIGNAR ARRAYASCENDENCIA Y ARRAYDESCENDENCIA");
				console.log(this.arrayAscendencia);
				console.log(this.arrayDescendencia);
				this.animal.setAscendencia(this.arrayAscendencia);
				this.animal.setDescendencia(this.arrayDescendencia);
			}

		}
	*/
	public irDetalleDesdeDetalle(animalito: Animal) {
		this.router.navigate(['animal-detalle', { animal: animalito }]);
	}

	public devuelveColorBadge(tipoObjeto: any): String {
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
	}

	public volver() {
		this.location.back();
	}

	public modificaDatosAnimal() {
		this.submitAttempt = true;
		if(this.animal.descendencia){
			for(const animId of this.animal.descendencia){
				if(!this.animal.descendenciaIds){
					this.animal.descendenciaIds=new Array<string>();
				}
				this.animal.descendenciaIds.push(animId.id);
			}
			this.animal.descendenciaIds.splice(0, this.animal.descendenciaIds.length, ...(new Set(this.animal.descendenciaIds)))
		}
		if(this.animal.ascendencia){
			for(const animId of this.animal.ascendencia){
				if(!this.animal.ascendenciaIds){
					this.animal.ascendenciaIds=new Array<string>();
				}
				this.animal.ascendenciaIds.push(animId.id);
			}
			this.animal.ascendenciaIds.splice(0, this.animal.ascendenciaIds.length, ...(new Set(this.animal.ascendenciaIds)))
		}
		this.animal.metadatoFechaMod = new Date();
		this.animal.metadatoEmail = this.usuario.usuario.email;
		this.animal.setFechaNacimiento(this.fechaNacimiento ? new Date(String(this.fechaNacimiento)) : null);
		if (this.animal instanceof Hembra) {
			this.animal.setFechaUltimoNacimiento(this.fechaUltimoNacimiento ? new Date(String(this.fechaUltimoNacimiento)) : null);
		}

		const promise:Promise<boolean>=this.uploadPhoto();

        promise.then(doUpdate=>{
            if (doUpdate){
				this.updateAnimal();
            }
        });

	}

	private updateAnimal() {
		const correcto = this.servicio.actualizarAnimal(this.animal, true);

		if (correcto) {
			this.toastCtrl.push('Modificación correcta', 'CORRECTO');
		} else {
			this.toastCtrl.push('Error al modificar', 'ERROR');
		};
	}

	private uploadPhoto(): Promise<boolean> {
		return new Promise((resolve, reject) => {

			if (this.childUploadFile.currentFileUpload) {
				this.childUploadFile.save().then(result => {
					if (result) {
						if (this.animal.foto != null && this.animal.foto.length === 3) {
							this.toastCtrl.push('No puedes tener más de 3 fotos por animal', 'WARNING');
						} else {
							if (this.animal.foto == null) {
								this.animal.foto = new Array<string>();
								this.animal.setFoto(new Array<string>());
							}
							this.animal.foto.push(this.childUploadFile.currentFileUpload.url);
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

	isInstanceOfHembra(objeto: Animal): boolean {
		return objeto instanceof Hembra;
	}

	public getFotoAnimal() {
		if (this.animal.foto) {
			return this.animal.foto;
		} else if (this.animal.id!=null){
			if (this.animal instanceof Macho) {
				return [Constantes.FOTO_ANIMAL_MACHO_DEFECTO];
			} else if (this.animal instanceof Hembra) {
				return [Constantes.FOTO_ANIMAL_HEMBRA_DEFECTO];
			}
		}
	}

	/*	anadirElementoEnfermedad(elemento:HTMLInputElement){
			if (elemento.value!=""){
					if (this.animal.getEnfermedades()==null){
						this.animal.setEnfermedades(new Array<string>());
					}
					this.animal.getEnfermedades().push(elemento.value);
					elemento.value=null;
			}
		}

		anadirElementoVacunas(elemento:HTMLInputElement){
			if (elemento.value!=""){
					if (this.animal.getVacunas()==null){
						this.animal.setVacunas(new Array<string>());
					}
					this.animal.getVacunas().push(elemento.value);
					elemento.value=null;
			}
		}*/

	anadirDescendencia(sexo: number) {
		if (this.animal.id) {
			this.router.navigate(['ganadero/animal-nuevo'], {
				queryParams: {
					explotacionID: null,
					animalID: this.animal.id,
					sexo
				}
			});
		} else {
			this.toastCtrl.push('Guarda primero el animal actual', 'WARNING');
		}
	}

	public cambiarVacunas(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.VACUNA, {'id-animal':this.animal.id}]);
   	}

   	public cambiarEnfermedad(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.ENFERMEDAD, {'id-animal':this.animal.id}]);
	}

	public deletePhoto(urlPhoto:string){
		// actualizamos el animal
		if (this.animal.getFoto()){
			const indexFinded:number=this.animal.getFoto().findIndex(photo=>photo===urlPhoto);
			if (indexFinded > -1) {
				this.animal.getFoto().splice(indexFinded, 1);
				this.updateAnimal();
			}
		}


	}


}