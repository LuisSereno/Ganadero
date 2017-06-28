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
import { ListaDocumentos } from '../listadoDocumentos/listado';
import { ListaGanado } from '../listadoGanado/listado';
import { ListaVentas } from '../listadoVentas/listado';
import { NavController } from 'ionic-angular';
//import {AuthService} from '../../servicios/auth/auth';
var ToolBarMenu = (function () {
    // constructor(public menuCtrl: MenuController,private _auth: AuthService) {
    function ToolBarMenu(navCtrl) {
        this.navCtrl = navCtrl;
        // make HelloIonicPage the root (or first) page
        this.rootPage = ListaGanado;
        console.log("El constructor de app.ts");
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Ganado', component: ListaGanado },
            { title: 'Documentos', component: ListaDocumentos },
            { title: 'Ventas', component: ListaVentas },
        ];
    }
    ToolBarMenu.prototype.initializeApp = function () {
        console.log("Se inicializala apliciacion con el initializeApp");
    };
    ToolBarMenu.prototype.ngOnInit = function () {
        console.log("Se inicializala apliciacion con el ngOnInit");
    };
    ToolBarMenu.prototype.openPage = function (page) {
        this.navCtrl.setRoot(page.component);
    };
    ToolBarMenu.prototype.logoutApp = function () {
        //  this._auth.logout();
        //this.platform.exitApp();
        location.reload();
    };
    return ToolBarMenu;
}());
ToolBarMenu = __decorate([
    Component({
        templateUrl: 'toolbarMenu.html',
    }),
    __metadata("design:paramtypes", [NavController])
], ToolBarMenu);
export { ToolBarMenu };
//# sourceMappingURL=toolbarMenu.js.map