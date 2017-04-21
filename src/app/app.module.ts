import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PerfilAutenticacion } from '../pages/profile/profile';
import { ListaGanado } from '../pages/listadoGanado/listado';
import { ListaDocumentos } from '../pages/listadoDocumentos/listado';
import { ListaVentas } from '../pages/listadoVentas/listado';
import { Cabecera } from '../pages/cabecera/cabecera';
import { Detalle } from '../pages/detalle/detalle';
import {ListVacEnf} from '../pages/listadoVacunasEnfermedades/listaVacunasEnfermedades';
import {AscDesc} from '../pages/listadoAscendenciaDescendencia/listaAscendenciaDescendencia';
import { Storage } from '@ionic/storage';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from '../servicios/auth/auth';
import { ServicioDatos } from '../servicios/serviciodatos';
import { Http } from '@angular/http';
import {Nuevo} from '../pages/nuevo/nuevo'

let storage: Storage = new Storage();

export function getAuthHttp(http) {
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
    IonicModule.forRoot(MyApp)
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
    ServicioDatos,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }    
  ]
})
export class AppModule {}
