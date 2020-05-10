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
var ListVacEnf = (function () {
    function ListVacEnf() {
        this.arraySalida = new EventEmitter();
    }
    ListVacEnf.prototype.eliminarElementoArray = function (msg) {
        var index = this.model.indexOf(msg);
        if (index !== -1) {
            this.model.splice(index, 1);
        }
    };
    ListVacEnf.prototype.anadirElementoArray = function (elemento) {
        if (elemento.value != "") {
            if (this.model == null) {
                this.model = new Array();
            }
            this.model.push(elemento.value);
            elemento.value = null;
        }
        this.arraySalida.emit(this.model);
    };
    return ListVacEnf;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], ListVacEnf.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ListVacEnf.prototype, "texto", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ListVacEnf.prototype, "arraySalida", void 0);
ListVacEnf = __decorate([
    Component({
        selector: 'my-list-vacunasenfermedades',
        template: "\n      <ion-item>\n        <ion-label floating><ion-icon name='map' item-left class=\"color-iconos\"></ion-icon>{{texto}}</ion-label>\n        <ion-input type=\"string\" #elementoVacuna></ion-input>\n        <button ion-button clear item-right (click)='anadirElementoArray(elementoVacuna)'>\n            <ion-icon name=\"add-circle\"></ion-icon>\n        </button>\n      </ion-item>\n        <div *ngFor=\"let textoLabel of model; let n=index\" >\n         <ion-item>\n        \t  <ion-input type=\"string\" value=\"{{textoLabel}}\" disabled></ion-input>\n            <button ion-button clear item-right (click)=\"eliminarElementoArray(textoLabel)\">\n        \t    <ion-icon name=\"remove-circle\" ></ion-icon>\n            </button>\n         </ion-item>\n        </div>   \n    \n    "
    })
], ListVacEnf);
export { ListVacEnf };
//# sourceMappingURL=listaVacunasEnfermedades.js.map