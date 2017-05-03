import { ErrorHandler,NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { PerfilAutenticacion } from '../pages/profile/profile';
import { ListaGanado } from '../pages/listadoGanado/listado';
import { ListaDocumentos } from '../pages/listadoDocumentos/listado';
import { ListaVentas } from '../pages/listadoVentas/listado';
import { Cabecera } from '../pages/cabecera/cabecera';
import { Detalle } from '../pages/detalle/detalle';
import {ListVacEnf} from '../pages/listadoVacunasEnfermedades/listaVacunasEnfermedades';
import {AscDesc} from '../pages/listadoAscendenciaDescendencia/listaAscendenciaDescendencia';
import { IonicStorageModule,Storage } from '@ionic/storage';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from '../servicios/auth/auth';
import { ServicioDatos } from '../servicios/serviciodatos';
import { Http } from '@angular/http';
import {Nuevo} from '../pages/nuevo/nuevo'



//let storage: Storage = new Storage();

export function getAuthHttp(http, storage) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}


@NgModule({
  declarations: [
    MyApp,
    PerfilAutenticacion,
    ListaGanado,
    ListaVentas,
    Detalle,
    ListaDocumentos,
    Cabecera,
    Nuevo,
    ListVacEnf,
    AscDesc
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListaVentas,
    PerfilAutenticacion,
    ListaGanado,
    Detalle,
    ListaDocumentos,
    Nuevo
  ],
  providers: [

    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    ServicioDatos,
    Camera,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http,Storage]
    }    
  ]
})
export class AppModule {}
