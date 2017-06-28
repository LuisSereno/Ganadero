var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// app/pages/profile/profile.ts
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth';
import { MyApp } from '../../app/app.component';
var PerfilAutenticacion = (function () {
    // We need to inject AuthService so that we can
    // use it in the view,public servicio: ServicioDatos
    function PerfilAutenticacion(navCtrl, auth) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        console.log("ENTRA AQUI EN PROFILE");
    }
    PerfilAutenticacion.prototype.logearse = function () {
        var _this = this;
        if (!this.auth.isAuthenticated()) {
            this.auth.login().then(function (data) {
                console.log("El valor que retorna login es");
                console.log(data);
                _this.navCtrl.setRoot(MyApp);
            }, function (err) {
                console.log("Errr al obtener los datos del Usuario!");
            });
        }
        else {
            this.navCtrl.setRoot(MyApp);
        }
    };
    return PerfilAutenticacion;
}());
PerfilAutenticacion = __decorate([
    Component({
        templateUrl: 'profile.html'
    }),
    __metadata("design:paramtypes", [NavController, AuthService])
], PerfilAutenticacion);
export { PerfilAutenticacion };
//# sourceMappingURL=profile.js.map