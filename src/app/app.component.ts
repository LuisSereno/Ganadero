import { Component, NgZone, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { RoutingState } from './routing-state.service';
import {CustomAuthService} from './servicios/auth/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    routingState: RoutingState,public auth: CustomAuthService
  ) {
    routingState.loadRouting();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  ngOnInit(): void {
    console.log ("ngOnInit appcomponent getDataFromLogin");
    this.auth.getDataFromLogin();
  }

}
