
import { Component, OnDestroy, OnInit } from '@angular/core';
// Import Auth0Cordova
import { Platform, MenuController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';


@Component({
  selector: 'menu-central-page',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy{

  rootPage = null;

  pages: Array<{ title: string, url: string, icon: string }>;


  constructor(private platform: Platform, public menuCtrl: MenuController,
    private router: Router, private splashScreen: SplashScreen, private statusBar: StatusBar) {
  }

  ngOnInit() {
    this.splashScreen.show();

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Redirect back to app after authenticating
    });
    // set our app's pages
    // set our app's pages
    this.pages = [
      { title: 'Explotacion', url: "/ganadero/explotacion-detalle/true", icon: "cog"},
      { title: 'Ganado', url: "/ganadero/listado-ganado", icon: "transgender"},
      { title: 'Documentos', url: "", icon: "briefcase" },
      { title: 'Ventas', url: "/ganadero/listado-ventas", icon: "cash" },
      { title: 'Informes', url: "/ganadero/informes", icon: "information" },
    ];

    this.router.events.subscribe((event:RouterEvent) => {
      if(event instanceof NavigationEnd) {
        this.rootPage=event.url;
      }
    });
  }


  ionViewDidLoad(){
    console.log("MENU ionViewDidLoad");
  }

  ionViewWillEnter(){
    console.log("MENU ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("MENU ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("MENU ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("MENU ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("MENU ionViewWillUnload");
  }


  openFirst() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }
  logoutApp() {
    if (navigator['app']){
      navigator['app'].exitApp();
    }
    location.reload();
  }

  ngOnDestroy(){
    console.log("MENU ngOnDestroy");
  }

}
