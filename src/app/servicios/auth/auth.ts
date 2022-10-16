// src/app/services/auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Constantes } from '../genericos/constantes';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';
import { App } from '@capacitor/app';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';

declare let cordova: any;

const callbackUri = `${Constantes.AUTH_CONFIG.packageIdentifier}://${Constantes.AUTH_CONFIG.domain}/capacitor/${Constantes.AUTH_CONFIG.packageIdentifier}/callback`;
@Injectable()
export class CustomAuthService {
  //Auth0 = new auth0.WebAuth(Constantes.AUTH_CONFIG);
  //Client = new Auth0Cordova(Constantes.AUTH_CONFIG);
  Auth0 = null;
  Client = null;
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;
  onAuthFailureUrl: any;

  constructor(
    public zone: NgZone,
    private storage: Storage,
    private safariViewController: SafariViewController,
    public auth: AuthService
  ) {
    console.log("CONSTRUCTOR AUTH")
    this.initService();
  }

  async initService(){
    await this.storage.create();
    this.onAuthFailureUrl="www.marca.es";
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
  }

  public isAuthenticated():Promise<boolean> {
    console.log("isAuthenticated AUTH")
    return new Promise<boolean>((resolve) => {
      this.auth.isAuthenticated$.subscribe((text: boolean) => {
        console.log("EL VALOR DE LA AUTENTICACION ES " +  text);
        resolve(text);
      });
    });
  }

  loginNew(){
    return this.auth
		.buildAuthorizeUrl()
		.pipe(mergeMap((url) => {
			console.log ("URL MALA " + url);
			return Browser.open({ url, windowName: '_self' })
		})).subscribe();
  }

  getDataFromLogin(){
    console.log("callbackUri " + callbackUri);

    // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
    App.addListener('appUrlOpen', ({ url }) => {
      console.log("entra en appurlopen " + url);

      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      this.zone.run(() => {
        console.log("entra ngZonerun ");

        if (url?.startsWith(callbackUri)) {
          // If the URL is an authentication callback URL..
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            console.log("entra en handleredirectcallback")
            // Call handleRedirectCallback and close the browser
            this.auth
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => Browser.close()))
              .subscribe();
              this.auth.user$.subscribe(data=>{
                console.log("LUIS subscrito: " + data);
              });
          } else {
            console.log("entra BrowserClose ");

            Browser.close();
          }
        }
      });
    });
  }

  public getProfileUserData():Observable<any>{

    return this.auth.user$;
  }

  login():Promise<boolean> {
    console.log("login AUTH")
    this.loading = true;
    return new Promise<boolean>((resolve, reject) => {

      const options = {
        scope: 'openid profile offline_access'
      };
      // Authorize login request with Auth0: open login page and get auth results
      this.Client.authorize(options, (err, authResult) => {
        if (err) {
          this.zone.run(() => this.loading = false);
          resolve(false);
          throw err;
        }
        // Set access token
        this.storage.set('access_token', authResult.accessToken);
        this.accessToken = authResult.accessToken;
        // Set access token expiration
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        this.storage.set('expires_at', expiresAt);
        // Set logged in
        this.loading = false;
        this.loggedIn = true;
        // Fetch user's profile info
        this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
          if (err) {
            resolve(false);
            throw err;
          }
          this.storage.set('profile', profile).then(val =>
            this.zone.run(() => this.user = profile)
          );
          resolve(true);
        });
      });

    });

  }

  logout() {
    console.log("logout AUTH")
      this.accessToken = null;
      this.user = null;
      this.loggedIn = false;
      this.safariViewController.isAvailable()
        .then((available: boolean) => {
          const domain = Constantes.AUTH_CONFIG.domain;
          const clientId = Constantes.AUTH_CONFIG.clientId;
          const pkgId = Constantes.AUTH_CONFIG.packageIdentifier;
          const url = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${pkgId}://${domain}/cordova/${pkgId}/callback`;

          if (available) {
            this.safariViewController.show({ url })
            .subscribe((result: any) => {
                if(result.event === 'opened') console.log('Opened');
                else if(result.event === 'closed') console.log('Closed');

                if (result.event === 'loaded') {
                  console.log('Loaded');
                  this.storage.remove('profile');
                  this.storage.remove('access_token');
                  this.storage.remove('expires_at');
                  this.safariViewController.hide();
                }
              },
              (error: any) => console.error(error)
            );
          } else {
            // use fallback browser
            cordova.InAppBrowser.open(url, '_system');
          }
        }
      );
    }

}

