import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    console.log("CONSTRUCTOR APPCOMPONENT");
    this.initializeApp();
  }

  initializeApp() {
    console.log("initializeApp APPCOMPONENT");
    this.platform.ready().then(() => {
      console.log("initializeApp2 APPCOMPONENT");
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
