import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ToolBarMenu } from '../pages/toolbarMenu/toolbarMenu';
import { PerfilAutenticacion } from '../pages/profile/profile';
import { ListaGanado } from '../pages/listadoGanado/listado';
import { ListaDocumentos } from '../pages/listadoDocumentos/listado';
import { Detalle } from '../pages/detalle/detalle';
import { Storage } from '@ionic/storage';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import {AuthService} from '../servicios/auth/auth';
import { Http } from '@angular/http';

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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ToolBarMenu,
    PerfilAutenticacion,
    ListaGanado,
    Detalle,
    ListaDocumentos
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ToolBarMenu,
    PerfilAutenticacion,
    ListaGanado,
    Detalle,
    ListaDocumentos
  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ]
})
export class AppModule {}
