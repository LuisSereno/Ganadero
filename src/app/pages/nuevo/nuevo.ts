import { UsuarioServicio } from './../../servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Hembra } from '../../servicios/beans/hembra'
import { Macho } from '../../servicios/beans/macho'
import { Animal } from '../../servicios/beans/animal'
import { Compra } from '../../servicios/beans/compra'
import { Camera, CameraOptions } from '@ionic-native/camera';
//import Tesseract from 'tesseract.js';  
import { Constantes } from '../../servicios/genericos/constantes';
import { ToastService } from '../../servicios/genericos/mensajeToast';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { GanadoServicio } from 'src/app/servicios/ganado.service';
import { OperacionServicio } from 'src/app/servicios/operacion.service';

@Component({
	templateUrl: 'nuevo.html',
	styleUrls: ['./nuevo.scss'],
	//	providers: [Diagnostic]
})
export class Nuevo {

	animal: Animal;

	isHembra: boolean;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	arrayDescendencia: Array<Animal>;

	arrayAscendencia: Array<Animal>;

	pictureOpts: {};

	picture: any;

	options: CameraOptions;

	OCRAD: any;

	//srcImage: string;

	compra: number;

	arrayAnimales: Array<Animal>;

	formularioAnimal: FormGroup;

	public submitAttempt: boolean = false;


	//@ViewChild('scannedImg') private scannedImg: ElementRef;

	private recognizedText: string;

	constructor(public navCtrl: Router, params: ActivatedRoute,
		private toastCtrl: ToastService, public modalCtrl: ModalController,
				/*private camera: Camera ,*/ public loadingCtrl: LoadingController,
		protected compraVenta: OperacionServicio, /*private diagnostic:Diagnostic,*/
		private formBuilder: FormBuilder, public ganadoServicio: GanadoServicio,
		private location: Location, private usuario: UsuarioServicio) {

		/*this.options= {
			sourceType: this.camera.PictureSourceType.CAMERA  ,
	        destinationType: this.camera.DestinationType.DATA_URL,
	        encodingType: this.camera.EncodingType.PNG,
	        quality: 100,
	        targetWidth: 200,
	        targetHeight: 300,
	        allowEdit:true,
	        correctOrientation:true,
	        saveToPhotoAlbum:true
		}*/

		this.formularioAnimal = this.formBuilder.group({
			numero: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			alias: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			raza: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			fechaNacimiento: ['value', Validators.compose([Validators.required])]
		});

		if (params.snapshot.queryParams.compra) {
			this.compra = JSON.parse(params.snapshot.queryParams.compra);
			if (this.compra != Constantes.COMPRA_COMPRA) {
				this.compra = Constantes.INDEFINIDO;
				let valueParse = JSON.parse(params.snapshot.queryParams.animal);
				this.animal= valueParse.sexo===Constantes.MACHO?Macho.fromJSON(valueParse):Hembra.fromJSON(valueParse);
			} else {
				this.compraVenta.esCompra(false);
				this.animal = new Macho(null, null, null, null, 0, null, null, null, null, null, null, null);
				this.arrayAnimales = new Array<Animal>();
			}
		} else {
			this.compra = Constantes.INDEFINIDO;
			let valueParse = JSON.parse(params.snapshot.queryParams.animal);
			this.animal= valueParse.sexo===Constantes.MACHO?Macho.fromJSON(valueParse):Hembra.fromJSON(valueParse);
		}

		this.arrayDescendencia = new Array<Animal>();
		this.arrayAscendencia = new Array<Animal>();
		this.fechaNacimiento = "";
		this.fechaUltimoNacimiento = "";
	}


	ionViewDidLoad() {

		console.log("No sabemos que guardar aqui");
		// picture options
		this.pictureOpts = {
			width: 1280,
			height: 1280,
			quality: 85
		}
		this.isHembra = false;
	}

	protected devuelveColorBadge(tipoObjeto: any): String {
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
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

	protected volver() {
		this.location.back();
	}

	protected guardaDatosAnimal() {
		this.submitAttempt = true;
		if (this.formularioAnimal.valid) {
			this.animal.descendencia = this.arrayDescendencia;
			this.animal.ascendencia = this.arrayAscendencia;
			this.animal.fechaNacimiento = new Date(String(this.fechaNacimiento));
			if (this.animal instanceof Hembra) {
				this.animal.fechaUltimoNacimiento = new Date(String(this.fechaUltimoNacimiento));
			}
			this.animal.metadatoFechaMod = new Date();
			this.animal.metadatoEmail = this.usuario.usuario.email;
			console.log("Animal!!!" + this.animal);
			if (!this.compra) {
				let correcto = this.ganadoServicio.guardaModificaAnimal(true, this.animal);
				if (correcto) {
					this.vaciarFormulario();
					this.toastCtrl.push("Guardado correcto", "CORRECTO");
				} else {
					this.toastCtrl.push("Error al guardar", "ERROR");
				};
			} else {
				this.arrayAnimales.push(this.animal);
				this.vaciarFormulario();
			}
		} else {
			this.toastCtrl.push("Faltan campos por rellenar", "WARNING");
		}
	}


	isInstanceOfHembra(objeto: Animal): boolean {
		return objeto instanceof Hembra;
	}

	anadirElementoEnfermedad(elemento: Array<string>) {
		this.animal.setEnfermedades(elemento);
	}

	anadirElementoVacunas(elemento: Array<string>) {
		this.animal.setVacunas(elemento);
	}

	private anadirArrayDescendencia(datos: Array<Animal>) {
		this.arrayDescendencia = datos;
	}

	private anadirArrayAscendencia(datos: Array<Animal>) {
		this.arrayAscendencia = datos;
	}

	protected enviarResultadoACompras() {
		this.arrayAnimales.push(this.animal);
		this.vaciarFormulario();
		this.navCtrl.navigate(['listado-animales-vendidos', { animalesSeleccionados: this.arrayAnimales, operacion: new Compra(null, null, null, null, null) }]);
	}

	protected vaciarFormulario() {
		if (this.animal instanceof Hembra) {
			this.animal = new Hembra(null, null, null, null, null, null, null, null, null, null, null, null, null);
			this.fechaUltimoNacimiento = "";
		} else if (this.animal instanceof Macho) {
			this.animal = new Macho(null, null, null, null, null, null, null, null, null, null, null, null);
		}
		this.fechaNacimiento = "";
	}

	protected seleccionarSexo(hembra: number) {
		let objetoCast: any;
		if (hembra == 0) {
			this.isHembra = true;
			objetoCast = Hembra.fromJSON(this.animal.toJSON() as Hembra);
		} else {
			this.isHembra = false;
			objetoCast = Macho.fromJSON(this.animal.toJSON() as Macho);
		}
		console.log("EL OBJETO ES:");
		console.log(objetoCast);
		this.animal = objetoCast;

	}


	takePicture(imagenAnimal: number) {
		console.log("Entra en takePicture");
    	/*if (imagenAnimal===2){
    		this.options.sourceType=this.camera.PictureSourceType.PHOTOLIBRARY;
    		imagenAnimal=0;
    	}else{
    		this.options.sourceType=this.camera.PictureSourceType.CAMERA;
    	}
        this.diagnostic.isCameraAuthorized().then((authorized) => {
            if(authorized)
                this.captarFoto(imagenAnimal);
            else {
                this.diagnostic.requestCameraAuthorization().then((status) => {
                    if(status == this.diagnostic.permissionStatus.GRANTED){
                    	this.captarFoto(imagenAnimal);
                    }else {
                        // Permissions not granted
                        // Therefore, create and present toast
                        this.toastCtrl.push("No hay acceso a la camara","ERROR");
                    }
                });
            }
        });
*/
	}

	private captarFoto(imagenAnimal: number) {
		/*	this.camera.getPicture(this.options).then((imageData) => {
			 // imageData is either a base64 encoded string or a file URI
			 // If it's base64:
			 //	let base64Image = 'data:image/jpeg;base64,' + imageData;
			 //	this.srcImage =base64Image;
				  if (imagenAnimal===0){
					let base64Image = 'data:image/png;base64,' + imageData;
						this.animal.setFoto(base64Image);
	
				  }else{
	
					this.toastCtrl.push('Please wait...',"WARNING");
					/*Tesseract.recognize(imageData)  
					.progress((progress) => {
						console.log('progress', progress);
					})
					.then((tesseractResult) => {
						this.toastCtrl.dismissAll();
						console.log("finaliza todo");
						console.log(tesseractResult);
						this.recognizedText = tesseractResult.text;
						alert(this.recognizedText);
					});
				  }
	
	
	
			}, (err) => {
			 // Handle error
				  console.error(err);
			});
	*/
	}

	changeEffect() {
		console.log("Estamos aqui2");
		this.analyze();
		// Create an array with 5 effects
		/*   let effects: any = ['none', 'negative','mono', 'aqua', 'sepia'];
	    
		   let randomEffect: string = effects[Math.floor(
									   Math.random() * effects.length)];
		   this.cameraPreview.setColorEffect(randomEffect);
		   */

	}

	holawola() {
		console.log("Estamos aqui3");
		/*
		// Switch camera
		this.cameraPreview.switchCamera();

		// set color effect to negative
		this.cameraPreview.setColorEffect('negative');

		// Stop the camera preview
		this.cameraPreview.stopCamera();
		*/

	}

	analyze() {
		/*	console.log("Entra en analyze y no funciona nada");
	  let loader = this.loadingCtrl.create({
		  content: 'Please wait...'
	  });
	

	  Tesseract.recognize(this.scannedImg.nativeElement.src)  
	  .progress((progress) => {
		  loader.present();
		  console.log('progress', progress);
	  })
	  .then((tesseractResult) => {
		  loader.dismissAll();
		  console.log(tesseractResult);
		  this.recognizedText = tesseractResult.text;
		  alert(this.recognizedText);
	  });
*/
	}

}