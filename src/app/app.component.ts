import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, NavController, Modal } from 'ionic-angular';
//import { StatusBar, Splashscreen } from 'ionic-native';
//import {ToolBarMenu} from '../pages/toolbarMenu/toolbarMenu';
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilAutenticacion } from '../pages/profile/profile';
import {ListaDocumentos} from '../pages/listadoDocumentos/listado';
import {ListaGanado} from '../pages/listadoGanado/listado';
import {ListaVentas} from '../pages/listadoVentas/listado';
import {AuthService} from '../servicios/auth/auth';
import {ServicioDatos} from '../servicios/serviciodatos';
import { MenuController } from 'ionic-angular';
// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage = null;

  pages: Array<{title: string, component: any}>;


  //constructor(private platform: Platform,public menuCtrl: MenuController,public auth: AuthService,public servicio: ServicioDatos) {
    constructor(private platform: Platform,public menuCtrl: MenuController,public servicio: ServicioDatos) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
   //   StatusBar.styleDefault();
    //  Splashscreen.hide();
    });

     console.log("El constructor de app.ts");

      // Add this function
      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };

    // set our app's pages
    this.pages = [
      { title: 'Ganado', component: ListaGanado },
      { title: 'Documentos', component: ListaDocumentos },
      { title: 'Ventas', component: ListaVentas },
    ];
  }

    ngOnInit(){
      console.log("YA ESTA CARGADO EL AUTH ASI QUE AVANZA");
     
      //  if(!this.auth.isAuthenticated()) {
      //     this.rootPage = PerfilAutenticacion;
      //  }else{
      //     this.cargarListadoGanadoInicio(this.auth.user.email);
      //  }
      this.cargarListadoGanadoInicio("luisalbertosereno@gmail.com");
    }

    private cargarListadoGanadoInicio(email:string){
      this.servicio.obtenerDatosExplotacion(email);
      this.rootPage=ListaGanado;
    }


    openPage(page) { 
      this.nav.setRoot(page.component);
      this.menuCtrl.close();
    }

   logoutApp(){
     //this.auth.logout();
     //this.platform.exitApp();
     location.reload();
   }




}
