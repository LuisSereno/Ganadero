import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, NavController, Modal } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
//import {ToolBarMenu} from '../pages/toolbarMenu/toolbarMenu';
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilAutenticacion } from '../pages/profile/profile';
import {ListaDocumentos} from '../pages/listadoDocumentos/listado';
import {ListaGanado} from '../pages/listadoGanado/listado';
import {ListaVentas} from '../pages/listadoVentas/listado';
import {AuthService} from '../servicios/auth/auth';
import {ServicioDatos} from '../servicios/serviciodatos';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage = null;

  pages: Array<{title: string, component: any}>;


  constructor(platform: Platform,public menuCtrl: MenuController,public auth: AuthService,public servicio: ServicioDatos) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

     console.log("El constructor de app.ts");

      if(!this.auth.authenticated()) {
        console.log("ENTRA AQUI PORQUE NO HAY AUTH")
        //this.navCtrl.push(TabsPage);
        this.rootPage=PerfilAutenticacion;
      }
      
    // set our app's pages
    this.pages = [
      { title: 'Ganado', component: ListaGanado },
      { title: 'Documentos', component: ListaDocumentos },
      { title: 'Ventas', component: ListaVentas },
    ];
  }

    ionViewDidLoad(){
      console.log("YA ESTA CARGADO EL AUTH ASI QUE AVANZA");
      this.servicio.obtenerDatosExplotacion("luisalbertosereno@gmail.com");
      this.rootPage=ListaGanado;
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
