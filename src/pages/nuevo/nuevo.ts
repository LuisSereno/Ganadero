
import {NavController,NavParams} from 'ionic-angular';
import { Component,ViewChild, ElementRef } from '@angular/core';
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Animal} from '../../servicios/beans/animal'
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Compra} from '../../servicios/beans/compra'
import {ListadoAnimalesVendidos} from '../listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos'
import {ServicioCompraVenta} from '../../servicios/servicioCompraVenta';
import { ModalController, LoadingController } from 'ionic-angular';
//import {ListVacEnf} from '../listadoVacunasEnfermedades/listaVacunasEnfermedades'
//import {AscDesc} from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Camera, CameraOptions } from '@ionic-native/camera';
import Tesseract from 'tesseract.js';  
import {Constantes} from '../../servicios/constantes';
import {ToastService} from '../../servicios/mensajeToast';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
	templateUrl: 'nuevo.html',
	providers: [Diagnostic]
})
export class Nuevo {
	
	animal:Animal;

	isHembra:boolean;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	arrayDescendencia:Array<Animal>;

	arrayAscendencia:Array<Animal>;

	pictureOpts:{};

	picture:any;

	options: CameraOptions;
  
  	OCRAD: any;

  	//srcImage: string;

  	compra:number;

  	arrayAnimales:Array<Animal>;

  	formularioAnimal:FormGroup;

  	@ViewChild('scannedImg') private scannedImg: ElementRef;

  	private recognizedText: string;  

	constructor(public navCtrl: NavController,  params: NavParams,public servicio: ServicioDatos,
				private toastCtrl: ToastService,public modalCtrl: ModalController,
				private camera: Camera,public loadingCtrl: LoadingController,
				protected compraVenta:ServicioCompraVenta,private diagnostic:Diagnostic,
				private formBuilder: FormBuilder) {

		this.options= {
			sourceType: this.camera.PictureSourceType.CAMERA  ,
	        destinationType: this.camera.DestinationType.DATA_URL,
	        encodingType: this.camera.EncodingType.PNG,
	        quality: 100,
	        targetWidth: 200,
	        targetHeight: 300,
	        allowEdit:true,
	        correctOrientation:true,
	        saveToPhotoAlbum:true
		}

		this.formularioAnimal = this.formBuilder.group({
		    numero: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
		    alias: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
		    raza: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
		   	fechaNacimiento: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])]
		});

		this.compra=params.get("compra");
		if (this.compra!=Constantes.COMPRA_COMPRA){
			this.compra=Constantes.INDEFINIDO;
			this.animal=params.get("animal");
		}else{
			this.compraVenta.esCompra(false);
			this.animal=new Macho(null,null,null,null,0,null,null,null,null,null,null,null);
			this.arrayAnimales=new Array<Animal>();
		}
		this.arrayDescendencia=new Array<Animal>();
		this.arrayAscendencia=new Array<Animal>();
		this.fechaNacimiento="";
		this.fechaUltimoNacimiento="";
	}


	ionViewDidLoad() {

		console.log("No sabemos que guardar aqui");
		// picture options
		this.pictureOpts={
		  width: 1280,
		  height: 1280,
		  quality: 85
		}
		this.isHembra=false;
	}

	protected devuelveColorBadge(tipoObjeto:any):String{
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
	}

	protected volver(){
		this.navCtrl.pop();
	}

	protected guardaDatosAnimal(){
	    if(this.formularioAnimal.valid){
			this.animal.setDescendencia(this.arrayDescendencia);
			this.animal.setAscendencia(this.arrayAscendencia);
			this.animal.setFechaNacimiento(new Date(String(this.fechaNacimiento)));
			if(this.animal instanceof Hembra){
				this.animal.setFechaUltimoNacimiento(new Date(String(this.fechaUltimoNacimiento)));
			}
			this.animal.setMetaDatoFechaMod(new Date());
			this.animal.setMetaDatoEmail(this.servicio.getExplotacion().getUsuario().getEmail());
	        console.log("Animal!!!" + this.animal);
	        if (!this.compra){
				let correcto=this.servicio.guardaModificaAnimal(true,this.animal);
				if (correcto){
					this.vaciarFormulario();
					this.toastCtrl.push("Guardado correcto","CORRECTO");
				}else{
				    this.toastCtrl.push("Error al guardar","ERROR");
				};
	        }else{
	        	this.arrayAnimales.push(this.animal);
	        	this.vaciarFormulario();
	        }
	    }else{
	    	this.toastCtrl.push("Faltan campos por rellenar","WARNING");
	    }
	}


	isInstanceOfHembra(objeto:Animal):boolean{
		return objeto instanceof Hembra;
	}

	anadirElementoEnfermedad(elemento:Array<string>){
		this.animal.setEnfermedades(elemento);
	}
	  
	anadirElementoVacunas(elemento:Array<string>){
		this.animal.setVacunas(elemento);
	}

	private anadirArrayDescendencia(datos:Array<Animal>) {
	 	this.arrayDescendencia=datos;   
	}

	private anadirArrayAscendencia(datos:Array<Animal>) {
	 	this.arrayAscendencia=datos;   
	}

	protected enviarResultadoACompras(){
		this.arrayAnimales.push(this.animal);
		this.vaciarFormulario();
		this.navCtrl.push(ListadoAnimalesVendidos,{animalesSeleccionados:this.arrayAnimales,operacion:new Compra(null,null,null,null,null)});
	}

	protected vaciarFormulario(){
		if(this.animal instanceof Hembra){
			this.animal=new Hembra(null,null,null,null,null,null,null,null,null,null,null,null,null);
			this.fechaUltimoNacimiento="";
		}else if (this.animal instanceof Macho){
			this.animal=new Macho(null,null,null,null,null,null,null,null,null,null,null,null);
		}
		this.fechaNacimiento="";
	}

	protected seleccionarSexo(hembra:number){
		let objetoCast:any;
		if (hembra==0){
			this.isHembra=true;
			objetoCast=Hembra.fromJSON(this.animal.toJSON());
		}else{
			this.isHembra=false;
			objetoCast=Macho.fromJSON(this.animal.toJSON());
		}
		console.log("EL OBJETO ES:");
		console.log(objetoCast);
		this.animal=objetoCast;
		
	}


    takePicture(imagenAnimal:number) {
    	console.log("Entra en takePicture");
    	if (imagenAnimal===2){
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

    }

    private captarFoto(imagenAnimal:number){
    	this.camera.getPicture(this.options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:
		 //	let base64Image = 'data:image/jpeg;base64,' + imageData;
		 //	this.srcImage =base64Image;
		 	if (imagenAnimal===0){
				let base64Image = 'data:image/png;base64,' + imageData;
		 		this.animal.setFoto(base64Image);

		 	}else{

				this.toastCtrl.push('Please wait...',"WARNING");
				Tesseract.recognize(imageData)  
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

    holawola(){
    	console.log("Estamos aqui3");
	/*	// Switch camera
		this.cameraPreview.switchCamera();

		// set color effect to negative
		this.cameraPreview.setColorEffect('negative');

		// Stop the camera preview
		this.cameraPreview.stopCamera();
		*/

    }

   analyze() {
   		console.log("Entra en analyze y no funciona nada");
/*		let loader = this.loadingCtrl.create({
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