import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, Modal } from 'ionic-angular';
//import { StatusBar, Splashscreen } from 'ionic-native';
//import {ToolBarMenu} from '../pages/toolbarMenu/toolbarMenu';
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilAutenticacion } from '../pages/profile/profile';
import {ListaDocumentos} from '../pages/listadoDocumentos/listado';
import {ListaGanado} from '../pages/listadoGanado/listado';
import {ListaVentas} from '../pages/listadoVentas/listado';
import { Informes } from '../pages/informes/informes';
import {DetalleExplotacion} from '../pages/ajustes/explotacion/nueva/nueva';
import {ListaExplotaciones} from '../pages/ajustes/explotacion/listado/listado';
import {AuthService} from '../servicios/auth/auth';
import {ServicioDatos} from '../servicios/serviciodatos';
import {Explotacion} from '../servicios/beans/explotacion';
import {Usuario} from '../servicios/beans/usuario';
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


  constructor(private platform: Platform,public menuCtrl: MenuController,public auth: AuthService,public servicio: ServicioDatos) {
  //  constructor(private platform: Platform,public menuCtrl: MenuController,public servicio: ServicioDatos) {
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
      { title: 'Informes', component: Informes },
    ];
  }

    ngOnInit(){
      console.log("YA ESTA CARGADO EL AUTH ASI QUE AVANZA");

        if(!this.auth.isAuthenticated()) {
           this.rootPage = PerfilAutenticacion;
       }else{
           this.cargarListadoGanadoInicio(this.auth.user.email);
       }
               //     
      //this.cargarListadoGanadoInicio("luisalbertosereno@gmail.com");
    }

    private cargarListadoGanadoInicio(email:string){
      var arrayExplotaciones:Array<Explotacion>=new Array<Explotacion>();
      this.servicio.obtenerDatosExplotacion(email).subscribe(data => {

        var usu:Usuario=new Usuario ();
        usu.setId(data.identificador);
        usu.setEmail(data.email);
        usu.setNombre(data.nombre);
        usu.setMetaDatoEmail(data.metadatoEmail);
        usu.setMetaDatoFechaMod(data.metadatoFechaMod);
        this.servicio.setUsuario(usu);
        if (data.explotaciones){
          for (let explo of data.explotaciones){
            let explotacionAux:Explotacion=Explotacion.fromJSON(explo);
            explotacionAux.setUsuario(usu);
            arrayExplotaciones.push(explotacionAux);
          }
        }
        this.nav.push(ListaExplotaciones,{explotaciones:arrayExplotaciones});
     }, (error) => {
       if (error.status==404){
         //let guardado:boolean=this.servicio.guardaUsuario(this.auth.user.name,this.auth.user.email);
         let claveGuardado=this.servicio.guardaUsuario(this.auth.user.name,this.auth.user.email).then(data => {
             if (data){
              console.log("Hay clave de guardado");
              this.servicio.setUsuario(data);
              this.rootPage=DetalleExplotacion;
             }else{
               console.log("No hay clave de guardado");
               this.rootPage = PerfilAutenticacion;
             }
          },err => {
              console.log("Errr al guardar los datos del Usuario!");
              this.rootPage = PerfilAutenticacion;
          });
       }else{
         console.log('No se puede cargar el listado');
         console.log(error);
       }

    });

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
