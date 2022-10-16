//import { AuthService } from '../../servicios/auth/auth';
import { Component, OnInit } from '@angular/core';
// Import Auth0Cordova
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

// Import Auth0Cordova
//import Auth0Cordova from '@auth0/cordova';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'home-central-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  rootPage = null;

  pages: Array<{ title: string, url: string, icon: string }>;


  constructor(private platform: Platform,
    private router: Router, private splashScreen: SplashScreen, private statusBar: StatusBar,
    public user: UsuarioServicio) {
  }

  ngOnInit() {

    console.log("ando en la homepage")
    this.splashScreen.show();

    this.platform.ready().then(() => {
      console.log("ando en la homepage platformready")

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Redirect back to app after authenticating
      /*(window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }*/
    });

    //const usuario:Usuario=new Usuario('','luisalbertosereno@gmail.com');
    if (this.user.usuario != null) {
      this.user.obtenerUsuario(this.user.usuario).then(user => {
        this.user.usuario = user;
        this.cargarListadoGanadoInicio();
      }).catch(error => {
        console.warn(error);
        this.user.guardaUsuario(this.user.usuario).then(user => {
          this.user.usuario = user;
          this.cargarListadoGanadoInicio();
        }).catch(e => { console.error(e); this.logoutApp(); });

      });
    } else {
      console.log("ando en la homepage al perfil-autentication")

      this.router.navigate(['ganadero/perfil-autenticacion']);
    }

  }

  private cargarListadoGanadoInicio() {
    console.log("ando en la homepage cargarListadoGanadoInicio")

    if (this.user.usuario.explotaciones && this.user.usuario.explotaciones.length > 0) {
      this.router.navigate(['ganadero/listado-explotaciones'],
        { queryParams: { explotaciones: JSON.stringify(this.user.usuario.explotaciones) } });
    } else {
      this.router.navigate(['ganadero/explotacion-detalle', true]);
    }
  }

  logoutApp() {
    navigator['app'].exitApp();
    location.reload();
  }
}

