
import {NavController,NavParams,ToastController} from 'ionic-angular';
import { Component } from '@angular/core';
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Animal} from '../../servicios/beans/animal'
import {ServicioDatos} from '../../servicios/serviciodatos';
import { ModalController } from 'ionic-angular';
import {ListVacEnf} from '../listadoVacunasEnfermedades/listaVacunasEnfermedades'
import {AscDesc} from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia';
//import { ModalPage } from '../modal/modal';
import { Diagnostic } from 'ionic-native';
import { CameraPreview, CameraPreviewRect } from 'ionic-native';

@Component({
	templateUrl: 'nuevo.html'
})
export class Nuevo {
	
	animal:Animal;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	arrayDescendencia:Array<Animal>;

	arrayAscendencia:Array<Animal>;

	constructor(public navCtrl: NavController,  params: NavParams,public servicio: ServicioDatos,
				private toastCtrl: ToastController,public modalCtrl: ModalController) {
		this.animal=params.get("animal");
		this.arrayDescendencia=new Array<Animal>();
		this.arrayAscendencia=new Array<Animal>();
		this.fechaNacimiento="";
		this.fechaUltimoNacimiento="";
		this.checkPermissions();
	}

	ngOnInit() {
		console.log("No sabemos que guardar aqui");

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
        Diagnostic.isCameraAuthorized().then((authorized) => {
            if(authorized)
                this.initializePreview();
            else {
                Diagnostic.requestCameraAuthorization().then((status) => {
                    if(status == Diagnostic.permissionStatus.GRANTED)
                        this.initializePreview();
                    else {
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
        // Make the width and height of the preview equal 
        // to the width and height of the app's window
        let previewRect: CameraPreviewRect = {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
     

         // Start preview
        CameraPreview.startCamera(
            previewRect, 
            'rear', 
            false, 
            false, 
            true,
            1
        );

        CameraPreview.setOnPictureTakenHandler().subscribe((result) => {
            alert("MIS COJONES");
            //this.moveFileToExternalStorage(result[0]); // Move picture only
        });
        // More code goes here
    }

    takePicture() {
        CameraPreview.takePicture({maxWidth: 320, maxHeight: 320});
    }

    changeEffect() {
        // Create an array with 5 effects
        let effects: any = ['none', 'negative','mono', 'aqua', 'sepia'];
     
        let randomEffect: string = effects[Math.floor(
                                    Math.random() * effects.length)];
        CameraPreview.setColorEffect(randomEffect);
    }
}