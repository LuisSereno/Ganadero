// src/app/services/auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';

// Import AUTH_CONFIG, Auth0Cordova, and auth0.js
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Constantes } from '../genericos/constantes';

declare let cordova: any;

@Injectable()
export class AuthService {
  Auth0 = new auth0.WebAuth(Constantes.AUTH_CONFIG);
  Client = new Auth0Cordova(Constantes.AUTH_CONFIG);
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;
  onAuthFailureUrl: any;

  constructor(
    public zone: NgZone,
    private storage: Storage,
    private safariViewController: SafariViewController
  ) {
    console.log("CONSTRUCTOR AUTH")
    this.onAuthFailureUrl="www.marca.es";
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
  }

  public isAuthenticated():boolean {
    console.log("isAuthenticated AUTH")
    let expiresAt = null;
    this.storage.get('expires_at').then(token => expiresAt = token);
    let valor:boolean=Date.now() < expiresAt;
    return valor;
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

