// src/services/auth.service.ts

import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

import {Constantes} from '../constantes';


const auth0Config = {
  // needed for auth0
  clientID: Constantes.AUTH0_CLIENT_ID,

  // needed for auth0cordova
  clientId: Constantes.AUTH0_CLIENT_ID,
  domain: Constantes.AUTH0_DOMAIN,
  callbackURL: location.href,
  packageIdentifier: Constantes.AUTH0_PACKAGEIDENTIFIER
};


@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  constructor(public zone: NgZone) {
    this.user = this.getStorageVariable('profile');
    this.idToken = this.getStorageVariable('id_token');
    this.accessToken = this.getStorageVariable('access_token');
  }

  private getStorageVariable(name) {
    console.log("LUIS SERENO EL LOCO");
    console.log(name);
    console.log(window.localStorage.getItem(name));
    var datosRespuesta="";
    try{
      datosRespuesta= JSON.parse(window.localStorage.getItem(name));
    }catch(err){
      console.warn(err);
      datosRespuesta= window.localStorage.getItem(name);
    }
    return datosRespuesta;
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public login():Promise<boolean> {


     return new Promise<boolean>((resolve, reject) => {

         const client = new Auth0Cordova(auth0Config);

        const options = {
          scope: 'openid profile offline_access'
        };

        client.authorize(options, (err, authResult) => {
          if(err) {
            throw err;
          }

          this.setIdToken(authResult.idToken);
          this.setAccessToken(authResult.accessToken);

          const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
          this.setStorageVariable('expires_at', expiresAt);

          this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            if(err) {
              throw err;
            }

            profile.user_metadata = profile.user_metadata || {};
            this.setStorageVariable('profile', profile);
            this.zone.run(() => {
              this.user = profile;
            });
             resolve(true);
          });
        });

    });

  }

  public logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;
  }

}