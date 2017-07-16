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
import { Informes } from '../pages/informes/informes';
import { ListadoAnimalesVendidos } from '../pages/listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos';
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
import {DetalleExplotacion} from '../pages/ajustes/explotacion/nueva/nueva';
import {ListaExplotaciones} from '../pages/ajustes/explotacion/listado/listado';


//let storage: Storage = new Storage();

export function getAuthHttp(http, storage) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("data:image/png;base64,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");
    })
  }
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
    AscDesc,
    ListadoAnimalesVendidos,
    ListaExplotaciones,
    DetalleExplotacion,
    Informes
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
    Nuevo,
    ListadoAnimalesVendidos,
    ListaExplotaciones,
    DetalleExplotacion,
    Informes
  ],
  providers: [

    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    ServicioDatos,
    Camera,
    //{ provide: Camera, useClass: CameraMock },
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http,Storage]
    }
  ]
})
export class AppModule {}
