import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import {ListaDocumentos} from '../listadoDocumentos/listado';
import {ListaGanado} from '../listadoGanado/listado';
import {ListaVentas} from '../listadoVentas/listado';
import { NavController } from 'ionic-angular';
//import {AuthService} from '../../servicios/auth/auth';

@Component({
  templateUrl: 'toolbarMenu.html',
  //providers: [AuthService]
})
export class ToolBarMenu{
  // make HelloIonicPage the root (or first) page
  rootPage: any = ListaGanado;
  pages: Array<{title: string, component: any}>;

// constructor(public menuCtrl: MenuController,private _auth: AuthService) {
constructor(public menuCtrl: MenuController,public navCtrl: NavController) {
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

 logoutApp(){
 //  this._auth.logout();
   //this.platform.exitApp();
   location.reload();
 }

}
