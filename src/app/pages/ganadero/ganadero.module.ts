import { GanadoServicio } from './../../servicios/ganado.service';
import { IEExplotacion } from './../../servicios/beans/interfaces/explotacion.interface';
import { IEDocumento } from './../../servicios/beans/interfaces/documento.interface';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { IEOperacion } from './../../servicios/beans/interfaces/operacion.interface';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GanaderoPageRoutingModule } from './ganadero-routing.module';

import { HomePage } from '../home/home.page';
import { HttpClientModule } from '@angular/common/http';
//import { AuthService } from 'src/app/servicios/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
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
import { ListVacEnf } from '../listadoVacunasEnfermedades/listaVacunasEnfermedades';
import { ServicioDatos } from 'src/app/servicios/serviciodatos';
import { AuthService } from 'src/app/servicios/auth/auth';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { firebaseConfig } from 'src/environments/firebaseconfig';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import { AngularFireModule } from '@angular/fire';
import { IEUsuario } from 'src/app/servicios/beans/interfaces/usuario.interface';
import { ConexionGenericaService } from 'src/app/servicios/conexionGenerica.service';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';
import { ToastService } from 'src/app/servicios/genericos/mensajeToast';
import { Toast } from '@ionic-native/toast/ngx';
import { OperacionServicio } from 'src/app/servicios/operacion.service';
import { ToastBrowserService } from 'src/app/servicios/genericos/mensajeToastBrowser';
import { ToastNativeService } from 'src/app/servicios/genericos/mensajeToastNative';

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
    AngularFireDatabaseModule
  ],providers: [
    ServicioDatos,
    Toast,
    ToastService,
    ToastBrowserService,
    ToastNativeService,
    AuthService,
    UsuarioServicio,
    ExplotacionServicio,
    GanadoServicio,
    OperacionServicio,
    SafariViewController,
    { provide: 'UsuarioConexionServicio', useFactory: (dep1: AngularFireDatabase) => (new ConexionGenericaService<{}>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'OperacionConexionServicio', useFactory: (dep1: AngularFireDatabase) => (new ConexionGenericaService<IEOperacion>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'GanadoConexionServicio', useFactory: (dep1: AngularFireDatabase) => (new ConexionGenericaService<IEAnimal>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'DocumentoConexionServicio', useFactory: (dep1: AngularFireDatabase) => (new ConexionGenericaService<IEDocumento>(dep1)), deps: [AngularFireDatabase] },
    { provide: 'ExplotacionConexionServicio', useFactory: (dep1: AngularFireDatabase) => (new ConexionGenericaService<IEExplotacion>(dep1)), deps: [AngularFireDatabase] }
  ],
  declarations: [
    HomePage, 
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
    ListVacEnf       
  ], 
  exports: [
    HomePage
  ]
})
export class GanaderoModule {}
