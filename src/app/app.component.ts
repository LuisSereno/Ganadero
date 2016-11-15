import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, NavController, Modal } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {ToolBarMenu} from '../pages/toolbarMenu/toolbarMenu';
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilAutenticacion } from '../pages/profile/profile';
import {ListaDocumentos} from '../pages/listadoDocumentos/listado';
import {ListaGanado} from '../pages/listadoGanado/listado';
import {ListaVentas} from '../pages/listadoVentas/listado';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html',
  providers: [  ]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage = ListaGanado;

  pages: Array<{title: string, component: any}>;


  constructor(platform: Platform,public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

     console.log("El constructor de app.ts");
    
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Ganado', component: ListaGanado },
      { title: 'Documentos', component: ListaDocumentos },
      { title: 'Ventas', component: ListaVentas },
    ];
  }

    initializeApp() {
      console.log("Se inicializala apliciacion con el initializeApp");
    }

   ngOnInit() {
     console.log("Se inicializala apliciacion con el ngOnInit");
   }

    openPage(page) { 
      this.nav.setRoot(page.component);
      this.menuCtrl.close();
    }

   logoutApp(){
   //  this._auth.logout();
     //this.platform.exitApp();
     location.reload();
   }



}
