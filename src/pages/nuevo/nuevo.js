var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Hembra } from '../../servicios/beans/hembra';
import { Macho } from '../../servicios/beans/macho';
import { ServicioDatos } from '../../servicios/serviciodatos';
import { Compra } from '../../servicios/beans/compra';
import { ListadoAnimalesVendidos } from '../listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos';
import { ServicioCompraVenta } from '../../servicios/servicioCompraVenta';
import { ModalController, LoadingController } from 'ionic-angular';
//import { ModalPage } from '../modal/modal';
//import { Diagnostic } from '@ionic-native/diagnostic';
//import { CameraPreview, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera } from '@ionic-native/camera';
import Tesseract from 'tesseract.js';
import { Constantes } from '../../servicios/constantes';
var Nuevo = (function () {
    function Nuevo(navCtrl, params, servicio, toastCtrl, modalCtrl, camera, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.servicio = servicio;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        /*	this.options= {
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
    */
        this.compra = params.get("compra");
        if (this.compra != Constantes.COMPRA_COMPRA) {
            this.compra = Constantes.INDEFINIDO;
            this.animal = params.get("animal");
        }
        else {
            this.compraVenta = new ServicioCompraVenta(true, servicio);
            this.animal = new Macho(null, null, null, null, 0, null, null, null, null, null, null, null);
            this.arrayAnimales = new Array();
        }
        this.arrayDescendencia = new Array();
        this.arrayAscendencia = new Array();
        this.fechaNacimiento = "";
        this.fechaUltimoNacimiento = "";
        //this.checkPermissions();
    }
    Nuevo.prototype.ngOnInit = function () {
        console.log("No sabemos que guardar aqui");
        // picture options
        this.pictureOpts = {
            width: 1280,
            height: 1280,
            quality: 85
        };
    };
    Nuevo.prototype.devuelveColorBadge = function (tipoObjeto) {
        return tipoObjeto instanceof Macho ? 'danger' : 'secondary';
    };
    Nuevo.prototype.volver = function () {
        this.navCtrl.pop();
    };
    Nuevo.prototype.guardaDatosAnimal = function () {
        this.animal.setDescendencia(this.arrayDescendencia);
        this.animal.setAscendencia(this.arrayAscendencia);
        this.animal.setFechaNacimiento(new Date(String(this.fechaNacimiento)));
        if (this.animal instanceof Hembra) {
            this.animal.setFechaUltimoNacimiento(new Date(String(this.fechaUltimoNacimiento)));
        }
        console.log("Animal!!!" + this.animal);
        if (!this.compra) {
            var correcto = this.servicio.guardaModificaAnimal(true, this.animal);
            if (correcto) {
                this.presentToast("Guardado correcto");
            }
            else {
                this.presentToast("Error al guardar");
            }
        }
        else {
            this.arrayAnimales.push(this.animal);
            this.animal = new Macho(null, null, null, null, null, null, null, null, null, null, null, null);
        }
    };
    Nuevo.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 15000,
            showCloseButton: true,
            closeButtonText: 'Cerrar',
            dismissOnPageChange: true,
            cssClass: "toast-success"
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Nuevo.prototype.isInstanceOfHembra = function (objeto) {
        return objeto instanceof Hembra;
    };
    /*	  presentModal() {
            let modal = this.modalCtrl.create(ModalPage);
            modal.present();
          }
    */
    Nuevo.prototype.anadirElementoEnfermedad = function (elemento) {
        this.animal.setEnfermedades(elemento);
    };
    Nuevo.prototype.anadirElementoVacunas = function (elemento) {
        this.animal.setVacunas(elemento);
    };
    Nuevo.prototype.anadirArrayDescendencia = function (datos) {
        this.arrayDescendencia = datos;
    };
    Nuevo.prototype.anadirArrayAscendencia = function (datos) {
        this.arrayAscendencia = datos;
    };
    Nuevo.prototype.enviarResultadoACompras = function () {
        this.arrayAnimales.push(this.animal);
        this.animal = new Macho(null, null, null, null, null, null, null, null, null, null, null, null);
        this.navCtrl.push(ListadoAnimalesVendidos, { animalesSeleccionados: this.arrayAnimales, operacion: new Compra(null, null, null, null, null) });
    };
    /*     protected checkPermissions() {
           this.diagnostic.isCameraAuthorized().then((authorized) => {
               if(authorized)
                   //this.initializePreview();
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
   */
    /* protected initializePreview() {
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
 
     }*/
    Nuevo.prototype.takePicture = function (imagenAnimal) {
        var _this = this;
        console.log("Entra en takePicture");
        this.camera.getPicture(this.options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            //	let base64Image = 'data:image/jpeg;base64,' + imageData;
            //	this.srcImage =base64Image;
            if (imagenAnimal) {
                var base64Image = 'data:image/png;base64,' + imageData;
                _this.animal.setFoto(base64Image);
            }
            else {
                var loader_1 = _this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loader_1.present();
                Tesseract.recognize(imageData)
                    .progress(function (progress) {
                    console.log('progress', progress);
                })
                    .then(function (tesseractResult) {
                    loader_1.dismissAll();
                    console.log("finaliza todo");
                    console.log(tesseractResult);
                    _this.recognizedText = tesseractResult.text;
                    alert(_this.recognizedText);
                });
            }
        }, function (err) {
            // Handle error
            console.error(err);
        });
    };
    Nuevo.prototype.changeEffect = function () {
        console.log("Estamos aqui2");
        this.analyze();
        // Create an array with 5 effects
        /*   let effects: any = ['none', 'negative','mono', 'aqua', 'sepia'];
        
           let randomEffect: string = effects[Math.floor(
                                       Math.random() * effects.length)];
           this.cameraPreview.setColorEffect(randomEffect);
       */
    };
    Nuevo.prototype.holawola = function () {
        console.log("Estamos aqui3");
        /*	// Switch camera
            this.cameraPreview.switchCamera();
    
            // set color effect to negative
            this.cameraPreview.setColorEffect('negative');
    
            // Stop the camera preview
            this.cameraPreview.stopCamera();
            */
    };
    Nuevo.prototype.analyze = function () {
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
    };
    return Nuevo;
}());
__decorate([
    ViewChild('scannedImg'),
    __metadata("design:type", ElementRef)
], Nuevo.prototype, "scannedImg", void 0);
Nuevo = __decorate([
    Component({
        templateUrl: 'nuevo.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ServicioDatos,
        ToastController, ModalController,
        Camera, LoadingController])
], Nuevo);
export { Nuevo };
//# sourceMappingURL=nuevo.js.map