import { Explotacion } from 'src/app/servicios/beans/explotacion';
import { IEExplotacion } from 'src/app/servicios/beans/interfaces/explotacion.interface';
import { IEIdentification } from './../../servicios/beans/interfaces/identification.interface';
import { ExplotacionServicio } from './../../servicios/explotacion.service';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { UsuarioServicio } from './../../servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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

	explotacionId: string;

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

	formularioAnimal: FormGroup;

	public submitAttempt: boolean = false;

	//@ViewChild('scannedImg') private scannedImg: ElementRef;

	private recognizedText: string;

	constructor(public router: Router, public params: ActivatedRoute,
		private toastCtrl: ToastService, public modalCtrl: ModalController,
				/*private camera: Camera ,*/ public loadingCtrl: LoadingController, /*private diagnostic:Diagnostic,*/
		private formBuilder: FormBuilder, public ganadoServicio: GanadoServicio,
		private location: Location, private usuario: UsuarioServicio
		, private explotacion: ExplotacionServicio,protected operacionServicio: OperacionServicio) {
	}

	ngOnInit() {


		this.arrayDescendencia = new Array<Animal>();
		this.arrayAscendencia = new Array<Animal>();
		this.fechaNacimiento = "";
		this.fechaUltimoNacimiento = "";

		if (this.params.snapshot.queryParams.compra) {
				this.compra = JSON.parse(this.params.snapshot.queryParams.compra);
		//	if (this.compra != Constantes.COMPRA_COMPRA) {
				//this.compra = Constantes.INDEFINIDO;
				this.explotacionId = this.explotacion.explotacionSeleccionada.id;
				if (JSON.parse(this.params.snapshot.queryParams.sexo) == Constantes.MACHO) {
					this.animal = new Macho(null, null, null, null, null, null, null, null, null, null, null, null);
					this.animal.sexo= Constantes.MACHO;
				} else {
					this.animal = new Hembra(null, null, null, null, null, null, null, null, null, null, null, null, null);
					this.animal.sexo= Constantes.HEMBRA;
				}
				//let valueParse = JSON.parse(this.params.snapshot.queryParams.animal);
				//this.animal = valueParse.sexo === Constantes.MACHO ? Macho.fromJSON(valueParse) : Hembra.fromJSON(valueParse);
		/*	} else {
				this.compraVenta.esCompra(false);
				this.animal = new Macho(null, null, null, null, 0, null, null, null, null, null, null, null);
				this.arrayAnimales = new Array<Animal>();
			}
			*/

			this.formularioAnimal = this.formBuilder.group({
				numero: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
				alias: ['value', Validators.compose([Validators.minLength(0), Validators.maxLength(25)])],
				raza: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
				//fechaNacimiento: ['value', Validators.compose([Validators.required])],
				precioCompra: ['value', Validators.compose([Validators.required])]
			});

		} else {

			this.formularioAnimal = this.formBuilder.group({
				numero: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
				alias: ['value', Validators.compose([Validators.minLength(0), Validators.maxLength(25)])],
				raza: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
				fechaNacimiento: ['value', Validators.compose([Validators.required])]
			});

			this.compra = Constantes.INDEFINIDO;
			this.explotacionId = this.explotacion.explotacionSeleccionada.id;
			if (JSON.parse(this.params.snapshot.queryParams.sexo) == Constantes.MACHO) {
				this.animal = new Macho(null, null, null, null, null, null, null, null, null, null, null, null);
				this.animal.sexo= Constantes.MACHO;
			} else {
				this.animal = new Hembra(null, null, null, null, null, null, null, null, null, null, null, null, null);
				this.animal.sexo= Constantes.HEMBRA;
			}
			if (this.params.snapshot.queryParams.animalID){
				let ieAnimalito:IEAnimal=this.ganadoServicio.encontrarAnimal({id:this.params.snapshot.queryParams.animalID});
				let animalito:Animal;
				if (ieAnimalito.sexo == Constantes.MACHO) {
					animalito = Macho.fromJSON(ieAnimalito);
				} else {
					animalito = Hembra.fromJSON(ieAnimalito);
				}
				this.arrayAscendencia.push(animalito);
			}
		}
	}


	ionViewDidLoad() {
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
			//this.animal.descendencia = this.arrayDescendencia;
			//this.animal.ascendencia = this.arrayAscendencia;
			this.animal.ascendenciaIds = this.arrayAscendencia.map(anim=>{
				if (anim instanceof String){
					return anim.toString();
				}else{
					return anim.id;
				}

			});

			this.animal.fechaNacimiento = new Date(String(this.fechaNacimiento));
			if (this.animal instanceof Hembra) {
				this.animal.fechaUltimoNacimiento = new Date(String(this.fechaUltimoNacimiento));
			}
			this.animal.metadatoFechaMod = new Date();
			this.animal.metadatoEmail = this.usuario.usuario.email;
			console.log("GUARDA NUEVO", this.animal);
			if (!this.compra) {
				this.ganadoServicio.guardaAnimal(this.animal).then(data => {
					this.animal.id=data.id
					this.ganadoServicio.ganado.push(data);
					let explo: Explotacion = new Explotacion().fromJSON(this.explotacion.encontrarExplotacion({ id: this.explotacionId }));
					if (!explo.arrayIdAnimales) {
						explo.arrayIdAnimales = new Array<IEIdentification>();
					}
					explo.arrayIdAnimales.push({ id: data.id });
					this.actualizarDatosAscendencia();
					this.explotacion.actualizarExplotacion(explo).then(data => {
						this.vaciarFormulario();
						this.toastCtrl.push("Guardado correcto", "CORRECTO");
						this.volver();
					}).catch(err => { throw new Error("Imposible sincronizar datos del animal con la explotacion: " + err); });
				}, err => {
					console.error("Errr al guardar los datos del animal!", err);
					this.toastCtrl.push("Error al guardar", "ERROR");
					this.submitAttempt=false;
				}).catch(err => {
					console.error("Errr al guardar los datos del animal!", err);
					this.toastCtrl.push("EWARNINGrror al guardar", "ERROR");
					this.submitAttempt=false;
				});
			} else {
				if (this.operacionServicio.operacionSeleccionada.animales==null){
					this.operacionServicio.operacionSeleccionada.animales =  new Array<IEAnimal>();
				}
				this.operacionServicio.operacionSeleccionada.animales.push(this.animal);
				this.operacionServicio.operacionSeleccionada.precio+=this.animal.precioCompra;
				this.vaciarFormulario();
				this.submitAttempt = false;
				this.toastCtrl.push("Animal almacenado", "SUCCESS");
			}
		} else {
			this.toastCtrl.push("Faltan campos por rellenar", "WARNING");
		}
	}

	actualizarDatosAscendencia(){
		for(let anim of this.arrayAscendencia){
			console.log("ACTUALIZA", anim);

			/*if (!anim.getDescendencia()){
				anim.setDescendencia(new Array<IEAnimal>());
			}
			anim.getDescendencia().push(this.animal);*/
			if (!anim.descendenciaIds){
				anim.descendenciaIds=new Array<string>();
			}
			anim.descendenciaIds.push(this.animal.id);
			this.ganadoServicio.actualizarAnimal(anim,true);
		}
	}

	isInstanceOfHembra(objeto: Animal): boolean {
		return objeto instanceof Hembra;
	}

	private anadirArrayDescendencia(datos: Array<Animal>) {
		this.arrayDescendencia = datos;
	}

	private anadirArrayAscendencia(datos: Array<Animal>) {
		this.arrayAscendencia = datos;
	}

/*	protected enviarResultadoACompras() {
		this.submitAttempt = true;
		if (this.formularioAnimal.valid) {
			//this.arrayAnimales.push(this.animal);
			this.vaciarFormulario();
		}
		// se comenta por errores a trabajar
		//this.router.navigate(['ganadero/listado-animales-vendidos'], { animalesSeleccionados: this.arrayAnimales, operacion: new Compra(null, null, null, null, null) });
	}
*/
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
		this.analyze();
		// Create an array with 5 effects
		/*   let effects: any = ['none', 'negative','mono', 'aqua', 'sepia'];

		   let randomEffect: string = effects[Math.floor(
									   Math.random() * effects.length)];
		   this.cameraPreview.setColorEffect(randomEffect);
		   */

	}

	holawola() {
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