
import {NavController,NavParams,ToastController} from 'ionic-angular';
import { Component,ViewChild, ElementRef } from '@angular/core';
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Animal} from '../../servicios/beans/animal'
import {ServicioDatos} from '../../servicios/serviciodatos';
import { ModalController, LoadingController } from 'ionic-angular';
import {ListVacEnf} from '../listadoVacunasEnfermedades/listaVacunasEnfermedades'
import {AscDesc} from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia';
//import { ModalPage } from '../modal/modal';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CameraPreview, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera, CameraOptions } from '@ionic-native/camera';
import Tesseract from 'tesseract.js';  

@Component({
	templateUrl: 'nuevo.html',
	providers: [CameraPreview,Diagnostic]
})
export class Nuevo {
	
	animal:Animal;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	arrayDescendencia:Array<Animal>;

	arrayAscendencia:Array<Animal>;

	pictureOpts:{};

	picture:any;

	options: CameraOptions;
  
  	OCRAD: any;

  	srcImage: string;

  	@ViewChild('scannedImg') private scannedImg: ElementRef;

  	private recognizedText: string;  

	constructor(public navCtrl: NavController,  params: NavParams,public servicio: ServicioDatos,
				private toastCtrl: ToastController,public modalCtrl: ModalController,
				private cameraPreview: CameraPreview,private diagnostic: Diagnostic,
				private camera: Camera,public loadingCtrl: LoadingController) {

		this.options= {
	        destinationType: this.camera.DestinationType.FILE_URI,
	        encodingType: this.camera.EncodingType.PNG,
	        quality: 100,
	        targetWidth: 200,
	        targetHeight: 300
		}

		this.animal=params.get("animal");
		this.arrayDescendencia=new Array<Animal>();
		this.arrayAscendencia=new Array<Animal>();
		this.fechaNacimiento="";
		this.fechaUltimoNacimiento="";
		this.checkPermissions();
	}

	ngOnInit() {
		console.log("No sabemos que guardar aqui");
		// picture options
		this.pictureOpts={
		  width: 1280,
		  height: 1280,
		  quality: 85
		}
	}

	protected devuelveColorBadge(tipoObjeto:any):String{
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
	}

	protected volver(){
		this.navCtrl.pop();
	}

	protected guardaDatosAnimal(){

		this.animal.setDescendencia(this.arrayDescendencia);
		this.animal.setAscendencia(this.arrayAscendencia);
		this.animal.setFechaNacimiento(new Date(String(this.fechaNacimiento)));
		if(this.animal instanceof Hembra){
			this.animal.setFechaUltimoNacimiento(new Date(String(this.fechaUltimoNacimiento)));
		}

        console.log("Animal!!!" + this.animal);
		let correcto=this.servicio.guardaModificaAnimal(false,this.animal);
		if (correcto){
			this.presentToast("Guardado correcto");
		}else{
			this.presentToast("Error al guardar");
		}
	}


	presentToast(mensaje:string) {
	  let toast = this.toastCtrl.create({
	    message: mensaje,
	      duration: 15000,
	      showCloseButton: true,
	      closeButtonText: 'Cerrar',
	      dismissOnPageChange: true,
	      cssClass: "toast-success"
	  });

	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  toast.present();
	}

	isInstanceOfHembra(objeto:Animal):boolean{
		return objeto instanceof Hembra;
	}

/*	  presentModal() {
	    let modal = this.modalCtrl.create(ModalPage);
	    modal.present();
	  }
*/
	  anadirElementoEnfermedad(elemento:HTMLInputElement){
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
	  }

      protected checkPermissions() {
        this.diagnostic.isCameraAuthorized().then((authorized) => {
            if(authorized)
                this.initializePreview();
            else {
                this.diagnostic.requestCameraAuthorization().then((status) => {
                    if(status == this.diagnostic.permissionStatus.GRANTED){
                    	// this.initializePreview();
                    	alert("Esto es posible");
                    }else {
                        // Permissions not granted
                        // Therefore, create and present toast
                        this.toastCtrl.create(
                            {
                                message: "Cannot access camera", 
                                position: "bottom",
                                duration: 5000
                            }
                        ).present();
                    }
                });
            }
        });
    }

    protected initializePreview() {
    	console.log("Entra en initializePreview");
		// camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
		const cameraPreviewOpts: CameraPreviewOptions = {
		  x: 0,
		  y: 0,
		  width: window.screen.width,
		  height: window.screen.height,
		  camera: 'rear',
		  tapPhoto: true,
		  previewDrag: true,
		  toBack: true,
		  alpha: 1
		};


     

		// start camera
	/*	this.cameraPreview.startCamera(cameraPreviewOpts).then(
		  (res) => {
		    console.log(res)
		  },
		  (err) => {
		    console.log(err)
		  });
*/
		// Set the handler to run every time we take a picture
	/*	this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
		  console.log(result);
		  // do something with the result
		});*/

    }

    takePicture() {
    	console.log("Entra en takePicture");

    	this.camera.getPicture(this.options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:
		 //	let base64Image = 'data:image/jpeg;base64,' + imageData;
		 //	this.srcImage =base64Image;

			 let loader = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			loader.present();
			Tesseract.recognize(imageData)  
		    .progress((progress) => {
		        console.log('progress', progress);
		    })
		    .then((tesseractResult) => {
		    	loader.dismissAll();
		        console.log("finaliza todo");
		        console.log(tesseractResult);
		        this.recognizedText = tesseractResult.text;
		        alert(this.recognizedText);
		    });


		}, (err) => {
		 // Handle error
		 	console.error(err);
		});

		// take a picture
	/*	this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
		  this.picture = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
		  console.log(err);
		  this.picture = 'assets/img/test.jpg';
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
		let loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		
		/*(<any>window).OCRAD(document.getElementById('image'), text => {
			loader.dismissAll();
			alert(text);
			console.log(text);
		}, (err) => {
		 	loader.dismissAll();
		 	console.error(err);
		});*/

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

  }

}