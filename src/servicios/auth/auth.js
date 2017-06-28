// src/services/auth.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';
import { Constantes } from '../constantes';
var auth0Config = {
    // needed for auth0
    clientID: Constantes.AUTH0_CLIENT_ID,
    // needed for auth0cordova
    clientId: Constantes.AUTH0_CLIENT_ID,
    domain: Constantes.AUTH0_DOMAIN,
    callbackURL: location.href,
    packageIdentifier: Constantes.AUTH0_PACKAGEIDENTIFIER
};
var AuthService = (function () {
    function AuthService(zone) {
        this.zone = zone;
        this.auth0 = new Auth0.WebAuth(auth0Config);
        this.user = this.getStorageVariable('profile');
        this.idToken = this.getStorageVariable('id_token');
    }
    AuthService.prototype.getStorageVariable = function (name) {
        console.log("LUIS SERENO EL LOCO");
        console.log(name);
        console.log(window.localStorage.getItem(name));
        return JSON.parse(window.localStorage.getItem(name));
    };
    AuthService.prototype.setStorageVariable = function (name, data) {
        window.localStorage.setItem(name, JSON.stringify(data));
    };
    AuthService.prototype.setIdToken = function (token) {
        this.idToken = token;
        this.setStorageVariable('id_token', token);
    };
    AuthService.prototype.setAccessToken = function (token) {
        this.accessToken = token;
        this.setStorageVariable('access_token', token);
    };
    AuthService.prototype.isAuthenticated = function () {
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return Date.now() < expiresAt;
    };
    AuthService.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var client = new Auth0Cordova(auth0Config);
            var options = {
                scope: 'openid profile offline_access'
            };
            client.authorize(options, function (err, authResult) {
                if (err) {
                    throw err;
                }
                _this.setIdToken(authResult.idToken);
                _this.setAccessToken(authResult.accessToken);
                var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                _this.setStorageVariable('expires_at', expiresAt);
                _this.auth0.client.userInfo(_this.accessToken, function (err, profile) {
                    if (err) {
                        throw err;
                    }
                    profile.user_metadata = profile.user_metadata || {};
                    _this.setStorageVariable('profile', profile);
                    _this.zone.run(function () {
                        _this.user = profile;
                    });
                    resolve(true);
                });
            });
        });
    };
    AuthService.prototype.logout = function () {
        window.localStorage.removeItem('profile');
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_at');
        this.idToken = null;
        this.accessToken = null;
        this.user = null;
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NgZone])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.js.map