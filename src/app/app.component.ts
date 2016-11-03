import { Component, } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {ToolBarMenu} from '../pages/toolbarMenu/toolbarMenu';
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilAutenticacion } from '../pages/profile/profile';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [  ]
})
export class MyApp {
  rootPage = PerfilAutenticacion;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
