import { UsuarioServicio } from './../../servicios/usuario.service';
import { Constantes } from './../../servicios/genericos/constantes';
import { GanadoServicio } from './../../servicios/ganado.service';
import { Component } from '@angular/core';
import { Hembra } from '../../servicios/beans/hembra'
import { Macho } from '../../servicios/beans/macho'
import { Animal } from '../../servicios/beans/animal'
import { ServicioDatos } from '../../servicios/serviciodatos';
//import {ListVacEnf} from '../listadoVacunasEnfermedades/listaVacunasEnfermedades'
import { ToastService } from '../../servicios/genericos/mensajeToast';
import { ActivatedRoute, Router } from '@angular/router';
import { IEAnimal } from 'src/app/servicios/beans/interfaces/animal.interface';
//import {AscDesc} from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia'
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	templateUrl: 'detalle.html',
	styleUrls: ['./detalle.scss'],
})
export class Detalle {

	animal: Animal;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	formularioAnimal: FormGroup;

	public submitAttempt: boolean = false;

	constructor(private router: Router, private params: ActivatedRoute, protected servicio: GanadoServicio,
		private toastCtrl: ToastService, private usuario: UsuarioServicio, private location: Location,
		private formBuilder: FormBuilder) {

	}

	ngOnInit() {
		this.animal = new Hembra(null, null, null, null, null, null, null, null, null, null, null, null, null,null, false);
		this.fechaNacimiento = "";
		this.fechaUltimoNacimiento = "";
		this.formularioAnimal = this.formBuilder.group({
			numero: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			alias: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			raza: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			fechaNacimiento: ['value', Validators.compose([Validators.required])]
		});
	}

	ionViewWillEnter() {
		let animalInterface: IEAnimal = this.servicio.encontrarAnimal({ id: this.params.snapshot.paramMap.get('id') })
		if (animalInterface.sexo === Constantes.MACHO) {
			this.animal = Macho.fromJSON(animalInterface);
		} else {
			this.animal = Hembra.fromJSON(animalInterface);
		}

		if (this.animal) {
			let fechaFormateada = this.animal.getFechaNacimiento();
			this.fechaNacimiento = fechaFormateada ? fechaFormateada.toISOString() : '';
			if (this.animal instanceof Hembra) {
				let fechaUltNacFormateada = this.animal.getFechaUltimoNacimiento();
				this.fechaUltimoNacimiento = fechaUltNacFormateada ? fechaUltNacFormateada.toISOString() : '';
			} else {
				this.fechaUltimoNacimiento = "";
			}
			if (this.animal.descendenciaIds) {
				for (let desc of this.animal.descendenciaIds) {
					if (!this.animal.descendencia) {
						this.animal.descendencia = new Array<IEAnimal>();
					}
					this.animal.descendencia.push(this.servicio.encontrarAnimal({ id: desc }));
				}
			}
			if (this.animal.ascendenciaIds) {
				for (let asc of this.animal.ascendenciaIds) {
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
	protected irDetalleDesdeDetalle(animalito: Animal) {
		this.router.navigate(['animal-detalle', { animal: animalito }]);
	}

	protected devuelveColorBadge(tipoObjeto: any): String {
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
	}

	protected volver() {
		this.location.back();
	}

	protected modificaDatosAnimal() {
		this.submitAttempt = true;
		if(this.animal.descendencia){
			for(let animId of this.animal.descendencia){
				if(!this.animal.descendenciaIds){
					this.animal.descendenciaIds=new Array<string>();
				}
				this.animal.descendenciaIds.push(animId.id);
			}
			this.animal.descendenciaIds.splice(0, this.animal.descendenciaIds.length, ...(new Set(this.animal.descendenciaIds)))
		}
		if(this.animal.ascendencia){
			for(let animId of this.animal.ascendencia){
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
		let correcto = this.servicio.actualizarAnimal(this.animal,true);

		if (correcto) {
			this.toastCtrl.push("Modificación correcta", "CORRECTO");
		} else {
			this.toastCtrl.push("Error al modificar", "ERROR");
		};
	}

	isInstanceOfHembra(objeto: Animal): boolean {
		return objeto instanceof Hembra;
	}

	protected getFotoAnimal() {
		if (this.animal.foto) {
			return this.animal.foto;
		} else {
			if (this.animal instanceof Macho) {
				return "assets/img/toro.png";
			} else {
				return "assets/img/vaca.png";
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
					"explotacionID": null,
					"animalID": this.animal.id,
					"sexo": sexo
				}
			});
		} else {
			this.toastCtrl.push("Guarda primero el animal actual", "WARNING");
		}
	}

	protected cambiarVacunas(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.VACUNA, {'id-animal':this.animal.id}]);
   	}

   	protected cambiarEnfermedad(){
		this.router.navigate(['ganadero/listado-vacunasenfermedades', Constantes.ENFERMEDAD, {'id-animal':this.animal.id}]);
	}
}