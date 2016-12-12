// app/pages/profile/profile.ts
import { NavController } from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthService} from '../../servicios/auth/auth';
import {MyApp} from '../../app/app.component';

@Component({
  templateUrl: 'profile.html'
})
export class PerfilAutenticacion {
  
	// We need to inject AuthService so that we can
	// use it in the view
	constructor(private navCtrl: NavController,public auth: AuthService) {
		 this.redirectToSearch();
	}

	redirectToSearch(){
	  if(this.auth.authenticated()) {
	    //this.navCtrl.push(TabsPage);
	  	this.navCtrl.setRoot(MyApp);
	  }else{
	    this.auth.lock.on('authenticated', authResult => {
	      //this.navCtrl.push(TabsPage);
	      this.navCtrl.setRoot(MyApp);
	    });
	  } 
	}

}
