var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { ServicioDatos } from '../../../../servicios/serviciodatos';
import { Explotacion } from '../../../../servicios/beans/explotacion';
import { AuthService } from '../../../../servicios/auth/auth';
var DetalleExplotacion = (function () {
    function DetalleExplotacion(navCtrl, params, servicio, toastCtrl, auth, plt) {
        this.navCtrl = navCtrl;
        this.servicio = servicio;
        this.toastCtrl = toastCtrl;
        this.auth = auth;
        this.plt = plt;
        this.explotacion = params.get("explotacion");
    }
    DetalleExplotacion.prototype.ngOnInit = function () {
        if (this.explotacion) {
            this.explotacion = new Explotacion();
        }
    };
    DetalleExplotacion.prototype.salir = function () {
        this.auth.logout();
        this.plt.exitApp();
    };
    DetalleExplotacion.prototype.guardaDatosExplotacion = function () {
    };
    DetalleExplotacion.prototype.presentToast = function (mensaje) {
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
    return DetalleExplotacion;
}());
DetalleExplotacion = __decorate([
    Component({
        templateUrl: 'nueva.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ServicioDatos,
        ToastController, AuthService, Platform])
], DetalleExplotacion);
export { DetalleExplotacion };
//# sourceMappingURL=nueva.js.map