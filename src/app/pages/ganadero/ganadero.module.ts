import { GanadoServicio } from './../../servicios/ganado.service';
import { IEExplotacion } from './../../servicios/beans/interfaces/explotacion.interface';
import { IEDocumento } from './../../servicios/beans/interfaces/documento.interface';
import { IEVacuna } from './../../servicios/beans/interfaces/vacuna.interface';
import { IEEnfermedad } from './../../servicios/beans/interfaces/enfermedad.interface';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { IEOperacion } from './../../servicios/beans/interfaces/operacion.interface';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GanaderoPageRoutingModule } from './ganadero-routing.module';

import { HomePage } from '../home/home.page';
import { HttpClientModule } from '@angular/common/http';
import { CustomAuthService } from 'src/app/servicios/auth/auth';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ListaGanado } from '../listadoGanado/listado';
import { ListaVentas } from '../listadoVentas/listado';
import { ListaExplotaciones } from '../ajustes/explotacion/listado/listado';
import { ListadoAnimalesVendidos } from '../listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos';
import { PerfilAutenticacion } from '../profile/profile';
import { Nuevo } from '../nuevo/nuevo';
import { Detalle } from '../detalle/detalle';
import { DetalleExplotacion } from '../ajustes/explotacion/nueva/nueva';
import { Informes } from '../informes/informes';
import { AscDesc } from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia';
import { ListaDocumentos } from '../listadoDocumentos/listado';
import { Cabecera } from '../cabecera/cabecera';
import { ServicioDatos } from 'src/app/servicios/serviciodatos';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { firebaseConfig } from 'src/environments/firebaseconfig';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import { AngularFireModule} from '@angular/fire/compat'
import { ConexionGenericaService } from 'src/app/servicios/conexionGenerica.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ToastService } from 'src/app/servicios/genericos/mensajeToast';
import { Toast } from '@ionic-native/toast/ngx';
import { OperacionServicio } from 'src/app/servicios/operacion.service';
import { ToastBrowserService } from 'src/app/servicios/genericos/mensajeToastBrowser';
import { ToastNativeService } from 'src/app/servicios/genericos/mensajeToastNative';
import { VacunaServicio } from 'src/app/servicios/vacuna.service';
import { EnfermedadServicio } from 'src/app/servicios/enfermedad.service';
import { VacunasEnfermedadesPage } from '../listadoVacunasEnfermedades/listaVacunasEnfermedades';
import { DetalleVacunaEnfermedad } from '../listadoVacunasEnfermedades/nuevaVacunaEnfermedad/detalleVacunaEnfermedad';
import { OperacionComponent } from '../listadoVentas/operacion/operacion.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FiltroAvanzado } from '../filtroAvanzado/filtroAvanzado';
import { FiltroAvanzadoComponentPageModule } from '../filtro-avanzado-component/filtro-avanzado-component.module';
import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';
import { FiltroServicio } from 'src/app/servicios/filtro.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ConexionGenericaFilesService } from 'src/app/servicios/conexionGenericaFiles.service';
import { UploadFileComponent } from '../upload-file-component/upload-file-component';
import { FileUploadServicio } from 'src/app/servicios/fileUpload.service';
import { PhotoServicio } from 'src/app/servicios/photo.service';
import { MenuComponent } from '../cabecera/menu/menu.component';
import { AuthModule } from '@auth0/auth0-angular';
import { Constantes } from 'src/app/servicios/genericos/constantes';

// Build the URL that Auth0 should redirect back to
const redirectUri = `${Constantes.AUTH_CONFIG.packageIdentifier}://${Constantes.AUTH_CONFIG.domain}/capacitor/${Constantes.AUTH_CONFIG.packageIdentifier}/callback`;
console.log(redirectUri);
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GanaderoPageRoutingModule,
    HttpClientModule,
   IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig,'ganadero'),
    AngularFireDatabaseModule,
    Ng2SearchPipeModule,
    FiltroAvanzadoComponentPageModule,
    AuthModule.forRoot({
      domain: Constantes.AUTH_CONFIG.domain,
      clientId: Constantes.AUTH_CONFIG.clientID,
      redirectUri
    }),
    ],providers: [
    ServicioDatos,
    Toast,
    ToastService,
    ToastBrowserService,
    ToastNativeService,
    UsuarioServicio,
    ExplotacionServicio,
    CustomAuthService,
    GanadoServicio,
    PhotoServicio,
    VacunaServicio,
    EnfermedadServicio,
    OperacionServicio,
    SafariViewController,
    FiltroServicio,
    FileUploadServicio,
    { provide: 'UsuarioConexionServicio', useFactory: (dep1: AngularFireDatabase) =>
    (new ConexionGenericaService<{}>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'OperacionConexionServicio', useFactory: (dep1: AngularFireDatabase) =>
    (new ConexionGenericaService<IEOperacion>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'GanadoConexionServicio', useFactory: (dep1: AngularFireDatabase) =>
    (new ConexionGenericaService<IEAnimal>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'DocumentoConexionServicio', useFactory: (dep1: AngularFireDatabase) =>
    (new ConexionGenericaService<IEDocumento>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'ExplotacionConexionServicio', useFactory: (dep1: AngularFireDatabase) =>
    (new ConexionGenericaService<IEExplotacion>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'EnfermedadConexionServicio', useFactory: (dep1: AngularFireDatabase) =>
    (new ConexionGenericaService<IEEnfermedad>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'VacunaConexionServicio', useFactory: (dep1: AngularFireDatabase) =>
    (new ConexionGenericaService<IEVacuna>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'FilesConexionServicio', useFactory: (dep1: AngularFireDatabase, dep2:AngularFireStorage) =>
    (new ConexionGenericaFilesService(dep1,dep2)), deps: [AngularFireDatabase,AngularFireStorage] },
  ],
  declarations: [
    HomePage,
    MenuComponent,
    ListaGanado,
    ListaVentas,
    ListaExplotaciones,
    ListadoAnimalesVendidos,
    PerfilAutenticacion,
    Nuevo,
    Detalle,
    DetalleExplotacion,
    Informes,
    AscDesc,
    ListaDocumentos,
    Cabecera,
    VacunasEnfermedadesPage,
    DetalleVacunaEnfermedad,
    OperacionComponent,
    FiltroAvanzado,
    UploadFileComponent
    ],
  exports: [
    MenuComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GanaderoModule {}
