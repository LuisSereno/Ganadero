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
import { Component } from '@angular/core';
import { Hembra } from '../../servicios/beans/hembra';
import { Macho } from '../../servicios/beans/macho';
import { ServicioDatos } from '../../servicios/serviciodatos';
var Detalle = Detalle_1 = (function () {
    function Detalle(navCtrl, params, servicio, toastCtrl) {
        this.navCtrl = navCtrl;
        this.servicio = servicio;
        this.toastCtrl = toastCtrl;
        this.animal = params.get("animal");
        this.arrayDescendencia = new Array();
        this.arrayAscendencia = new Array();
        this.fechaNacimiento = "";
        this.fechaUltimoNacimiento = "";
    }
    Detalle.prototype.ionViewDidLoad = function () {
        if (this.animal) {
            var fechaFormateada = this.animal.getFechaNacimiento();
            this.fechaNacimiento = fechaFormateada ? fechaFormateada.toISOString() : '';
            if (this.animal instanceof Hembra) {
                var fechaUltNacFormateada = this.animal.getFechaUltimoNacimiento();
                this.fechaUltimoNacimiento = fechaUltNacFormateada ? fechaUltNacFormateada.toISOString() : '';
            }
            else {
                this.fechaUltimoNacimiento = "";
            }
            this.arrayAscendencia = this.servicio.getBusquedaAscDesc(this.animal.getAscendencia());
            this.arrayDescendencia = this.servicio.getBusquedaAscDesc(this.animal.getDescendencia());
        }
    };
    Detalle.prototype.irDetalleDesdeDetalle = function (animalito) {
        this.navCtrl.push(Detalle_1, { animal: animalito });
    };
    Detalle.prototype.devuelveColorBadge = function (tipoObjeto) {
        return tipoObjeto instanceof Macho ? 'danger' : 'secondary';
    };
    Detalle.prototype.volver = function () {
        this.navCtrl.pop();
    };
    Detalle.prototype.modificaDatosAnimal = function () {
        console.log("MODIFICA DATOS ANIMAL");
        console.log(this.arrayDescendencia);
        console.log(this.arrayAscendencia);
        this.animal.setDescendencia(this.arrayDescendencia);
        this.animal.setAscendencia(this.arrayAscendencia);
        this.animal.setFechaNacimiento(this.fechaNacimiento ? new Date(String(this.fechaNacimiento)) : null);
        if (this.animal instanceof Hembra) {
            this.animal.setFechaUltimoNacimiento(this.fechaUltimoNacimiento ? new Date(String(this.fechaUltimoNacimiento)) : null);
        }
        var correcto = this.servicio.guardaModificaAnimal(false, this.animal);
        if (correcto) {
            this.presentToast("Guardado correcto");
        }
        else {
            this.presentToast("Error al guardar");
        }
    };
    Detalle.prototype.modificaArrayDescendencia = function (datos) {
        this.arrayDescendencia = datos;
    };
    Detalle.prototype.modificaArrayAscendencia = function (datos) {
        this.arrayAscendencia = datos;
    };
    Detalle.prototype.modificaElementoEnfermedad = function (elemento) {
        this.animal.setEnfermedades(elemento);
    };
    Detalle.prototype.modificaElementoVacunas = function (elemento) {
        this.animal.setVacunas(elemento);
    };
    Detalle.prototype.presentToast = function (mensaje) {
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
    Detalle.prototype.isInstanceOfHembra = function (objeto) {
        return objeto instanceof Hembra;
    };
    return Detalle;
}());
Detalle = Detalle_1 = __decorate([
    Component({
        templateUrl: 'detalle.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ServicioDatos,
        ToastController])
], Detalle);
export { Detalle };
var Detalle_1;
//# sourceMappingURL=detalle.js.map