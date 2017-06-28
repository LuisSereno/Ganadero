var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import {NavController} from 'ionic-angular';
import { Component } from '@angular/core';
import { Hembra } from '../../servicios/beans/hembra';
import { Macho } from '../../servicios/beans/macho';
import { Venta } from '../../servicios/beans/venta';
import { Compra } from '../../servicios/beans/compra';
import { ListaGanado } from '../listadoGanado/listado';
import { Nuevo } from '../nuevo/nuevo';
import { NavController } from 'ionic-angular';
import { ServicioDatos } from '../../servicios/serviciodatos';
import { Constantes } from '../../servicios/constantes';
var ListaVentas = (function () {
    function ListaVentas(navCtrl, servicio) {
        this.navCtrl = navCtrl;
        this.servicio = servicio;
        //Este valor dependera de lo que seas tu, asi se te mostrara el primero
        this.tipoMostrado = "ventas";
    }
    ListaVentas.prototype.ionViewDidLoad = function () {
        this.arrayVentas = new Array();
        this.arrayCompras = new Array();
    };
    ListaVentas.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.arrayVentas = this.servicio.getExplotacion().getArrayVentas();
        this.arrayCompras = this.servicio.getExplotacion().getArrayCompras();
        if (this.arrayVentas.length == 0) {
            this.servicio.obtenerDatosOperaciones(this.servicio.getExplotacion().getId(), true).subscribe(function (data) {
                console.log("guapito de cara");
                console.log(data);
                var arrayTotal = new Array();
                var machito;
                var hembrita;
                var venta;
                if (data.compraVentas) {
                    for (var _i = 0, _a = data.compraVentas; _i < _a.length; _i++) {
                        var mach = _a[_i];
                        if (mach.animales) {
                            for (var _b = 0, _c = mach.animales; _b < _c.length; _b++) {
                                var array = _c[_b];
                                if (array.sexo == Constantes.HEMBRA) {
                                    machito = Macho.fromJSON(array);
                                    arrayTotal.push(machito);
                                }
                                else if (array.sexo == Constantes.MACHO) {
                                    hembrita = Hembra.fromJSON(array);
                                    arrayTotal.push(hembrita);
                                }
                            }
                        }
                        venta = Venta.fromJSON(mach);
                        venta.setAnimales(arrayTotal);
                        _this.arrayVentas.push(venta);
                        _this.servicio.getExplotacion().setArrayVentas(_this.arrayVentas);
                    }
                }
            }, function (err) {
                console.log("Errr al obtener los datos de la venta del ganado!" + err);
            });
        }
        if (this.arrayCompras.length == 0) {
            this.servicio.obtenerDatosOperaciones(this.servicio.getExplotacion().getId(), false).subscribe(function (data) {
                console.log("guapito de cara");
                console.log(data);
                var arrayTotal = new Array();
                var machito;
                var hembrita;
                var compra;
                if (data.compraVentas) {
                    for (var _i = 0, _a = data.compraVentas; _i < _a.length; _i++) {
                        var mach = _a[_i];
                        if (mach.animales) {
                            for (var _b = 0, _c = mach.animales; _b < _c.length; _b++) {
                                var array = _c[_b];
                                if (array.sexo == Constantes.HEMBRA) {
                                    machito = Macho.fromJSON(array);
                                    arrayTotal.push(machito);
                                }
                                else if (array.sexo == Constantes.MACHO) {
                                    hembrita = Hembra.fromJSON(array);
                                    arrayTotal.push(hembrita);
                                }
                            }
                        }
                        compra = Compra.fromJSON(mach);
                        compra.setAnimales(arrayTotal);
                        _this.arrayCompras.push(compra);
                        _this.servicio.getExplotacion().setArrayCompras(_this.arrayCompras);
                    }
                }
            }, function (err) {
                console.log("Errr al obtener los datos de la compra del ganado!" + err);
            });
        }
    };
    /*	 ionViewWillEnter() {
            if (this.arrayVentas.length==0){
                this.arrayVentas=this.servicio.getExplotacion().getArrayVentas();
            }
    
            if (this.arrayCompras.length==0){
                this.arrayCompras=this.servicio.getExplotacion().getArrayCompras();
            }
         }
    
         ionViewDidLeave(){
            alert("vacio movidas memoria");
            this.arrayVentas=new Array<Venta>();
            this.arrayCompras=new Array<Compra>();
         }
    */
    ListaVentas.prototype.verListadoAnimales = function (animalitos, tipoOperacion) {
        this.navCtrl.push(ListaGanado, { animales: animalitos, venta: tipoOperacion });
    };
    ListaVentas.prototype.anadirDatosVentas = function () {
        this.navCtrl.push(ListaGanado, { venta: Constantes.VENTA_VENDER });
    };
    ListaVentas.prototype.anadirDatosCompras = function () {
        this.navCtrl.push(Nuevo, { animal: null, compra: Constantes.COMPRA_COMPRA });
    };
    return ListaVentas;
}());
ListaVentas = __decorate([
    Component({
        templateUrl: 'listado.html'
    }),
    __metadata("design:paramtypes", [NavController, ServicioDatos])
], ListaVentas);
export { ListaVentas };
//# sourceMappingURL=listado.js.map