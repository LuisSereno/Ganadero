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
import { Hembra } from '../../servicios/beans/hembra';
import { Macho } from '../../servicios/beans/macho';
import { Venta } from '../../servicios/beans/venta';
import { Detalle } from '../detalle/detalle';
import { ListadoAnimalesVendidos } from '../listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos';
import { Nuevo } from '../nuevo/nuevo';
import { NavController, NavParams } from 'ionic-angular';
import { ServicioDatos } from '../../servicios/serviciodatos';
import { Constantes } from '../../servicios/constantes';
var ListaGanado = (function () {
    function ListaGanado(navCtrl, params, servicio) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.servicio = servicio;
        //Este valor dependera de lo que seas tu, asi se te mostrara el primero
        this.tipoMostrado = "hembras";
    }
    ListaGanado.prototype.ionViewWillEnter = function () {
        if (this.venta == Constantes.COMPRA || this.venta == Constantes.VENTA) {
            var animalesTotales = this.params.get("animales");
            if (animalesTotales) {
                for (var _i = 0, animalesTotales_1 = animalesTotales; _i < animalesTotales_1.length; _i++) {
                    var anim = animalesTotales_1[_i];
                    if (anim instanceof Macho) {
                        this.arrayMachos.push(anim);
                    }
                    else if (anim instanceof Hembra) {
                        this.arrayHembras.push(anim);
                    }
                }
            }
        }
        else if (this.venta == Constantes.VENTA_VENDER) {
            this.arrayMachos = this.servicio.getExplotacion().getArrayMachos();
            this.arrayHembras = this.servicio.getExplotacion().getArrayHembras();
            this.checkedItemsHembras = new Array(this.arrayHembras.length);
            this.checkedItemsMachos = new Array(this.arrayMachos.length);
        }
        else {
            this.venta = Constantes.INDEFINIDO;
            this.arrayMachos = this.servicio.getExplotacion().getArrayMachos();
            this.arrayHembras = this.servicio.getExplotacion().getArrayHembras();
            if (this.arrayMachos.length == 0 && this.arrayHembras.length == 0) {
                this.llamadaServicio();
            }
        }
    };
    ListaGanado.prototype.ionViewDidLoad = function () {
        console.log("Se inicializala la pagina ionViewDidLoad cuando cambias en el menu");
        this.arrayHembras = new Array();
        this.arrayMachos = new Array();
        this.venta = this.params.get("venta");
        if (this.venta != Constantes.COMPRA && this.venta != Constantes.VENTA && this.venta != Constantes.VENTA_VENDER) {
            this.venta = Constantes.INDEFINIDO;
        }
    };
    ListaGanado.prototype.transformIdAnimal = function () {
        var animalCompleto = null;
        for (var _i = 0, _a = this.arrayHembras; _i < _a.length; _i++) {
            var hem = _a[_i];
            var arrayVacio = new Array();
            if (hem.getAscendencia() != null) {
                var _loop_1 = function (dat) {
                    animalCompleto = this_1.arrayHembras.find(function (hemb) {
                        return +hemb.getId() === +dat;
                    });
                    if (animalCompleto) {
                        dat = animalCompleto;
                    }
                    else {
                        animalCompleto = this_1.arrayMachos.find(function (hemb) {
                            return +hemb.getId() === +dat;
                        });
                        if (animalCompleto) {
                            dat = animalCompleto;
                        }
                        else {
                            dat = null;
                        }
                    }
                    arrayVacio.push(dat);
                };
                var this_1 = this;
                for (var _b = 0, _c = hem.getAscendencia(); _b < _c.length; _b++) {
                    var dat = _c[_b];
                    _loop_1(dat);
                }
                hem.setAscendencia(arrayVacio);
            }
            if (hem.getDescendencia() != null) {
                var _loop_2 = function (dat) {
                    animalCompleto = this_2.arrayHembras.find(function (hemb) {
                        return +hemb.getId() === +dat;
                    });
                    if (animalCompleto) {
                        dat = animalCompleto;
                    }
                    else {
                        animalCompleto = this_2.arrayMachos.find(function (hemb) {
                            return +hemb.getId() === +dat;
                        });
                        if (animalCompleto) {
                            dat = animalCompleto;
                        }
                        else {
                            dat = null;
                        }
                    }
                    arrayVacio.push(dat);
                };
                var this_2 = this;
                for (var _d = 0, _e = hem.getDescendencia(); _d < _e.length; _d++) {
                    var dat = _e[_d];
                    _loop_2(dat);
                }
                hem.setDescendencia(arrayVacio);
            }
        }
        for (var _f = 0, _g = this.arrayMachos; _f < _g.length; _f++) {
            var mach = _g[_f];
            var arrayVacio = new Array();
            if (mach.getAscendencia() != null) {
                var _loop_3 = function (dat) {
                    animalCompleto = this_3.arrayHembras.find(function (hemb) {
                        return +hemb.getId() === +dat;
                    });
                    if (animalCompleto) {
                        dat = animalCompleto;
                    }
                    else {
                        animalCompleto = this_3.arrayMachos.find(function (hemb) {
                            return +hemb.getId() === +dat;
                        });
                        if (animalCompleto) {
                            dat = animalCompleto;
                        }
                        else {
                            dat = null;
                        }
                    }
                    arrayVacio.push(dat);
                };
                var this_3 = this;
                for (var _h = 0, _j = mach.getAscendencia(); _h < _j.length; _h++) {
                    var dat = _j[_h];
                    _loop_3(dat);
                }
                mach.setAscendencia(arrayVacio);
            }
            if (mach.getDescendencia() != null) {
                var _loop_4 = function (dat) {
                    animalCompleto = this_4.arrayHembras.find(function (hemb) {
                        return +hemb.getId() === +dat;
                    });
                    if (animalCompleto) {
                        dat = animalCompleto;
                    }
                    else {
                        animalCompleto = this_4.arrayMachos.find(function (hemb) {
                            return +hemb.getId() === +dat;
                        });
                        if (animalCompleto) {
                            dat = animalCompleto;
                        }
                        else {
                            dat = null;
                        }
                    }
                    arrayVacio.push(dat);
                };
                var this_4 = this;
                for (var _k = 0, _l = mach.getDescendencia(); _k < _l.length; _k++) {
                    var dat = _l[_k];
                    _loop_4(dat);
                }
                mach.setDescendencia(arrayVacio);
            }
        }
    };
    ListaGanado.prototype.detalle = function (animalito) {
        if (this.venta == Constantes.INDEFINIDO) {
            this.navCtrl.push(Detalle, { animal: animalito });
        }
    };
    ListaGanado.prototype.nuevo = function (sexo) {
        var animalito;
        if (sexo == Constantes.MACHO) {
            animalito = new Macho(null, null, null, null, null, null, null, null, null, null, null, null);
        }
        else {
            animalito = new Hembra(null, null, null, null, null, null, null, null, null, null, null, null, null);
        }
        this.navCtrl.push(Nuevo, { animal: animalito });
    };
    ListaGanado.prototype.enviarResultadoAVentas = function () {
        var arrayAnimales = new Array();
        for (var value in this.checkedItemsHembras) {
            arrayAnimales.push(this.arrayHembras[value]);
        }
        for (var value in this.checkedItemsMachos) {
            arrayAnimales.push(this.arrayMachos[value]);
        }
        this.navCtrl.push(ListadoAnimalesVendidos, { animalesSeleccionados: arrayAnimales, operacion: new Venta(null, null, null, null, null) });
    };
    ListaGanado.prototype.llamadaServicio = function () {
        var _this = this;
        this.servicio.obtenerDatosGanado(this.servicio.getExplotacion().getId()).subscribe(function (data) {
            _this.arrayHembras = new Array();
            _this.arrayMachos = new Array();
            if (data.arrayMachos != undefined) {
                for (var _i = 0, _a = data.arrayMachos; _i < _a.length; _i++) {
                    var mach = _a[_i];
                    var machito = Macho.fromJSON(mach);
                    _this.arrayMachos.push(machito);
                }
            }
            if (data.arrayHembras != undefined) {
                for (var _b = 0, _c = data.arrayHembras; _b < _c.length; _b++) {
                    var hem = _c[_b];
                    var hembrita = Hembra.fromJSON(hem);
                    _this.arrayHembras.push(hembrita);
                }
            }
            _this.transformIdAnimal();
            _this.servicio.getExplotacion().setArrayHembras(_this.arrayHembras);
            _this.servicio.getExplotacion().setArrayMachos(_this.arrayMachos);
        }, function (err) {
            console.log("Errr al obtener los datos del ganado!");
        });
    };
    return ListaGanado;
}());
ListaGanado = __decorate([
    Component({
        templateUrl: 'listado.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ServicioDatos])
], ListaGanado);
export { ListaGanado };
//# sourceMappingURL=listado.js.map