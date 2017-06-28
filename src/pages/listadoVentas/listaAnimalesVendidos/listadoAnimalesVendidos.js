var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Venta } from '../../../servicios/beans/venta';
import { Compra } from '../../../servicios/beans/compra';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicioCompraVenta } from '../../../servicios/servicioCompraVenta';
import { ServicioDatos } from '../../../servicios/serviciodatos';
var ListadoAnimalesVendidos = (function () {
    function ListadoAnimalesVendidos(navCtrl, params, servicioDatos, toastCtrl) {
        this.navCtrl = navCtrl;
        this.servicioDatos = servicioDatos;
        this.toastCtrl = toastCtrl;
        this.arrayAnimales = params.get("animalesSeleccionados");
        this.operacion = params.get("operacion");
        this.sumarCantidad();
        this.servicio = new ServicioCompraVenta(false, servicioDatos);
    }
    ListadoAnimalesVendidos.prototype.volver = function () {
        this.navCtrl.pop();
    };
    ListadoAnimalesVendidos.prototype.enviarOperacion = function () {
        this.operacion.setAnimales(this.arrayAnimales);
        if (!(this.operacion.getFechaOperacion() instanceof Date)) {
            this.operacion.setFechaOperacion(new Date(this.operacion.getFechaOperacion()));
        }
        var correcto = this.servicio.crearOperacion(this.operacion);
        if (correcto) {
            this.presentToast("Guardado correcto");
            this.navCtrl.popToRoot();
        }
        else {
            this.presentToast("Error al guardar");
        }
    };
    ListadoAnimalesVendidos.prototype.isInstanceOfVenta = function (objeto) {
        return objeto instanceof Venta;
    };
    ListadoAnimalesVendidos.prototype.sumarCantidad = function () {
        var suma = 0;
        if (this.operacion instanceof Venta) {
            for (var _i = 0, _a = this.arrayAnimales; _i < _a.length; _i++) {
                var anim = _a[_i];
                var valor = anim.getPrecioVenta();
                if (valor) {
                    suma = suma + valor;
                }
            }
        }
        else if (this.operacion instanceof Compra) {
            for (var _b = 0, _c = this.arrayAnimales; _b < _c.length; _b++) {
                var anim = _c[_b];
                var valor = anim.getPrecioCompra();
                if (valor) {
                    suma = suma + valor;
                }
            }
        }
        this.operacion.setPrecio(suma);
    };
    ListadoAnimalesVendidos.prototype.comprobarCampos = function () {
        if (!this.operacion.getAgrupacion()) {
            return false;
        }
        if (!this.operacion.getFechaOperacion()) {
            return false;
        }
        if (this.operacion.getPrecio() && this.operacion instanceof Venta) {
            if (this.arrayAnimales) {
                for (var _i = 0, _a = this.arrayAnimales; _i < _a.length; _i++) {
                    var anim = _a[_i];
                    var valor = anim.getPrecioVenta();
                    if (!valor) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    ListadoAnimalesVendidos.prototype.presentToast = function (mensaje) {
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
    return ListadoAnimalesVendidos;
}());
ListadoAnimalesVendidos = __decorate([
    Component({
        templateUrl: 'listadoAnimalesVendidos.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ServicioDatos, ToastController])
], ListadoAnimalesVendidos);
export { ListadoAnimalesVendidos };
//# sourceMappingURL=listadoAnimalesVendidos.js.map