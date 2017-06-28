var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { ListaDocumentos } from '../pages/listadoDocumentos/listado';
import { ListaGanado } from '../pages/listadoGanado/listado';
import { ListaVentas } from '../pages/listadoVentas/listado';
import { DetalleExplotacion } from '../pages/ajustes/explotacion/nueva/nueva';
import { ListaExplotaciones } from '../pages/ajustes/explotacion/listado/listado';
import { ServicioDatos } from '../servicios/serviciodatos';
import { Explotacion } from '../servicios/beans/explotacion';
import { MenuController } from 'ionic-angular';
// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';
var MyApp = (function () {
    //constructor(private platform: Platform,public menuCtrl: MenuController,public auth: AuthService,public servicio: ServicioDatos) {
    function MyApp(platform, menuCtrl, servicio) {
        this.platform = platform;
        this.menuCtrl = menuCtrl;
        this.servicio = servicio;
        this.rootPage = null;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //   StatusBar.styleDefault();
            //  Splashscreen.hide();
        });
        console.log("El constructor de app.ts");
        // Add this function
        window.handleOpenURL = function (url) {
            Auth0Cordova.onRedirectUri(url);
        };
        // set our app's pages
        this.pages = [
            { title: 'Ganado', component: ListaGanado },
            { title: 'Documentos', component: ListaDocumentos },
            { title: 'Ventas', component: ListaVentas },
        ];
    }
    MyApp.prototype.ngOnInit = function () {
        console.log("YA ESTA CARGADO EL AUTH ASI QUE AVANZA");
        //  if(!this.auth.isAuthenticated()) {
        //     this.rootPage = PerfilAutenticacion;
        //  }else{
        //     this.cargarListadoGanadoInicio(this.auth.user.email);
        //  }
        this.cargarListadoGanadoInicio("luisalbertosereno@gmail.com");
    };
    MyApp.prototype.cargarListadoGanadoInicio = function (email) {
        var _this = this;
        var arrayExplotaciones = new Array();
        this.servicio.obtenerDatosExplotacion(email).subscribe(function (data) {
            for (var _i = 0, _a = data.explotaciones; _i < _a.length; _i++) {
                var explo = _a[_i];
                var explotacionAux = Explotacion.fromJSON(explo);
                explotacionAux.setEmailUsu(data["email"]);
                arrayExplotaciones.push(explotacionAux);
            }
            if (arrayExplotaciones.length == 0) {
                _this.rootPage = DetalleExplotacion;
            }
            else if (arrayExplotaciones.length > 1) {
                _this.nav.push(ListaExplotaciones, { explotaciones: arrayExplotaciones });
            }
            else {
                _this.servicio.setExplotacion(arrayExplotaciones.pop());
                _this.rootPage = ListaGanado;
            }
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
        this.menuCtrl.close();
    };
    MyApp.prototype.logoutApp = function () {
        //this.auth.logout();
        //this.platform.exitApp();
        location.reload();
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, MenuController, ServicioDatos])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map