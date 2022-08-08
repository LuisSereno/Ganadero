import { IEExplotacion } from './../../servicios/beans/interfaces/explotacion.interface';
import { ExplotacionServicio } from './../../servicios/explotacion.service';
import { AuthService } from '../../servicios/auth/auth';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
// import { StatusBar, Splashscreen } from 'ionic-native';
// import {ToolBarMenu} from '../pages/toolbarMenu/toolbarMenu';
// import { TabsPage } from '../pages/tabs/tabs';
// import {AuthService} from '../../servicios/auth/auth';
import { ServicioDatos } from '../../servicios/serviciodatos';
import { Usuario } from '../../servicios/beans/usuario';
// Import Auth0Cordova
import { Platform, MenuController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'home-central-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  rootPage = null;

  pages: Array<{ title: string, url: string, icon: string }>;


  constructor(private platform: Platform,
    private router: Router, private splashScreen: SplashScreen, private statusBar: StatusBar,
    public auth: AuthService, public user:UsuarioServicio) {
  }

  ngOnInit() {
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

  const usuario:Usuario=new Usuario('','luisalbertosereno@gmail.com');
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

  private cargarListadoGanadoInicio() {
    if (this.user.usuario.explotaciones && this.user.usuario.explotaciones.length>0){
      this.router.navigate(['ganadero/listado-explotaciones'],
      {queryParams:{explotaciones:JSON.stringify(this.user.usuario.explotaciones)}});
    }else{
      this.router.navigate(['ganadero/explotacion-detalle', true]);
    }
  }

  logoutApp() {
    navigator['app'].exitApp();
    location.reload();
  }
}

