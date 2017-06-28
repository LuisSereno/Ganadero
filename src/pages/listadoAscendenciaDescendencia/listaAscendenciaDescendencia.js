var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServicioDatos } from '../../servicios/serviciodatos';
import { Macho } from '../../servicios/beans/macho';
var AscDesc = (function () {
    function AscDesc(servicio) {
        this.servicio = servicio;
        this.arraySalida = new EventEmitter();
        console.log("entra en el constructor de listaAscendenciaDescendencia");
        this.macho = new Array();
        this.hembra = new Array();
    }
    AscDesc.prototype.ngOnInit = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim instanceof Macho) {
                    this.macho.push(anim.getId());
                }
                else {
                    this.hembra.push(anim.getId());
                }
            }
        }
    };
    AscDesc.prototype.onChange = function (tipo) {
        var arrayAux;
        //vaciamos el array de model para que no se solapen vacas y toros y no haya mas de la cuenta
        this.model = new Array();
        if (this.macho && !(this.macho instanceof Array)) {
            arrayAux = new Array();
            arrayAux.push(this.macho);
            this.macho = arrayAux;
        }
        if (this.hembra && !(this.hembra instanceof Array)) {
            arrayAux = new Array();
            arrayAux.push(this.hembra);
            this.hembra = arrayAux;
        }
        var _loop_1 = function (i) {
            var ani = this_1.servicio.getExplotacion().getArrayMachos().find(function (x) { return x.getId() == i; });
            if (ani) {
                this_1.model.push(ani);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.macho; _i < _a.length; _i++) {
            var i = _a[_i];
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            var ani = this_2.servicio.getExplotacion().getArrayHembras().find(function (x) { return x.getId() == i; });
            if (ani) {
                this_2.model.push(ani);
            }
        };
        var this_2 = this;
        for (var _b = 0, _c = this.hembra; _b < _c.length; _b++) {
            var i = _c[_b];
            _loop_2(i);
        }
        console.log("this.model");
        console.log(this.model);
        this.arraySalida.emit(this.model);
    };
    AscDesc.prototype.comprobarDentroArray = function (animal) {
        if (this.model) {
            var ani = this.model.find(function (x) { return x.getId() == animal.getId(); });
            console.log("luisin");
            console.log(ani);
            if (ani) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    return AscDesc;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], AscDesc.prototype, "model", void 0);
__decorate([
    Input('tipo'),
    __metadata("design:type", Boolean)
], AscDesc.prototype, "tipo", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AscDesc.prototype, "texto", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AscDesc.prototype, "arraySalida", void 0);
AscDesc = __decorate([
    Component({
        selector: 'my-list-opcionesAscDesc',
        templateUrl: 'listaAscendenciaDescendencia.html'
    }),
    __metadata("design:paramtypes", [ServicioDatos])
], AscDesc);
export { AscDesc };
//# sourceMappingURL=listaAscendenciaDescendencia.js.map