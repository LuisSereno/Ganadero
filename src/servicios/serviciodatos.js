var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';
import { Explotacion } from './beans/explotacion';
import { Hembra } from './beans/hembra';
import 'rxjs/add/operator/map';
var ServicioDatos = (function () {
    function ServicioDatos(http /* This is #2 */) {
        this.httpLocal = http;
        this.explotacion = new Explotacion();
    }
    ServicioDatos.prototype.obtenerDatosExplotacion = function (email) {
        console.log("entra en obtenerDatosExpltotacion");
        var params = new URLSearchParams();
        params.set('email', email.toString());
        return this.httpLocal.get('https://ganadero-146707.appspot.com/_ah/api/ganadero/v1/gandero/ususarios/obtener', { search: params }).map(function (res) { return res.json(); });
    };
    ServicioDatos.prototype.obtenerDatosGanado = function (idExplotacion) {
        console.log("entra en obtenerDatosGanado");
        var params = new URLSearchParams();
        params.set('idExplotacion', idExplotacion.toString());
        return this.httpLocal.get('https://ganadero-146707.appspot.com/_ah/api/ganadero/v1/gandero/animales/obtener', { search: params }).map(function (res) { return res.json(); });
    };
    ServicioDatos.prototype.obtenerDocumentos = function (idExplotacion) {
        console.log("entra en obtenerDatosGanado");
        var params = new URLSearchParams();
        params.set('idExplotacion', idExplotacion.toString());
        return this.httpLocal.get('https://ganadero-146707.appspot.com/_ah/api/ganadero/v1/gandero/documentos/obtener', { search: params }).map(function (res) { return res.json(); });
    };
    ServicioDatos.prototype.obtenerDatosOperaciones = function (idExplotacion, venta) {
        console.log("entra en obtenerDatosGanado");
        var params = new URLSearchParams();
        var tipo = 0;
        if (venta) {
            tipo = 1;
        }
        params.set('idExplotacion', idExplotacion.toString());
        params.set('tipo', tipo.toString());
        return this.httpLocal.get('https://ganadero-146707.appspot.com/_ah/api/ganadero/v1/gandero/compraVenta/obtener', { search: params }).map(function (res) { return res.json(); });
    };
    ServicioDatos.prototype.getExplotacion = function () {
        return this.explotacion;
    };
    ServicioDatos.prototype.setExplotacion = function (explo) {
        return this.explotacion = explo;
    };
    ServicioDatos.prototype.getBusquedaAscDesc = function (arrayAnimales) {
        var arrayResultado = new Array();
        if (arrayAnimales != null && arrayAnimales.length > 0) {
            var arrayHem = this.explotacion.getArrayHembras();
            var arrayMach = this.explotacion.getArrayMachos();
            var _loop_1 = function (anim) {
                var arrayAux = void 0;
                arrayAux = arrayHem.find(function (hemb) {
                    return +hemb.getId() === +anim.getId();
                });
                if (!arrayAux) {
                    arrayAux = arrayMach.find(function (mach) {
                        return +mach.getId() === +anim.getId();
                    });
                    if (arrayAux) {
                        arrayResultado.push(arrayAux);
                    }
                }
                else {
                    arrayResultado.push(arrayAux);
                }
            };
            for (var _i = 0, arrayAnimales_1 = arrayAnimales; _i < arrayAnimales_1.length; _i++) {
                var anim = arrayAnimales_1[_i];
                _loop_1(anim);
            }
        }
        return arrayResultado;
    };
    ServicioDatos.prototype.guardaModificaAnimal = function (guardado, animal) {
        var guardadoCorrecto = false;
        var url = "";
        if (guardado) {
            url = "src/assets/datos/ganado.json";
        }
        else {
            url = "src/assets/datos/ganado.json";
        }
        try {
            this.httpLocal.post(url, { animal: animal.toJSON(), idExplotacion: this.explotacion.getId() }).map(function (res) { return res.json(); });
            if (animal instanceof Hembra) {
                if (guardado) {
                    this.explotacion.getArrayHembras().push(animal);
                }
                else {
                    console.log("Es una modificacion");
                }
            }
            else {
                if (guardado) {
                    this.explotacion.getArrayMachos().push(animal);
                }
                else {
                    console.log("Es una modificacion");
                }
            }
            guardadoCorrecto = true;
        }
        catch (ex) {
            console.log(ex);
        }
        return guardadoCorrecto;
    };
    return ServicioDatos;
}());
ServicioDatos = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http /* This is #2 */])
], ServicioDatos);
export { ServicioDatos };
//# sourceMappingURL=serviciodatos.js.map