import { IEExplotacion } from './../../servicios/beans/interfaces/explotacion.interface';
import { ExplotacionServicio } from './../../servicios/explotacion.service';
import { AuthService } from '../../servicios/auth/auth';
import { Component, ViewChild } from '@angular/core';
//import { StatusBar, Splashscreen } from 'ionic-native';
//import {ToolBarMenu} from '../pages/toolbarMenu/toolbarMenu';
//import { TabsPage } from '../pages/tabs/tabs';
import { PerfilAutenticacion } from '../profile/profile';
import { ListaDocumentos } from '../listadoDocumentos/listado';
import { ListaGanado } from '../listadoGanado/listado';
import { ListaVentas } from '../listadoVentas/listado';
import { Informes } from '../informes/informes';
import { DetalleExplotacion } from '../ajustes/explotacion/nueva/nueva';
import { ListaExplotaciones } from '../ajustes/explotacion/listado/listado';
//import {AuthService} from '../../servicios/auth/auth';
import { ServicioDatos } from '../../servicios/serviciodatos';
import { Explotacion } from '../../servicios/beans/explotacion';
import { Usuario } from '../../servicios/beans/usuario';
// Import Auth0Cordova
import { Platform, MenuController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'home-central-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  rootPage = null;

  pages: Array<{ title: string, url: string, icon: string }>;


  constructor(private platform: Platform, public menuCtrl: MenuController, public servicio: ServicioDatos,
    private router: Router, private splashScreen: SplashScreen, private statusBar: StatusBar,
    public auth: AuthService, private user:UsuarioServicio, private explotacion:ExplotacionServicio) {
    console.log("El constructor de app.ts");
  }
  ngOnInit() {
    console.log("Entra en ngOnInit");
    this.splashScreen.show();

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }
    });
    // set our app's pages
    this.pages = [
      { title: 'Explotacion', url: "ganadero/explotacion-detalle", icon: "home"},
      { title: 'Ganado', url: "", icon: "home"},
      { title: 'Documentos', url: "", icon: "home" },
      { title: 'Ventas', url: "", icon: "home" },
      { title: 'Informes', url: "", icon: "home" },
    ];

    this.router.events.subscribe((event:RouterEvent) => {
      if(event instanceof NavigationEnd) {
        this.rootPage=event.url;
      }
    });
    console.log("PERO JODEEER", this.auth.user);
  }

  ionViewWillEnter() {
    console.log("Entra en ionViewWillEnter");

    let usuario:Usuario=new Usuario("","luisalbertosereno@gmail.com");
    this.user.obtenerUsuario(usuario).then(user=>{
      this.user.usuario=user;
      this.cargarListadoGanadoInicio();
    }).catch(error=>{
      console.warn(error);
      this.user.guardaUsuario(usuario).then(user=>{
        this.user.usuario=user;
        this.cargarListadoGanadoInicio();
      }).catch(e => {console.error(e);this.logoutApp();});

    });
  }

  openFirst() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }

  private cargarListadoGanadoInicio() {
    if (this.user.usuario.explotaciones && this.user.usuario.explotaciones.length>0){
        this.explotacion.obtenerDatosExplotacionesIds(this.user.usuario.explotaciones).then((data: Array<IEExplotacion>) => {
          if (!this.explotacion.explotaciones){
            this.explotacion.explotaciones= new Array<IEExplotacion>();
          }
          if (data && data.length>0){
            this.explotacion.explotaciones = data;
            this.router.navigate(['ganadero/listado-explotaciones']);
          }else{
            this.router.navigate(['ganadero/explotacion-detalle']);
          }
        }).catch((error) => {
          console.error(error);
          this.router.navigate(['ganadero/explotacion-detalle']);
        });
    }else{
      this.router.navigate(['ganadero/explotacion-detalle']);
    }

  }

  logoutApp() {
    this.auth.logout();
    navigator['app'].exitApp();
    location.reload();
  }
}
