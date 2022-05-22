import { Explotacion } from 'src/app/servicios/beans/explotacion';
import { Router, ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { OperacionServicio } from 'src/app/servicios/operacion.service';
import { ToastService } from 'src/app/servicios/genericos/mensajeToast';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';
import { Constantes } from 'src/app/servicios/genericos/constantes';
import { Macho } from 'src/app/servicios/beans/macho';
import { IEIdentification } from 'src/app/servicios/beans/interfaces/identification.interface';
import { VacunaServicio } from 'src/app/servicios/vacuna.service';
import { EnfermedadServicio } from 'src/app/servicios/enfermedad.service';
import { Vacuna } from 'src/app/servicios/beans/vacuna';
import { Enfermedad } from 'src/app/servicios/beans/enfermedad';

@Component({
	templateUrl: './detalleVacunaEnfermedad.html',
	styleUrls: ['./detalleVacunaEnfermedad.scss'],
	//	providers: [Diagnostic]
})
export class DetalleVacunaEnfermedad {

	vacunaEnf: any;

	formularioVacunaEnf: FormGroup;

	public submitAttempt: boolean = false;

	constructor(public navCtrl: Router, public params: ActivatedRoute,
		private toastCtrl: ToastService, public modalCtrl: ModalController,
				/*private camera: Camera ,*/ public loadingCtrl: LoadingController,
		protected compraVenta: OperacionServicio, /*private diagnostic:Diagnostic,*/
		private formBuilder: FormBuilder, public vacunaServicio: VacunaServicio,
		public enfermedadServicio: EnfermedadServicio,
		private location: Location, private usuario: UsuarioServicio
		, private explotacion: ExplotacionServicio) {
	}

	ngOnInit() {

		this.formularioVacunaEnf = this.formBuilder.group({
			nombre: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			descripcion: ['value', Validators.compose([Validators.required, Validators.minLength(1)])]
		});

		if (this.params.snapshot.queryParams.type===Constantes.VACUNA && this.params.snapshot.queryParams.vacunaEnfID){
			this.vacunaEnf=this.vacunaServicio.encontrarVacuna({id:this.params.snapshot.queryParams.vacunaEnfID},false);
		}else if(this.params.snapshot.queryParams.type===Constantes.ENFERMEDAD && this.params.snapshot.queryParams.vacunaEnfID){
			this.vacunaEnf=this.enfermedadServicio.encontrarEnfermedad({id:this.params.snapshot.queryParams.vacunaEnfID},false);
		}else if (this.params.snapshot.queryParams.type===Constantes.VACUNA){
			this.vacunaEnf=new Vacuna();
		}else if (this.params.snapshot.queryParams.type===Constantes.ENFERMEDAD){
			this.vacunaEnf=new Enfermedad();
		}

	}

	public devuelveColorBadge(tipoObjeto: any): string {
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
	}

	public getFotoAnimal() {
		if (this.params.snapshot.queryParams.type===Constantes.ENFERMEDAD) {
			return 'assets/img/enfermedad.png';
		} else {
			return 'assets/img/vacuna.png';
		}

	}

	public volver() {
		this.location.back();
	}

	public guardaDatosVacunaEnf() {
		this.submitAttempt = true;
		if (this.formularioVacunaEnf.valid) {
			this.vacunaEnf.metadatoFechaMod = new Date();
			this.vacunaEnf.metadatoEmail = this.usuario.usuario.email;
			console.log('GUARDA NUEVO', this.vacunaEnf);
			if (this.vacunaEnf.id){
				let correcto=null;
				if (this.params.snapshot.queryParams.type===Constantes.ENFERMEDAD) {
					correcto = this.enfermedadServicio.actualizarEnfermedad(this.vacunaEnf);
				} else {
					correcto = this.vacunaServicio.actualizarVacuna(this.vacunaEnf);
				}
				if (correcto) {
					this.toastCtrl.push('Modificación correcta', 'CORRECTO');
				} else {
					this.toastCtrl.push('Error al modificar', 'ERROR');
				};
			}else{
				if (this.params.snapshot.queryParams.type===Constantes.ENFERMEDAD) {
					this.guardaEnfermedad();
				} else {
					this.guardaVacuna();
				}
			}

		} else {
			this.toastCtrl.push('Faltan campos por rellenar', 'WARNING');
		}
	}

	private guardaVacuna() {
		this.vacunaServicio.guardaVacuna(this.vacunaEnf).then(data => {
			this.despuesGuardado(data);
		}, err => {
			console.error('Errr al guardar los datos del animal!', err);
			this.toastCtrl.push('Error al guardar', 'ERROR');
		}).catch(err => {
			console.error('Errr al guardar los datos del animal!', err);
			this.toastCtrl.push('Error al guardar', 'ERROR');
		});
	}

	private despuesGuardado(data: any) {
		this.vacunaEnf.id = data.id;
		let explo: Explotacion = new Explotacion().
							fromJSON(this.explotacion.encontrarExplotacion(this.explotacion.explotacionSeleccionada));
		if (this.params.snapshot.queryParams.type===Constantes.ENFERMEDAD) {
			if (!explo.arrayIdEnfermedades) {
				explo.arrayIdEnfermedades = new Array<IEIdentification>();
			}
			explo.arrayIdEnfermedades.push({ id: data.id });
		} else {
			if (!explo.arrayIdVacunas) {
				explo.arrayIdVacunas = new Array<IEIdentification>();
			}
			explo.arrayIdVacunas.push({ id: data.id });
		}

		this.explotacion.actualizarExplotacion(explo).then(dataExplo => {
			if (this.params.snapshot.queryParams.type===Constantes.ENFERMEDAD) {
				this.enfermedadServicio.enfermedades.push(data);
			} else {
				this.vacunaServicio.vacunas.push(data);
			}
			this.vaciarFormulario();
			this.toastCtrl.push('Guardado correcto', 'CORRECTO');
			this.volver();
		}).catch(err => { throw new Error('Imposible sincronizar datos del animal con la explotacion: ' + err); });
	}

	private guardaEnfermedad() {
		this.enfermedadServicio.guardaEnfermedad(this.vacunaEnf).then(data => {
			this.despuesGuardado(data);
		}, err => {
			console.error('Errr al guardar los datos del animal!', err);
			this.toastCtrl.push('Error al guardar', 'ERROR');
		}).catch(err => {
			console.error('Errr al guardar los datos del animal!', err);
			this.toastCtrl.push('Error al guardar', 'ERROR');
		});
	}


	isInstanceOfVacuna(objeto: any): boolean {
		return objeto instanceof Vacuna;
	}

	public vaciarFormulario() {
		if (this.isInstanceOfVacuna(this.vacunaEnf)) {
			this.vacunaEnf = new Vacuna();
		} else {
			this.vacunaEnf = new Enfermedad();
		}
	}

}